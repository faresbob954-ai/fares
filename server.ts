import express, { Request, Response } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';
import { 
  getDb, 
  saveDb, 
  initializeAdminUser, 
  logAdminAction, 
  User, 
  Article, 
  HomepageSection, 
  CustomPage, 
  ContactMessage 
} from './server/db.js';
import { 
  authenticateToken, 
  requireAdmin, 
  generateToken, 
  checkLoginRateLimit, 
  resetLoginRateLimit,
  AuthenticatedRequest 
} from './server/auth.js';
import { 
  createCheckoutSession, 
  handleStripeWebhookEvent, 
  getStripePublicConfig, 
  verifyUserEntitlement 
} from './server/stripe.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Special raw body handling for Stripe webhook signatures
app.post(
  '/api/stripe/webhook',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string || '';
    try {
      const result = await handleStripeWebhookEvent(req.body, sig);
      res.json(result);
    } catch (err: any) {
      console.error('[STRIPE WEBHOOK ERROR]', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);

// Standard JSON parser for all other endpoints
app.use(express.json());

// ----------------------------------------------------
// PUBLIC API ROUTES
// ----------------------------------------------------

// 1. Bootstrap: Loads public settings, sections, pages, articles, plans
app.get('/api/public/bootstrap', (req: Request, res: Response) => {
  const db = getDb();
  res.json({
    settings: db.settings,
    homepageSections: db.homepageSections.filter(s => s.isVisible),
    publishedPages: db.pages.filter(p => p.isPublished),
    publishedArticles: db.articles.filter(a => a.isPublished),
    plans: db.plans.filter(p => p.isActive),
    stripeConfig: getStripePublicConfig()
  });
});

// 2. Contact message submission
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, subject, message, language } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are required.' });
    return;
  }

  // Basic email syntax check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Please provide a valid email address.' });
    return;
  }

  const db = getDb();
  const newMessage: ContactMessage = {
    id: `msg-${Date.now()}`,
    name: String(name).trim().slice(0, 100),
    email: String(email).trim().toLowerCase().slice(0, 150),
    subject: String(subject || 'General Inquiry').trim().slice(0, 200),
    message: String(message).trim().slice(0, 5000),
    language: language === 'ar' ? 'ar' : 'en',
    isRead: false,
    isResolved: false,
    createdAt: new Date().toISOString(),
    ip: req.ip
  };

  db.contactMessages.unshift(newMessage);
  saveDb();

  res.json({ 
    success: true, 
    message: 'Your message has been received and delivered to support@tooloraweb.com.' 
  });
});

// 3. Auth Setup Status (Checks whether first-time owner setup is required)
app.get('/api/auth/setup-status', (req: Request, res: Response) => {
  const db = getDb();
  const hasAdmin = db.users.some(u => u.role === 'admin');
  res.json({
    isConfigured: hasAdmin,
    defaultEmail: process.env.ADMIN_EMAIL || db.settings.supportEmail || 'admin@tooloraweb.com'
  });
});

// 4. Initial Owner Account Provisioning
app.post('/api/auth/setup-admin', async (req: Request, res: Response) => {
  const db = getDb();
  const existingAdmin = db.users.find(u => u.role === 'admin');

  if (existingAdmin) {
    res.status(400).json({ error: 'An administrator account is already configured. Please log in.' });
    return;
  }

  const { email, password, name } = req.body;

  if (!email || !password || password.length < 8) {
    res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newAdmin: User = {
    id: `admin-${Date.now()}`,
    email: String(email).toLowerCase().trim(),
    passwordHash,
    role: 'admin',
    name: String(name || 'Owner Administrator').trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.users.push(newAdmin);
  logAdminAction(newAdmin.email, 'FIRST_OWNER_SETUP', `Initial administrator account configured: ${newAdmin.email}`);
  saveDb();

  const token = generateToken(newAdmin);
  res.json({
    success: true,
    token,
    user: {
      id: newAdmin.id,
      email: newAdmin.email,
      name: newAdmin.name,
      role: newAdmin.role
    }
  });
});

// 5. Admin Login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const ip = req.ip || '127.0.0.1';
  const rateLimitCheck = checkLoginRateLimit(ip);

  if (!rateLimitCheck.allowed) {
    res.status(429).json({
      error: `Too many failed login attempts. Please wait ${rateLimitCheck.retryAfterSeconds} seconds before trying again.`
    });
    return;
  }

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  const db = getDb();
  const user = db.users.find(u => u.email.toLowerCase() === String(email).toLowerCase().trim());

  if (!user) {
    res.status(401).json({ error: 'Invalid email or password.' });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    res.status(401).json({ error: 'Invalid email or password.' });
    return;
  }

  resetLoginRateLimit(ip);
  const token = generateToken(user);
  logAdminAction(user.email, 'LOGIN', `User logged in from ${ip}`);

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
});

// 6. Current User Profile
app.get('/api/auth/me', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  res.json({ user: req.user });
});

// 7. Change Password
app.post('/api/auth/change-password', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    res.status(400).json({ error: 'New password must be at least 8 characters.' });
    return;
  }

  const db = getDb();
  const user = db.users.find(u => u.id === req.user?.id);
  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isMatch) {
    res.status(400).json({ error: 'Current password is incorrect.' });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  user.passwordHash = await bcrypt.hash(newPassword, salt);
  user.updatedAt = new Date().toISOString();
  logAdminAction(user.email, 'PASSWORD_CHANGED', 'Administrator updated their password.');
  saveDb();

  res.json({ success: true, message: 'Password updated successfully.' });
});

// 8. Stripe Checkout Session
app.post('/api/stripe/create-checkout-session', async (req: Request, res: Response) => {
  try {
    const { planId, interval, customerEmail, successUrl, cancelUrl } = req.body;

    if (!customerEmail) {
      res.status(400).json({ error: 'Customer email is required for subscription.' });
      return;
    }

    const session = await createCheckoutSession({
      planId: planId || 'plan-premium',
      interval: interval === 'year' ? 'year' : 'month',
      customerEmail,
      successUrl: successUrl || `${process.env.APP_URL || 'http://localhost:3000'}/premium?checkout=success`,
      cancelUrl: cancelUrl || `${process.env.APP_URL || 'http://localhost:3000'}/premium?checkout=canceled`
    });

    res.json(session);
  } catch (err: any) {
    console.error('[STRIPE CHECKOUT ERROR]', err.message);
    res.status(400).json({
      error: err.message,
      setupInstructions: !process.env.STRIPE_SECRET_KEY
        ? 'Please configure STRIPE_SECRET_KEY in server environment variables to process Stripe checkout sessions.'
        : undefined
    });
  }
});

// 9. Stripe Config & Entitlement
app.get('/api/stripe/config', (req: Request, res: Response) => {
  res.json(getStripePublicConfig());
});

app.get('/api/stripe/verify-entitlement', (req: Request, res: Response) => {
  const email = String(req.query.email || '');
  if (!email) {
    res.json({ isPremium: false });
    return;
  }
  res.json(verifyUserEntitlement(email));
});

// ----------------------------------------------------
// PROTECTED ADMIN API ROUTES (requireAdmin)
// ----------------------------------------------------

// Overview & Live Statistics
app.get('/api/admin/overview', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const publishedArticles = db.articles.filter(a => a.isPublished).length;
  const draftArticles = db.articles.length - publishedArticles;
  const unreadMessages = db.contactMessages.filter(m => !m.isRead).length;
  const activeSubs = db.subscriptions.filter(s => s.status === 'active').length;

  res.json({
    stats: {
      totalArticles: db.articles.length,
      publishedArticles,
      draftArticles,
      totalHomepageSections: db.homepageSections.length,
      totalPages: db.pages.length,
      totalMessages: db.contactMessages.length,
      unreadMessages,
      totalSubscribers: activeSubs,
      totalUsers: db.users.length,
    },
    recentMessages: db.contactMessages.slice(0, 5),
    recentLogs: db.logs.slice(0, 10),
    stripeStatus: getStripePublicConfig()
  });
});

// Homepage Sections Management
app.get('/api/admin/sections', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  res.json(db.homepageSections);
});

app.post('/api/admin/sections', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const newSection: HomepageSection = {
    ...req.body,
    id: `sec-${Date.now()}`,
    order: db.homepageSections.length + 1
  };
  db.homepageSections.push(newSection);
  logAdminAction(req.user!.email, 'SECTION_CREATED', `Added section: ${newSection.titleEn}`);
  saveDb();
  res.json(newSection);
});

app.put('/api/admin/sections/:id', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const index = db.homepageSections.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Section not found' });
    return;
  }
  db.homepageSections[index] = { ...db.homepageSections[index], ...req.body };
  logAdminAction(req.user!.email, 'SECTION_UPDATED', `Updated section: ${db.homepageSections[index].titleEn}`);
  saveDb();
  res.json(db.homepageSections[index]);
});

app.put('/api/admin/sections-reorder', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const orderedIds: string[] = req.body.orderedIds;
  if (Array.isArray(orderedIds)) {
    orderedIds.forEach((id, idx) => {
      const sec = db.homepageSections.find(s => s.id === id);
      if (sec) sec.order = idx + 1;
    });
    db.homepageSections.sort((a, b) => a.order - b.order);
    logAdminAction(req.user!.email, 'SECTIONS_REORDERED', 'Reordered homepage layout sections');
    saveDb();
  }
  res.json(db.homepageSections);
});

app.delete('/api/admin/sections/:id', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const index = db.homepageSections.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Section not found' });
    return;
  }
  const removed = db.homepageSections.splice(index, 1)[0];
  logAdminAction(req.user!.email, 'SECTION_DELETED', `Deleted section: ${removed.titleEn}`);
  saveDb();
  res.json({ success: true });
});

// Pages Management
app.get('/api/admin/pages', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  res.json(db.pages);
});

app.post('/api/admin/pages', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const slug = String(req.body.slug || '').toLowerCase().replace(/[^a-z0-9-]/g, '-');
  
  if (db.pages.some(p => p.slug === slug)) {
    res.status(400).json({ error: 'A page with this URL slug already exists.' });
    return;
  }

  const newPage: CustomPage = {
    ...req.body,
    id: `page-${Date.now()}`,
    slug,
    updatedAt: new Date().toISOString()
  };

  db.pages.push(newPage);
  logAdminAction(req.user!.email, 'PAGE_CREATED', `Created custom page: ${newPage.slug}`);
  saveDb();
  res.json(newPage);
});

app.put('/api/admin/pages/:id', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const index = db.pages.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Page not found' });
    return;
  }
  db.pages[index] = { 
    ...db.pages[index], 
    ...req.body, 
    updatedAt: new Date().toISOString() 
  };
  logAdminAction(req.user!.email, 'PAGE_UPDATED', `Updated page: ${db.pages[index].slug}`);
  saveDb();
  res.json(db.pages[index]);
});

app.delete('/api/admin/pages/:id', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const index = db.pages.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Page not found' });
    return;
  }
  const removed = db.pages.splice(index, 1)[0];
  logAdminAction(req.user!.email, 'PAGE_DELETED', `Deleted page: ${removed.slug}`);
  saveDb();
  res.json({ success: true });
});

// Articles Management
app.get('/api/admin/articles', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  res.json(db.articles);
});

app.post('/api/admin/articles', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const slug = String(req.body.slug || '').toLowerCase().replace(/[^a-z0-9-]/g, '-');

  if (db.articles.some(a => a.slug === slug)) {
    res.status(400).json({ error: 'An article with this URL slug already exists.' });
    return;
  }

  const newArticle: Article = {
    ...req.body,
    id: `art-${Date.now()}`,
    slug,
    publishedDate: req.body.publishedDate || new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString()
  };

  db.articles.unshift(newArticle);
  logAdminAction(req.user!.email, 'ARTICLE_CREATED', `Created article: ${newArticle.title}`);
  saveDb();
  res.json(newArticle);
});

app.put('/api/admin/articles/:id', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const index = db.articles.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }
  db.articles[index] = { 
    ...db.articles[index], 
    ...req.body, 
    updatedAt: new Date().toISOString() 
  };
  logAdminAction(req.user!.email, 'ARTICLE_UPDATED', `Updated article: ${db.articles[index].title}`);
  saveDb();
  res.json(db.articles[index]);
});

app.delete('/api/admin/articles/:id', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const index = db.articles.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }
  const removed = db.articles.splice(index, 1)[0];
  logAdminAction(req.user!.email, 'ARTICLE_DELETED', `Deleted article: ${removed.title}`);
  saveDb();
  res.json({ success: true });
});

// Inbox (Contact Messages)
app.get('/api/admin/inbox', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  res.json(db.contactMessages);
});

app.put('/api/admin/inbox/:id', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const msg = db.contactMessages.find(m => m.id === req.params.id);
  if (!msg) {
    res.status(404).json({ error: 'Message not found' });
    return;
  }
  if (req.body.isRead !== undefined) msg.isRead = Boolean(req.body.isRead);
  if (req.body.isResolved !== undefined) msg.isResolved = Boolean(req.body.isResolved);
  saveDb();
  res.json(msg);
});

app.delete('/api/admin/inbox/:id', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const index = db.contactMessages.findIndex(m => m.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Message not found' });
    return;
  }
  db.contactMessages.splice(index, 1);
  saveDb();
  res.json({ success: true });
});

// Subscription Plans Management
app.get('/api/admin/plans', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  res.json(db.plans);
});

app.put('/api/admin/plans/:id', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const index = db.plans.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Plan not found' });
    return;
  }
  db.plans[index] = { ...db.plans[index], ...req.body };
  logAdminAction(req.user!.email, 'PLAN_UPDATED', `Updated subscription plan: ${db.plans[index].nameEn}`);
  saveDb();
  res.json(db.plans[index]);
});

// Subscriptions & Entitlements List
app.get('/api/admin/subscriptions', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  res.json(db.subscriptions);
});

// Affiliate Links Management
app.get('/api/admin/affiliates', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  res.json(db.affiliateLinks);
});

app.post('/api/admin/affiliates', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const newLink = {
    ...req.body,
    id: `aff-${Date.now()}`,
    clicksCount: 0
  };
  db.affiliateLinks.push(newLink);
  logAdminAction(req.user!.email, 'AFFILIATE_CREATED', `Added affiliate link: ${newLink.name}`);
  saveDb();
  res.json(newLink);
});

app.put('/api/admin/affiliates/:id', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const index = db.affiliateLinks.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Affiliate link not found' });
    return;
  }
  db.affiliateLinks[index] = { ...db.affiliateLinks[index], ...req.body };
  saveDb();
  res.json(db.affiliateLinks[index]);
});

app.delete('/api/admin/affiliates/:id', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const index = db.affiliateLinks.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Affiliate link not found' });
    return;
  }
  db.affiliateLinks.splice(index, 1);
  saveDb();
  res.json({ success: true });
});

// Site Settings
app.get('/api/admin/settings', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  res.json(db.settings);
});

app.put('/api/admin/settings', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  db.settings = { ...db.settings, ...req.body };
  logAdminAction(req.user!.email, 'SETTINGS_UPDATED', 'Updated global site settings');
  saveDb();
  res.json(db.settings);
});

// Users Management
app.get('/api/admin/users', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  res.json(db.users.map(u => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt
  })));
});

// Activity Logs
app.get('/api/admin/logs', authenticateToken, requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  res.json(db.logs);
});

// ----------------------------------------------------
// VITE DEV SERVER / STATIC PRODUCTION SERVING
// ----------------------------------------------------
async function startServer() {
  // Provision default database & check env admin
  getDb();
  await initializeAdminUser();

  const httpServer = http.createServer(app);

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        ws: {
          server: httpServer,
        },
        hmr: {
          server: httpServer,
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`[NEXORA SERVER] Running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('[SERVER BOOT ERROR]', err);
  process.exit(1);
});
