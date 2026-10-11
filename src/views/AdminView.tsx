import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  KeyRound, 
  LayoutDashboard, 
  Layers, 
  FileText, 
  BookOpen, 
  Cpu, 
  FolderTree, 
  Inbox, 
  CreditCard, 
  Users, 
  Link2, 
  Search, 
  Settings, 
  ShieldAlert, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Eye, 
  EyeOff, 
  AlertCircle,
  RotateCcw,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Sun,
  Moon
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { products as initialProducts } from '../data/products';
import { categories as initialCategories } from '../data/categories';
import { NexoraLogo } from '../components/NexoraLogo';

export const AdminView: React.FC = () => {
  const { language, t, isRTL } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  // Authentication State
  const [token, setToken] = useState<string | null>(() => {
    return typeof localStorage !== 'undefined' ? localStorage.getItem('comparenest_admin_token') : null;
  });
  const [adminUser, setAdminUser] = useState<{ id: string; email: string; name: string; role: string } | null>(null);
  const [setupConfigured, setSetupConfigured] = useState<boolean | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Login / Setup Form Inputs
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Admin Section (1 to 14)
  type AdminTab = 
    | 'overview' 
    | 'sections' 
    | 'pages' 
    | 'articles' 
    | 'products' 
    | 'categories' 
    | 'inbox' 
    | 'plans' 
    | 'subscriptions' 
    | 'affiliates' 
    | 'seo' 
    | 'settings' 
    | 'users' 
    | 'logs';

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Change Password Modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [passError, setPassError] = useState('');

  // Dashboard Data State
  const [overviewData, setOverviewData] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [productsList, setProductsList] = useState<any[]>(initialProducts);
  const [categoriesList, setCategoriesList] = useState<any[]>(initialCategories);
  const [inboxMessages, setInboxMessages] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [logsList, setLogsList] = useState<any[]>([]);

  // Editing Modals / Form State
  const [editingArticle, setEditingArticle] = useState<any | null>(null);
  const [editingSection, setEditingSection] = useState<any | null>(null);
  const [editingPage, setEditingPage] = useState<any | null>(null);

  // Check setup status and verify token
  useEffect(() => {
    fetch('/api/auth/setup-status')
      .then(res => res.json())
      .then(data => {
        setSetupConfigured(data.isConfigured);
        if (!data.isConfigured && data.defaultEmail) {
          setEmailInput(data.defaultEmail);
        }
      })
      .catch(err => console.error('[SETUP STATUS]', err));

    if (token) {
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('Invalid token');
          return res.json();
        })
        .then(data => {
          setAdminUser(data.user);
          loadDashboardData(token);
        })
        .catch(() => {
          setToken(null);
          localStorage.removeItem('comparenest_admin_token');
        })
        .finally(() => setAuthLoading(false));
    } else {
      setAuthLoading(false);
    }
  }, [token]);

  const loadDashboardData = (authToken: string) => {
    const headers = { 'Authorization': `Bearer ${authToken}` };

    // Overview stats
    fetch('/api/admin/overview', { headers })
      .then(r => r.json()).then(d => setOverviewData(d)).catch(console.error);

    // Sections
    fetch('/api/admin/sections', { headers })
      .then(r => r.json()).then(d => setSections(d)).catch(console.error);

    // Pages
    fetch('/api/admin/pages', { headers })
      .then(r => r.json()).then(d => setPages(d)).catch(console.error);

    // Articles
    fetch('/api/admin/articles', { headers })
      .then(r => r.json()).then(d => setArticles(d)).catch(console.error);

    // Inbox
    fetch('/api/admin/inbox', { headers })
      .then(r => r.json()).then(d => setInboxMessages(d)).catch(console.error);

    // Plans
    fetch('/api/admin/plans', { headers })
      .then(r => r.json()).then(d => setPlans(d)).catch(console.error);

    // Subscriptions
    fetch('/api/admin/subscriptions', { headers })
      .then(r => r.json()).then(d => setSubscriptions(d)).catch(console.error);

    // Affiliates
    fetch('/api/admin/affiliates', { headers })
      .then(r => r.json()).then(d => setAffiliates(d)).catch(console.error);

    // Settings
    fetch('/api/admin/settings', { headers })
      .then(r => r.json()).then(d => setSiteSettings(d)).catch(console.error);

    // Users
    fetch('/api/admin/users', { headers })
      .then(r => r.json()).then(d => setUsersList(d)).catch(console.error);

    // Logs
    fetch('/api/admin/logs', { headers })
      .then(r => r.json()).then(d => setLogsList(d)).catch(console.error);
  };

  // Login Submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, password: passwordInput })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setToken(data.token);
      setAdminUser(data.user);
      localStorage.setItem('comparenest_admin_token', data.token);
      loadDashboardData(data.token);
    } catch (err: any) {
      setAuthError(err.message || 'Login failed');
    }
  };

  // First-Time Setup Submit
  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    try {
      const res = await fetch('/api/auth/setup-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          name: nameInput || 'Owner Administrator'
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Setup failed');
      }

      setSetupConfigured(true);
      setToken(data.token);
      setAdminUser(data.user);
      localStorage.setItem('comparenest_admin_token', data.token);
      loadDashboardData(data.token);
    } catch (err: any) {
      setAuthError(err.message || 'Setup failed');
    }
  };

  // Logout
  const handleLogout = () => {
    setToken(null);
    setAdminUser(null);
    localStorage.removeItem('comparenest_admin_token');
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update password');

      setPassSuccess('Password updated successfully.');
      setCurrentPass('');
      setNewPass('');
      setTimeout(() => setShowPasswordModal(false), 1500);
    } catch (err: any) {
      setPassError(err.message || 'Error updating password.');
    }
  };

  // ----------------------------------------------------
  // RENDER: AUTHENTICATION SCREEN (LOGIN OR FIRST-TIME SETUP)
  // ----------------------------------------------------
  if (!token || !adminUser) {
    return (
      <div className="min-h-screen bg-[#F7F8FC] dark:bg-[#111318] text-[#171923] dark:text-[#F5F6FA] flex flex-col items-center justify-center px-4 py-12 transition-colors duration-200">
        <div className="w-full max-w-md bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] shadow-xl p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <NexoraLogo size="lg" showWordmark={true} theme={isDark ? 'dark' : 'light'} />
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] flex items-center justify-center mx-auto shadow-xs border border-[#635BFF]/20">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-[#171923] dark:text-[#F5F6FA]">
              {setupConfigured === false ? t('adminSetupTitle') : t('adminLoginTitle')}
            </h1>
            <p className="text-xs text-[#687083] dark:text-[#A5ADBD]">
              {setupConfigured === false
                ? 'Provision the primary owner administrator credentials for Nexora.'
                : 'Restricted administrative access. Authentication required.'}
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={setupConfigured === false ? handleSetup : handleLogin} className="space-y-4">
            {setupConfigured === false && (
              <div>
                <label className="block text-xs font-semibold text-[#171923] dark:text-[#F5F6FA] mb-1">
                  Administrator Name
                </label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Master Admin"
                  className="w-full px-3.5 py-2.5 text-xs border border-[#E8EAF0] dark:border-[#2A2E39] bg-white dark:bg-[#111318] text-[#171923] dark:text-[#F5F6FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#171923] dark:text-[#F5F6FA] mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@tooloraweb.com"
                className="w-full px-3.5 py-2.5 text-xs border border-[#E8EAF0] dark:border-[#2A2E39] bg-white dark:bg-[#111318] text-[#171923] dark:text-[#F5F6FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#171923] dark:text-[#F5F6FA] mb-1">
                Master Password (min. 8 characters)
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 text-xs border border-[#E8EAF0] dark:border-[#2A2E39] bg-white dark:bg-[#111318] text-[#171923] dark:text-[#F5F6FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#635BFF] to-[#36BFFA] hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-98"
            >
              {setupConfigured === false ? t('adminSetupBtn') : t('adminLoginBtn')}
            </button>
          </form>

          <div className="pt-2 text-[11px] text-[#687083] dark:text-[#A5ADBD] text-center border-t border-[#E8EAF0] dark:border-[#2A2E39]">
            Official system recipient: support@tooloraweb.com · Security rate limiting active
          </div>
        </div>

        {/* Theme toggle for auth view */}
        <div className="mt-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39] bg-white dark:bg-[#191C24] text-[#687083] dark:text-slate-300 hover:text-[#171923] dark:hover:text-white transition-all shadow-xs"
            title={isDark ? t('themeLight') : t('themeDark')}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#36BFFA]" /> : <Moon className="w-4 h-4 text-[#635BFF]" />}
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER: AUTHENTICATED DASHBOARD (14 SECTIONS)
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F7F8FC] dark:bg-[#111318] text-[#171923] dark:text-[#F5F6FA] flex flex-col transition-colors duration-200">
      <header className="bg-white dark:bg-[#191C24] text-[#171923] dark:text-[#F5F6FA] px-4 sm:px-8 py-3 flex items-center justify-between border-b border-[#E8EAF0] dark:border-[#2A2E39]">
        <div className="flex items-center gap-3">
          <NexoraLogo size="sm" showWordmark={false} theme={isDark ? 'dark' : 'light'} />
          <div>
            <span className="font-extrabold text-sm tracking-tight text-[#171923] dark:text-white block">
              Nex<span className="bg-gradient-to-r from-[#635BFF] to-[#36BFFA] bg-clip-text text-transparent">ora</span> <span className="text-[#687083] dark:text-[#A5ADBD] font-medium">Admin Control</span>
            </span>
            <span className="text-[10px] text-[#687083] dark:text-[#A5ADBD] font-mono">
              Signed in as: {adminUser.email} ({t('adminRoleLabel')})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Admin Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39] bg-white dark:bg-[#191C24] text-[#687083] dark:text-slate-300 hover:text-[#171923] dark:hover:text-white hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] transition-all cursor-pointer shadow-xs"
            title={isDark ? t('themeLight') : t('themeDark')}
            aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#36BFFA]" />
            ) : (
              <Moon className="w-4 h-4 text-[#635BFF]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="px-2.5 py-1.5 bg-[#F7F8FC] dark:bg-[#20242E] hover:bg-slate-200 dark:hover:bg-[#2A2E39] text-[#171923] dark:text-slate-200 border border-[#E8EAF0] dark:border-[#2A2E39] text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#635BFF] dark:text-[#36BFFA]" />
            <span className="hidden sm:inline">{t('adminChangePassword')}</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="px-2.5 py-1.5 bg-red-50 dark:bg-red-950/60 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-200 text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-red-200 dark:border-red-800/50"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('adminSignOut')}</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout: Sidebar + Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 bg-white dark:bg-[#191C24] border-e border-[#E8EAF0] dark:border-[#2A2E39] p-4 space-y-1 shrink-0">
          <div className="px-3 py-2 text-[11px] font-bold text-[#687083] dark:text-[#A5ADBD] uppercase tracking-wider">
            Content & Core CMS
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left rtl:text-right ${
              activeTab === 'overview'
                ? 'bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 font-bold border border-[#635BFF]/20'
                : 'text-[#687083] dark:text-[#A5ADBD] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] hover:text-[#171923] dark:hover:text-[#F5F6FA] border border-transparent'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
            <span>{t('tabOverview')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sections')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left rtl:text-right ${
              activeTab === 'sections'
                ? 'bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 font-bold border border-[#635BFF]/20'
                : 'text-[#687083] dark:text-[#A5ADBD] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] hover:text-[#171923] dark:hover:text-[#F5F6FA] border border-transparent'
            }`}
          >
            <Layers className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
            <span>{t('tabSections')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pages')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left rtl:text-right ${
              activeTab === 'pages'
                ? 'bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 font-bold border border-[#635BFF]/20'
                : 'text-[#687083] dark:text-[#A5ADBD] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] hover:text-[#171923] dark:hover:text-[#F5F6FA] border border-transparent'
            }`}
          >
            <FileText className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
            <span>{t('tabPages')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left rtl:text-right ${
              activeTab === 'articles'
                ? 'bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 font-bold border border-[#635BFF]/20'
                : 'text-[#687083] dark:text-[#A5ADBD] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] hover:text-[#171923] dark:hover:text-[#F5F6FA] border border-transparent'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
            <span>{t('tabArticles')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left rtl:text-right ${
              activeTab === 'products'
                ? 'bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 font-bold border border-[#635BFF]/20'
                : 'text-[#687083] dark:text-[#A5ADBD] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] hover:text-[#171923] dark:hover:text-[#F5F6FA] border border-transparent'
            }`}
          >
            <Cpu className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
            <span>{t('tabProducts')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left rtl:text-right ${
              activeTab === 'categories'
                ? 'bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 font-bold border border-[#635BFF]/20'
                : 'text-[#687083] dark:text-[#A5ADBD] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] hover:text-[#171923] dark:hover:text-[#F5F6FA] border border-transparent'
            }`}
          >
            <FolderTree className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
            <span>{t('tabCategories')}</span>
          </button>

          <div className="pt-4 px-3 py-2 text-[11px] font-bold text-[#687083] dark:text-[#A5ADBD] uppercase tracking-wider">
            Inquiries & Monetization
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('inbox')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left rtl:text-right ${
              activeTab === 'inbox'
                ? 'bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 font-bold border border-[#635BFF]/20'
                : 'text-[#687083] dark:text-[#A5ADBD] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] hover:text-[#171923] dark:hover:text-[#F5F6FA] border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Inbox className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
              <span>{t('tabInbox')}</span>
            </div>
            {overviewData?.stats?.unreadMessages > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {overviewData.stats.unreadMessages}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('plans')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left rtl:text-right ${
              activeTab === 'plans'
                ? 'bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 font-bold border border-[#635BFF]/20'
                : 'text-[#687083] dark:text-[#A5ADBD] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] hover:text-[#171923] dark:hover:text-[#F5F6FA] border border-transparent'
            }`}
          >
            <CreditCard className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
            <span>{t('tabPlans')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('subscriptions')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left rtl:text-right ${
              activeTab === 'subscriptions'
                ? 'bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 font-bold border border-[#635BFF]/20'
                : 'text-[#687083] dark:text-[#A5ADBD] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] hover:text-[#171923] dark:hover:text-[#F5F6FA] border border-transparent'
            }`}
          >
            <Users className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
            <span>{t('tabSubscriptions')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('affiliates')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left rtl:text-right ${
              activeTab === 'affiliates'
                ? 'bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 font-bold border border-[#635BFF]/20'
                : 'text-[#687083] dark:text-[#A5ADBD] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] hover:text-[#171923] dark:hover:text-[#F5F6FA] border border-transparent'
            }`}
          >
            <Link2 className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
            <span>{t('tabAffiliates')}</span>
          </button>

          <div className="pt-4 px-3 py-2 text-[11px] font-bold text-[#687083] dark:text-[#A5ADBD] uppercase tracking-wider">
            Configuration & Security
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left rtl:text-right ${
              activeTab === 'seo'
                ? 'bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 font-bold border border-[#635BFF]/20'
                : 'text-[#687083] dark:text-[#A5ADBD] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] hover:text-[#171923] dark:hover:text-[#F5F6FA] border border-transparent'
            }`}
          >
            <Search className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
            <span>{t('tabSeo')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left rtl:text-right ${
              activeTab === 'settings'
                ? 'bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 font-bold border border-[#635BFF]/20'
                : 'text-[#687083] dark:text-[#A5ADBD] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] hover:text-[#171923] dark:hover:text-[#F5F6FA] border border-transparent'
            }`}
          >
            <Settings className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
            <span>{t('tabSettings')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left rtl:text-right ${
              activeTab === 'users'
                ? 'bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 font-bold border border-[#635BFF]/20'
                : 'text-[#687083] dark:text-[#A5ADBD] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] hover:text-[#171923] dark:hover:text-[#F5F6FA] border border-transparent'
            }`}
          >
            <Users className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
            <span>{t('tabUsers')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('logs')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left rtl:text-right ${
              activeTab === 'logs'
                ? 'bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] dark:bg-[#36BFFA]/10 font-bold border border-[#635BFF]/20'
                : 'text-[#687083] dark:text-[#A5ADBD] hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] hover:text-[#171923] dark:hover:text-[#F5F6FA] border border-transparent'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-[#635BFF] dark:text-[#36BFFA]" />
            <span>{t('tabLogs')}</span>
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-x-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#171923] dark:text-[#F5F6FA]">{t('tabOverview')}</h2>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-white dark:bg-[#191C24] p-4 rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39]">
                  <span className="text-xs text-[#687083] dark:text-[#A5ADBD] font-medium">Published Articles</span>
                  <p className="text-2xl font-bold text-[#171923] dark:text-[#F5F6FA] font-mono mt-1">
                    {overviewData?.stats?.publishedArticles || articles.filter(a => a.isPublished).length}
                  </p>
                </div>
                <div className="bg-white dark:bg-[#191C24] p-4 rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39]">
                  <span className="text-xs text-[#687083] dark:text-[#A5ADBD] font-medium">Hardware Devices</span>
                  <p className="text-2xl font-bold text-[#171923] dark:text-[#F5F6FA] font-mono mt-1">
                    {productsList.length}
                  </p>
                </div>
                <div className="bg-white dark:bg-[#191C24] p-4 rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39]">
                  <span className="text-xs text-[#687083] dark:text-[#A5ADBD] font-medium">Custom Pages</span>
                  <p className="text-2xl font-bold text-[#171923] dark:text-[#F5F6FA] font-mono mt-1">
                    {pages.length}
                  </p>
                </div>
                <div className="bg-white dark:bg-[#191C24] p-4 rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39]">
                  <span className="text-xs text-[#687083] dark:text-[#A5ADBD] font-medium">Inbox Messages</span>
                  <p className="text-2xl font-bold text-[#171923] dark:text-[#F5F6FA] font-mono mt-1">
                    {inboxMessages.length}
                  </p>
                </div>
                <div className="bg-white dark:bg-[#191C24] p-4 rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39]">
                  <span className="text-xs text-[#687083] dark:text-[#A5ADBD] font-medium">Active Subscribers</span>
                  <p className="text-2xl font-bold text-[#171923] dark:text-[#F5F6FA] font-mono mt-1">
                    {subscriptions.filter(s => s.status === 'active').length}
                  </p>
                </div>
                <div className="bg-white dark:bg-[#191C24] p-4 rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39]">
                  <span className="text-xs text-[#687083] dark:text-[#A5ADBD] font-medium">Stripe Status</span>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2 font-mono">
                    {overviewData?.stripeStatus?.isConfigured ? 'Ready (Test/Live)' : 'Setup Pending'}
                  </p>
                </div>
              </div>

              {/* Recent Messages & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#191C24] p-5 rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39] space-y-3">
                  <h3 className="text-sm font-bold text-[#171923] dark:text-[#F5F6FA]">Recent Contact Inquiries</h3>
                  {inboxMessages.length > 0 ? (
                    <div className="divide-y divide-[#E8EAF0] dark:divide-[#2A2E39] text-xs">
                      {inboxMessages.slice(0, 4).map(msg => (
                        <div key={msg.id} className="py-2.5 flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-[#171923] dark:text-[#F5F6FA]">{msg.name}</span>
                            <span className="text-[#687083] dark:text-[#A5ADBD] ms-2 text-[11px]">{msg.email}</span>
                            <p className="text-[#687083] dark:text-[#A5ADBD] truncate max-w-xs">{msg.subject}</p>
                          </div>
                          <span className="text-[10px] text-[#687083] dark:text-[#A5ADBD] font-mono">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#687083] dark:text-[#A5ADBD]">No contact messages received yet.</p>
                  )}
                </div>

                <div className="bg-white dark:bg-[#191C24] p-5 rounded-xl border border-[#E8EAF0] dark:border-[#2A2E39] space-y-3">
                  <h3 className="text-sm font-bold text-[#171923] dark:text-[#F5F6FA]">Recent Security Activity</h3>
                  {logsList.length > 0 ? (
                    <div className="divide-y divide-slate-100 text-xs font-mono">
                      {logsList.slice(0, 4).map(log => (
                        <div key={log.id} className="py-2.5">
                          <span className="font-bold text-cyan-800">{log.action}</span>
                          <span className="text-slate-400 ms-2 text-[10px]">{log.adminEmail}</span>
                          <p className="text-slate-600 text-[11px]">{log.details}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">No logs recorded.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HOMEPAGE SECTIONS */}
          {activeTab === 'sections' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{t('tabSections')}</h2>
                  <p className="text-xs text-slate-500">Configure order, titles, descriptions, and visibility of homepage blocks.</p>
                </div>
              </div>

              <div className="divide-y divide-slate-200 text-xs">
                {sections.map((sec, idx) => (
                  <div key={sec.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded bg-slate-100 text-slate-700 font-bold flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-900">{sec.titleEn} / {sec.titleAr}</h4>
                        <p className="text-slate-500 text-[11px]">Key: {sec.key} · Layout: {sec.layout} · Items: {sec.itemType}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={async () => {
                          const updated = !sec.isVisible;
                          await fetch(`/api/admin/sections/${sec.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                            body: JSON.stringify({ isVisible: updated })
                          });
                          loadDashboardData(token!);
                        }}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                          sec.isVisible ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {sec.isVisible ? t('visible') : t('hidden')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PAGES MANAGER */}
          {activeTab === 'pages' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{t('tabPages')}</h2>
                  <p className="text-xs text-slate-500">Manage static legal and public informational pages.</p>
                </div>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {pages.map(page => (
                  <div key={page.id} className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">{page.titleEn} ({page.slug})</h4>
                      <p className="text-slate-500 text-[11px]">Header: {page.showInHeader ? 'Yes' : 'No'} · Footer: {page.showInFooter ? 'Yes' : 'No'}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      {page.isPublished ? t('published') : t('draft')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ARTICLES MANAGER */}
          {activeTab === 'articles' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{t('tabArticles')} ({articles.length} total)</h2>
                  <p className="text-xs text-slate-500">Manage bilingual educational buying guides and hardware articles.</p>
                </div>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {articles.map(art => (
                  <div key={art.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-cyan-800 uppercase bg-cyan-50 px-1.5 py-0.2 rounded">
                          {art.language}
                        </span>
                        <h4 className="font-bold text-slate-900 truncate">{art.title}</h4>
                      </div>
                      <p className="text-slate-500 text-[11px] truncate mt-0.5">
                        Author: {art.author} · Category: {art.category} · Date: {art.publishedDate}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={async () => {
                          const updated = !art.isPublished;
                          await fetch(`/api/admin/articles/${art.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                            body: JSON.stringify({ isPublished: updated })
                          });
                          loadDashboardData(token!);
                        }}
                        className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer ${
                          art.isPublished ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {art.isPublished ? t('published') : t('draft')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PRODUCTS MANAGER */}
          {activeTab === 'products' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-base font-bold text-slate-900">{t('tabProducts')} ({productsList.length} devices)</h2>
              <p className="text-xs text-slate-500">Manage factual technical specifications and sample reference price brackets.</p>
              
              <div className="divide-y divide-slate-100 text-xs">
                {productsList.map(prod => (
                  <div key={prod.id} className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">{prod.brand} {prod.model} ({prod.releaseYear})</h4>
                      <p className="text-slate-500 text-[11px]">
                        Category: {prod.category} · Source: {prod.dataSource}
                      </p>
                    </div>
                    <span className="font-mono font-bold text-slate-800">
                      ${prod.prices[0]?.price} (Sample Ref)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-base font-bold text-slate-900">{t('tabCategories')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categoriesList.map(cat => (
                  <div key={cat.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm">{cat.nameEn} / {cat.nameAr}</h4>
                    <p className="text-xs text-slate-500 mt-1">{cat.taglineEn}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: INBOX */}
          {activeTab === 'inbox' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{t('tabInbox')} ({inboxMessages.length})</h2>
                  <p className="text-xs text-slate-500">Messages sent via public contact form, dispatched to support@tooloraweb.com.</p>
                </div>
              </div>

              {inboxMessages.length > 0 ? (
                <div className="divide-y divide-slate-200 text-xs">
                  {inboxMessages.map(msg => (
                    <div key={msg.id} className={`py-4 space-y-2 ${!msg.isRead ? 'bg-cyan-50/30 p-3 rounded-lg' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900">{msg.name}</span>
                          <span className="text-slate-500 ms-2 font-mono">{msg.email}</span>
                          <span className="ms-2 px-1.5 py-0.2 bg-slate-100 rounded text-[10px] uppercase font-mono">
                            {msg.language}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="font-semibold text-slate-800">{msg.subject}</div>
                      <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                        {msg.message}
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={async () => {
                            await fetch(`/api/admin/inbox/${msg.id}`, {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                              body: JSON.stringify({ isRead: !msg.isRead })
                            });
                            loadDashboardData(token!);
                          }}
                          className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded text-[11px] font-semibold cursor-pointer hover:bg-slate-50"
                        >
                          {msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                        </button>

                        <button
                          type="button"
                          onClick={async () => {
                            await fetch(`/api/admin/inbox/${msg.id}`, {
                              method: 'DELETE',
                              headers: { 'Authorization': `Bearer ${token}` }
                            });
                            loadDashboardData(token!);
                          }}
                          className="px-2.5 py-1 text-red-600 hover:bg-red-50 rounded text-[11px] font-semibold cursor-pointer"
                        >
                          {t('delete')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-xs text-slate-400">
                  Inbox is empty. No new contact messages.
                </div>
              )}
            </div>
          )}

          {/* TAB 8: PLANS */}
          {activeTab === 'plans' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-base font-bold text-slate-900">{t('tabPlans')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.map(plan => (
                  <div key={plan.id} className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900">{plan.nameEn}</h4>
                      <span className="font-mono font-bold text-amber-700">
                        ${plan.monthlyPrice}/mo (${plan.annualPrice}/yr)
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{plan.descriptionEn}</p>
                    <div className="text-[11px] font-mono text-slate-500">
                      Stripe Price ID: {plan.stripeMonthlyPriceId || 'Default dynamic price'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: SUBSCRIPTIONS */}
          {activeTab === 'subscriptions' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-base font-bold text-slate-900">{t('tabSubscriptions')}</h2>
              <p className="text-xs text-slate-500">Verified Stripe subscriptions and active Pro memberships.</p>
              
              {subscriptions.length > 0 ? (
                <div className="divide-y divide-slate-100 text-xs">
                  {subscriptions.map(sub => (
                    <div key={sub.id} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900">{sub.customerEmail}</span>
                        <span className="text-slate-500 ms-2">Interval: {sub.billingInterval}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                        {sub.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-6 text-center">
                  No active subscriber records in database. Subscriptions populate automatically via verified Stripe webhooks.
                </p>
              )}
            </div>
          )}

          {/* TAB 10: AFFILIATES */}
          {activeTab === 'affiliates' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-base font-bold text-slate-900">{t('tabAffiliates')}</h2>
              <div className="divide-y divide-slate-100 text-xs">
                {affiliates.map(aff => (
                  <div key={aff.id} className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">{aff.name} ({aff.merchant})</h4>
                      <p className="text-slate-500 text-[11px]">{aff.targetUrl}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded font-semibold text-[10px]">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: SEO SETTINGS */}
          {activeTab === 'seo' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
              <h2 className="text-base font-bold text-slate-900">{t('tabSeo')}</h2>
              <div className="space-y-3 max-w-xl">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Global Default Title</label>
                  <input
                    type="text"
                    defaultValue={siteSettings?.seoDefaultTitle || 'Nexora - Compare Smarter. Buy Better.'}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Global Meta Description</label>
                  <textarea
                    rows={3}
                    defaultValue={siteSettings?.seoDefaultDescription || 'Bilingual electronics comparison platform...'}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div className="p-3 bg-slate-50 rounded-lg text-slate-600">
                  <p className="font-bold text-slate-800">Robots & Indexing Directives:</p>
                  <p className="mt-1 font-mono text-[11px]">/admin routes set to noindex, nofollow.</p>
                  <p className="font-mono text-[11px]">Public pages and articles support JSON-LD Schema.org.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: SITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
              <h2 className="text-base font-bold text-slate-900">{t('tabSettings')}</h2>
              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Support Email</label>
                  <input
                    type="email"
                    disabled
                    value="support@tooloraweb.com"
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                  <span className="text-[10px] text-slate-500">Configured as designated support address across website.</span>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    defaultValue="Nexora"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">English Tagline</label>
                  <input
                    type="text"
                    defaultValue="Compare smarter. Buy better."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Arabic Tagline</label>
                  <input
                    type="text"
                    defaultValue="قارن بذكاء. اشترِ باختيار أفضل."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: USERS */}
          {activeTab === 'users' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-base font-bold text-slate-900">{t('tabUsers')}</h2>
              <div className="divide-y divide-slate-100 text-xs">
                {usersList.map(u => (
                  <div key={u.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{u.name} ({u.email})</span>
                      <span className="text-slate-500 ms-2">Registered: {new Date(u.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-cyan-100 text-cyan-900 font-bold uppercase text-[10px]">
                      {u.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 14: LOGS */}
          {activeTab === 'logs' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-base font-bold text-slate-900">{t('tabLogs')}</h2>
              <div className="divide-y divide-slate-100 text-xs font-mono">
                {logsList.map(log => (
                  <div key={log.id} className="py-2.5 flex items-start justify-between gap-4">
                    <div>
                      <span className="font-bold text-cyan-800">{log.action}</span>
                      <span className="text-slate-500 ms-2">{log.details}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-slate-900 text-sm">Update Administrator Password</h3>
            
            {passError && <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded">{passError}</div>}
            {passSuccess && <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded">{passSuccess}</div>}

            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">New Password (min 8 chars)</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-slate-900 text-white font-bold rounded-lg"
                >
                  Save Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
