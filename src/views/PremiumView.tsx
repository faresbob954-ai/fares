import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Check, 
  X, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Zap, 
  FileSpreadsheet, 
  Bell, 
  LifeBuoy, 
  CreditCard, 
  HelpCircle,
  ChevronDown,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEOMeta } from '../components/SEOMeta';

interface PremiumViewProps {
  onNavigateHome: () => void;
  onNavigateCompare: () => void;
}

export const PremiumView: React.FC<PremiumViewProps> = ({ onNavigateHome, onNavigateCompare }) => {
  const { language, t, isRTL } = useLanguage();
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('year');
  const [customerEmail, setCustomerEmail] = useState('');
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [stripeConfig, setStripeConfig] = useState<any>(null);
  const [checkoutStatusParam, setCheckoutStatusParam] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  useEffect(() => {
    // Check URL parameters for return status
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const checkout = urlParams.get('checkout');
      if (checkout) {
        setCheckoutStatusParam(checkout);
      }
    }

    // Fetch stripe configuration status
    fetch('/api/stripe/config')
      .then(res => res.json())
      .then(data => setStripeConfig(data))
      .catch(err => console.error('[STRIPE CONFIG]', err));
  }, []);

  const handleStartCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError(null);

    if (!customerEmail || !customerEmail.includes('@')) {
      setCheckoutError(language === 'ar' ? 'يرجى إدخال بريد إلكتروني صالح للمتابعة.' : 'Please enter a valid email address to proceed.');
      return;
    }

    setLoadingCheckout(true);

    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: 'plan-premium',
          interval: billingInterval,
          customerEmail,
          successUrl: `${window.location.origin}/premium?checkout=success`,
          cancelUrl: `${window.location.origin}/premium?checkout=canceled`
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize checkout session.');
      }

      if (data.url) {
        // Redirect to real Stripe Checkout hosted page
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received from Stripe service.');
      }
    } catch (err: any) {
      setCheckoutError(err.message || 'An error occurred during Stripe checkout initialization.');
    } finally {
      setLoadingCheckout(false);
    }
  };

  const featureMatrix = [
    {
      featureEn: 'Side-by-side hardware matrix (up to 4 devices)',
      featureAr: 'مقارنة عتادية متزامنة (حتى 4 أجهزة)',
      free: true,
      pro: true
    },
    {
      featureEn: 'Factual difference detector & highlight',
      featureAr: 'أداة كشف وإبراز الفروقات العتادية',
      free: true,
      pro: true
    },
    {
      featureEn: 'Access to all public educational buying guides',
      featureAr: 'الوصول لكافة أدلة الشراء والمقالات التعليمية',
      free: true,
      pro: true
    },
    {
      featureEn: 'Unlimited saved comparison lists across sessions',
      featureAr: 'حفظ غير محدود لقوائم المقارنة والمزامنة السحابية',
      free: false,
      pro: true
    },
    {
      featureEn: 'Direct PDF / CSV spec sheet export for IT procurement',
      featureAr: 'تصدير جداول المواصفات بصيغتي PDF وCSV للمؤسسات والشركات',
      free: false,
      pro: true
    },
    {
      featureEn: 'Hardware change tracking & price fluctuation alerts',
      featureAr: 'تنبيهات فورية لتحديثات العتاد ورصد تذبذب الأسعار',
      free: false,
      pro: true
    },
    {
      featureEn: '100% Ad-free browsing experience',
      featureAr: 'تصفح خالٍ تماماً من أي مساحات إعلانية',
      free: false,
      pro: true
    },
    {
      featureEn: 'Priority spec sheet correction & audit review',
      featureAr: 'أولوية مراجعة طلبات تصحيح المواصفات وتدقيقها',
      free: false,
      pro: true
    }
  ];

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8">
      <SEOMeta
        title={t('premiumTitle')}
        description={t('premiumSubtitle')}
      />

      {/* Return Toast Alerts */}
      {checkoutStatusParam === 'success' && (
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 flex items-center gap-3 text-emerald-900 animate-in fade-in">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div className="text-xs sm:text-sm">
              <strong className="block font-bold">
                {language === 'ar' ? 'تم تأكيد اشتراكك بنجاح في باقة نيكسورا برو (Nexora Pro)!' : 'Stripe Checkout Complete: Welcome to Nexora Pro!'}
              </strong>
              <span>
                {language === 'ar'
                  ? 'تم تفعيل حسابك وسيتم إرسال إيصال الدفع الرسمي إلى بريدك الإلكتروني.'
                  : 'Your subscription record has been verified. A formal Stripe receipt has been issued.'}
              </span>
            </div>
          </div>
        </div>
      )}

      {checkoutStatusParam === 'canceled' && (
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-center gap-3 text-amber-900 animate-in fade-in">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
            <div className="text-xs sm:text-sm">
              <strong className="block font-bold">
                {language === 'ar' ? 'تم إلغاء عملية الدفع' : 'Stripe Checkout Canceled'}
              </strong>
              <span>
                {language === 'ar'
                  ? 'لم يتم خصم أي مبالغ. يمكنك إعادة المحاولة متى شئت.'
                  : 'No charges were made. You can resume checkout at any time.'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 1. DISTINCTIVE HERO SECTION */}
      <section className="relative overflow-hidden bg-radial from-slate-900 via-slate-950 to-black text-white py-16 sm:py-24 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 border border-slate-800 shadow-2xl">
        {/* Restrained Gold & Cyan Accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('premiumBadge')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {t('premiumTitle')}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t('premiumSubtitle')}
          </p>

          {/* Billing Switcher (Monthly vs Annual with 25% savings) */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${billingInterval === 'month' ? 'text-white' : 'text-slate-400'}`}>
              {t('billingMonthly')}
            </span>
            <button
              type="button"
              onClick={() => setBillingInterval(billingInterval === 'year' ? 'month' : 'year')}
              className="relative w-14 h-7 bg-slate-800 rounded-full p-1 transition-colors border border-slate-700 cursor-pointer"
              aria-label="Toggle Billing Interval"
            >
              <div
                className={`w-5 h-5 rounded-full bg-cyan-400 transition-transform ${
                  billingInterval === 'year' ? (isRTL ? '-translate-x-7' : 'translate-x-7') : 'translate-x-0'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-semibold ${billingInterval === 'year' ? 'text-white' : 'text-slate-400'}`}>
                {t('billingAnnual')}
              </span>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                {t('annualSavingsBadge')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRICING CARDS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Free Community Tier */}
          <div className="bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#171923] dark:text-[#F5F7FF]">{t('freePlanTitle')}</h3>
                <p className="text-xs text-[#687083] dark:text-[#94A3B8]">
                  {language === 'ar' ? 'للمستخدمين الأفراد والباحثين عن مواصفات عتادية سريعة.' : 'Standard factual comparisons for everyday electronics buyers.'}
                </p>
              </div>

              <div className="py-4 border-y border-[#E8EAF0] dark:border-[#2A2E39] flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-[#171923] dark:text-[#F5F7FF] font-mono">$0</span>
                <span className="text-xs text-[#687083] dark:text-slate-400">/ forever</span>
              </div>

              <ul className="space-y-3 text-xs text-[#687083] dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'مقارنة حتى 4 أجهزة جنباً إلى جنب' : 'Side-by-side spec comparisons (up to 4 devices)'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'محدد وإبراز الفروقات العتادية' : 'Factual difference detector & highlight'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'الوصول لكافة المقالات وأدلة الشراء' : 'Access to all public educational buying guides'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'بيانات معتمدة من وثائق المصنّعين' : 'Unbiased manufacturer-sourced data'}</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onNavigateCompare}
              className="w-full py-3 bg-[#F7F8FC] dark:bg-[#111318] hover:bg-[#E8EAF0] dark:hover:bg-[#20242E] text-[#171923] dark:text-[#F5F7FF] rounded-xl text-xs font-bold transition-colors cursor-pointer border border-[#E8EAF0] dark:border-[#2A2E39]"
            >
              {t('freePlanCta')}
            </button>
          </div>

          {/* Card 2: Nexora Pro (Featured) */}
          <div className="relative bg-gradient-to-b from-[#191C24] to-[#111318] text-white rounded-2xl border-2 border-amber-400/80 p-8 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
              {language === 'ar' ? 'الأكثر طلباً للمحترفين' : 'Most Popular'}
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-bold text-white">{t('premiumPlanTitle')}</h3>
                </div>
                <p className="text-xs text-slate-300">
                  {language === 'ar' ? 'للمهندسين والمحللين وفرق المشتريات الباحثين عن كفاءة متقدمة.' : 'For IT evaluators, developers, and tech professionals.'}
                </p>
              </div>

              <div className="py-4 border-y border-slate-800 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-amber-300 font-mono">
                  {billingInterval === 'year' ? '$89.99' : '$9.99'}
                </span>
                <span className="text-xs text-slate-400">
                  {billingInterval === 'year' ? t('perYear') : t('perMonth')} ({billingInterval === 'year' ? t('billedAnnually') : t('billedMonthly')})
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="font-medium">{language === 'ar' ? 'حفظ غير محدود لقوائم المقارنة والمزامنة عبر الأجهزة' : 'Unlimited saved comparison matrices across devices'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'تصدير مباشر لجداول المواصفات بصيغتي PDF وCSV' : 'Direct PDF & CSV spec sheet export for procurement'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'تنبيهات مخصصة لتحديثات العتاد وتذبذب الأسعار' : 'Custom hardware spec alerts & price tracking'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'تصفح نظيف وسريع خالي تماماً من الإعلانات' : 'Ad-free clean browsing experience'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{language === 'ar' ? 'أولوية مراجعة وتدقيق المواصفات العتادية' : 'Priority specification correction verification'}</span>
                </li>
              </ul>
            </div>

            {/* Secure Stripe Checkout Form */}
            <form onSubmit={handleStartCheckout} className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  {language === 'ar' ? 'البريد الإلكتروني لحساب الاشتراك:' : 'Subscriber Account Email:'}
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="subscriber@example.com"
                  className="w-full px-3 py-2 text-xs bg-slate-800/90 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {checkoutError && (
                <div className="p-2.5 bg-red-950/80 border border-red-700 text-red-200 text-xs rounded-lg">
                  {checkoutError}
                </div>
              )}

              <button
                type="submit"
                disabled={loadingCheckout}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CreditCard className="w-4 h-4" />
                <span>
                  {loadingCheckout
                    ? (language === 'ar' ? 'جاري الاتصال بـ Stripe...' : 'Connecting to Stripe...')
                    : t('subscribeNow')}
                </span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Official Stripe SSL 256-bit Encryption</span>
                </span>
                <span className="font-mono">
                  {stripeConfig?.mode === 'test' ? 'Stripe Test Mode' : 'PCI-Compliant'}
                </span>
              </div>
            </form>

          </div>

        </div>

        {/* Cancellation Notice */}
        <p className="text-center text-xs text-[#687083] dark:text-slate-400 mt-6 max-w-xl mx-auto">
          {t('recurringNotice')}
        </p>
      </section>

      {/* 3. DETAILED FEATURE BREAKDOWN MATRIX */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#171923] dark:text-[#F5F7FF]">
            {t('planFeatureComparisonTitle')}
          </h2>
          <p className="text-xs text-[#687083] dark:text-[#94A3B8]">
            {language === 'ar' ? 'شفافية كاملة حول ما يحصل عليه كل مستخدم في المنصة.' : 'Complete transparency regarding capabilities across both tiers.'}
          </p>
        </div>

        <div className="bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs min-w-[500px]">
              <thead>
                <tr className="bg-[#F7F8FC] dark:bg-[#111318] border-b border-[#E8EAF0] dark:border-[#2A2E39] text-[#171923] dark:text-[#F5F7FF]">
                  <th className="p-4 font-bold">{t('featureMatrixFeature')}</th>
                  <th className="p-4 font-bold text-center w-36">{t('featureMatrixFree')}</th>
                  <th className="p-4 font-bold text-center w-36 bg-amber-500/10 text-amber-500 dark:text-amber-400">{t('featureMatrixPro')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EAF0] dark:divide-[#2A2E39]">
                {featureMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#F7F8FC]/60 dark:hover:bg-[#111318]/40 transition-colors">
                    <td className="p-4 font-medium text-[#171923] dark:text-slate-300">
                      {language === 'ar' ? item.featureAr : item.featureEn}
                    </td>
                    <td className="p-4 text-center">
                      {item.free ? (
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-[#687083] dark:text-slate-500 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center bg-amber-500/5">
                      <Check className="w-4 h-4 text-amber-600 dark:text-amber-400 font-bold mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#171923] dark:text-[#F5F7FF]">{t('faqTitle')}</h2>
          <p className="text-xs text-[#687083] dark:text-[#94A3B8]">
            {language === 'ar' ? 'إجابات واضحة ومباشرة عن الاشتراكات وبوابة الدفع.' : 'Clear answers regarding payments, cancellation, and data integrity.'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#191C24] rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left rtl:text-right flex items-center justify-between text-xs sm:text-sm font-bold text-[#171923] dark:text-[#F5F7FF] hover:bg-[#F7F8FC] dark:hover:bg-[#111318] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#687083] dark:text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-[#635BFF] dark:text-[#36BFFA]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#687083] dark:text-[#94A3B8] leading-relaxed border-t border-[#E8EAF0] dark:border-[#2A2E39]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
