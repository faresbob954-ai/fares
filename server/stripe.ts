import Stripe from 'stripe';
import { getDb, saveDb, logAdminAction } from './db.js';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2025-02-24.acacia' as any
    })
  : null;

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
    process.env.STRIPE_SECRET_KEY.startsWith('sk_')
  );
}

export function getStripePublicConfig() {
  return {
    isConfigured: isStripeConfigured(),
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || null,
    hasWebhookSecret: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    monthlyPriceId: process.env.STRIPE_MONTHLY_PRICE_ID || null,
    annualPriceId: process.env.STRIPE_ANNUAL_PRICE_ID || null,
    mode: process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_') ? 'test' : (isStripeConfigured() ? 'live' : 'unconfigured')
  };
}

// Create Stripe Checkout Session
export async function createCheckoutSession(params: {
  planId: string;
  interval: 'month' | 'year';
  customerEmail: string;
  userId?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY in server environment variables.');
  }

  const db = getDb();
  const plan = db.plans.find(p => p.id === params.planId) || db.plans.find(p => p.id === 'plan-premium');
  if (!plan) {
    throw new Error('Selected plan was not found.');
  }

  const priceId = params.interval === 'year'
    ? (process.env.STRIPE_ANNUAL_PRICE_ID || plan.stripeAnnualPriceId)
    : (process.env.STRIPE_MONTHLY_PRICE_ID || plan.stripeMonthlyPriceId);

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  if (priceId && priceId.startsWith('price_')) {
    lineItems.push({
      price: priceId,
      quantity: 1
    });
  } else {
    // Dynamic price item for testing / initial deployment
    const unitAmount = params.interval === 'year'
      ? Math.round(plan.annualPrice * 100)
      : Math.round(plan.monthlyPrice * 100);

    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${plan.nameEn} (${params.interval === 'year' ? 'Annual' : 'Monthly'})`,
          description: plan.descriptionEn
        },
        unit_amount: unitAmount,
        recurring: {
          interval: params.interval
        }
      },
      quantity: 1
    });
  }

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'subscription',
    customer_email: params.customerEmail,
    client_reference_id: params.userId || params.customerEmail,
    metadata: {
      planId: plan.id,
      interval: params.interval,
      userId: params.userId || ''
    },
    success_url: params.successUrl,
    cancel_url: params.cancelUrl
  });

  return { sessionId: session.id, url: session.url };
}

// Handle Stripe Webhook Event
export async function handleStripeWebhookEvent(
  payload: Buffer | string,
  sigHeader: string
): Promise<{ received: boolean; eventType?: string }> {
  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  if (webhookSecret) {
    event = stripe.webhooks.constructEvent(payload, sigHeader, webhookSecret);
  } else {
    // If webhook secret not configured yet, parse event directly for local testing
    console.warn('[STRIPE] Warning: STRIPE_WEBHOOK_SECRET not provided. Webhook signature verification bypassed.');
    event = JSON.parse(payload.toString());
  }

  const db = getDb();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_email || session.customer_details?.email;
      const planId = session.metadata?.planId || 'plan-premium';
      const interval = (session.metadata?.interval || 'month') as 'month' | 'year';
      const stripeCustomerId = typeof session.customer === 'string' ? session.customer : undefined;
      const stripeSubscriptionId = typeof session.subscription === 'string' ? session.subscription : undefined;

      if (customerEmail) {
        // Record subscription
        const record = {
          id: `sub-${Date.now()}`,
          userId: session.metadata?.userId || customerEmail,
          customerEmail,
          stripeCustomerId,
          stripeSubscriptionId,
          planId,
          status: 'active' as const,
          billingInterval: interval,
          currentPeriodEnd: new Date(Date.now() + (interval === 'year' ? 365 : 30) * 86400000).toISOString(),
          createdAt: new Date().toISOString()
        };

        db.subscriptions.push(record);
        logAdminAction(customerEmail, 'SUBSCRIPTION_ACTIVATED', `Subscription created for ${customerEmail} (Plan: ${planId})`);
        saveDb();
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const existing = db.subscriptions.find(s => s.stripeSubscriptionId === subscription.id);
      if (existing) {
        existing.status = 'canceled';
        logAdminAction('stripe-webhook', 'SUBSCRIPTION_CANCELED', `Subscription ${subscription.id} marked as canceled`);
        saveDb();
      }
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const existing = db.subscriptions.find(s => s.stripeSubscriptionId === subscription.id);
      if (existing) {
        existing.status = subscription.status === 'active' ? 'active' : 'past_due';
        saveDb();
      }
      break;
    }

    default:
      console.log(`[STRIPE] Unhandled webhook event type: ${event.type}`);
  }

  return { received: true, eventType: event.type };
}

// Server-side Entitlement Verification
export function verifyUserEntitlement(emailOrUserId: string): { isPremium: boolean; expiresAt?: string } {
  const db = getDb();
  const sub = db.subscriptions.find(
    s => (s.customerEmail.toLowerCase() === emailOrUserId.toLowerCase() || s.userId === emailOrUserId) &&
         s.status === 'active'
  );

  if (!sub) {
    return { isPremium: false };
  }

  // Check if current period has expired
  const now = new Date();
  const periodEnd = new Date(sub.currentPeriodEnd);
  if (now > periodEnd) {
    return { isPremium: false };
  }

  return { isPremium: true, expiresAt: sub.currentPeriodEnd };
}
