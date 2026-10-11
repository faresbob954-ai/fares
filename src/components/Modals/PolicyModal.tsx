import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, FileText, Send, Building2, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export type PolicyModalType = 'about' | 'contact' | 'privacy' | 'terms' | 'affiliate' | 'editorial' | null;

interface PolicyModalProps {
  type: PolicyModalType;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  const { language, t, isRTL } = useLanguage();
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  if (!type) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setContactSubmitted(true);
  };

  const getTitle = () => {
    switch (type) {
      case 'about':
        return t('modalAboutTitle');
      case 'contact':
        return t('modalContactTitle');
      case 'privacy':
        return t('modalPrivacyTitle');
      case 'terms':
        return t('modalTermsTitle');
      case 'affiliate':
        return t('modalAffiliateTitle');
      case 'editorial':
        return t('modalEditorialTitle');
      default:
        return '';
    }
  };

  const renderContent = () => {
    if (type === 'about') {
      return (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <div className="flex items-center gap-3 p-3 bg-cyan-50/60 rounded-lg border border-cyan-100 text-cyan-950 font-medium">
            <Building2 className="w-5 h-5 text-cyan-700 shrink-0" />
            <span>
              {language === 'ar'
                ? 'نيكسورا (Nexora) هي منصة مستقلة تأسست لتمكين مشتري الإلكترونيات من المقارنة المباشرة استناداً إلى المواصفات الهندسية الدقيقة.'
                : 'Nexora is an independent evaluation platform built to empower tech buyers with side-by-side engineering comparisons.'}
            </span>
          </div>
          <p>
            {language === 'ar'
              ? 'نهدف إلى إنهاء عصر المصطلحات التسويقية الغامضة والأرقام الزائفة. نقوم بتجميع وتنظيم المواصفات التقنية الرسمية من الشركات المصنعة وتوحيد وحدات القياس (مثل السطوع بالنيتس، دقة المستشعرات، سعة البطاريات بالمللي أمبير/واط-ساعة) ليتمكن المستخدم من اتخاذ القرار الأنسب لمتطلباته الحقيقية.'
              : 'Our mission is to cut through marketing hyperbole. We systematically compile public technical disclosures, whitepapers, and hardware schematics into normalized comparative matrices so you can make informed choices based on factual merits.'}
          </p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-2">
              {language === 'ar' ? 'ركائز عملنا الأساسية:' : 'Our Core Tenets:'}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>{language === 'ar' ? 'فصل الحقائق العتادية عن التقييمات الشخصية المدفوعة.' : 'Total separation of hardware facts from paid subjective opinions.'}</li>
              <li>{language === 'ar' ? 'الشفافية الكاملة وتوضيح مصادر البيانات والأسعار التقديرية.' : 'Explicit transparency regarding data sources and illustrative pricing.'}</li>
              <li>{language === 'ar' ? 'دعم حقيقي ثنائي اللغة (العربية والإنجليزية) بالكامل.' : 'First-class bilingual architecture engineered from day one.'}</li>
            </ul>
          </div>
        </div>
      );
    }

    if (type === 'contact') {
      return (
        <div className="text-sm">
          {contactSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-slate-900">
                {language === 'ar' ? 'تم استلام رسالتك بنجاح' : 'Message Received Successfully'}
              </h4>
              <p className="text-slate-600 max-w-md mx-auto">
                {t('contactSentSuccess')}
              </p>
              <button
                type="button"
                onClick={() => {
                  setContactSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-cyan-800 hover:text-cyan-900 hover:underline"
              >
                {language === 'ar' ? 'إرسال استفسار آخر' : 'Send another inquiry'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <p className="text-slate-600">
                {language === 'ar'
                  ? 'هل لاحظت خطأ في مواصفات جهاز أو ترغب في اقتراح فئة جديدة؟ يسعدنا التواصل معك مباشرة.'
                  : 'Have a spec correction, technical feedback, or device suggestion? Send us a direct note below.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('contactName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('contactEmail')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('contactSubject')}
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={language === 'ar' ? 'مثال: تصحيح مواصفات مستشعر كاميرا...' : 'e.g. Specification correction request...'}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('contactMessage')} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                />
              </div>

              <div className="text-[11px] text-slate-600">
                {t('contactDisclaimer')}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-md text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('contactSend')}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      );
    }

    if (type === 'editorial') {
      return (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 flex items-start gap-2 text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{language === 'ar' ? 'النزاهة والحياد التحريري' : 'Editorial & Data Standards'}</p>
              <p className="text-xs text-emerald-800 mt-0.5">
                {language === 'ar'
                  ? 'لا نقبل الرشاوى الإعلانية أو تعديل ترتيب المواصفات لصالح أي مصنّع.'
                  : 'We never accept financial compensation in exchange for favorable specification ranking.'}
              </p>
            </div>
          </div>
          <h4 className="font-semibold text-slate-900">{language === 'ar' ? '1. مصادر البيانات المعتمدة' : '1. Approved Data Sources'}</h4>
          <p>
            {language === 'ar'
              ? 'تعتمد جميع المواصفات المعروضة في جداول المقارنة على أوراق البيانات التقنية الرسمية (Technical Datasheets) وكتيبات المواصفات وشهادات الاعتماد (مثل FCC وJEITA وVESA وIP Standards).'
              : 'All technical parameters rendered in our matrix are cross-referenced with manufacturer engineering whitepapers, regulatory submissions (FCC, Bluetooth SIG, VESA, JEITA), and verified product manuals.'}
          </p>
          <h4 className="font-semibold text-slate-900">{language === 'ar' ? '2. التعامل مع عينات الأسعار' : '2. Handling Reference & Sample Pricing'}</h4>
          <p>
            {language === 'ar'
              ? 'الأسعار المعروضة هي أسعار استرشادية مبنية على السعر المقترح من الشركة المصنعة (MSRP) أو الأسعار المرجعية النموذجية. نحن نحدد بوضوح أن هذه الأسعار استرشادية ولا تمثل عروضاً بيعية حية ملزمة.'
              : 'Prices displayed are baseline reference figures derived from initial manufacturer suggested retail pricing (MSRP). We explicitly flag sample pricing so readers never confuse illustrative reference brackets with real-time merchant stock offers.'}
          </p>
          <h4 className="font-semibold text-slate-900">{language === 'ar' ? '3. عدم اختلاق الفائزين' : '3. Zero Arbitrary Winner Declarations'}</h4>
          <p>
            {language === 'ar'
              ? 'لا نحدد منتجاً كـ "فائز مطلق" استناداً إلى أرقام تقييم مصطنعة؛ لأن احتياج المصور يختلف عن احتياج المبرمج أو الرياضي. نتيح لك ميزة تسليط الضوء على الفروقات الواقعية لتقرر بنفسك.'
              : 'Nexora deliberately does not assign arbitrary proprietary scorecards or declare automated winners. A lightweight device with 20h battery life might be ideal for one professional, while another requires maximum GPU wattage. We present verified factual deltas and let you decide.'}
          </p>
        </div>
      );
    }

    if (type === 'affiliate') {
      return (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs">
            <strong>{language === 'ar' ? 'إفصاح شفاف للجمهور:' : 'Federal Trade Commission & Global Regulatory Disclosure:'}</strong>
            <p className="mt-1">
              {language === 'ar'
                ? 'تم تصميم بنية نيكسورا (Nexora) لتكون متوافقة مع متطلبات برامج التسويق بالعمولة مستقبلاً، مع التزامنا الصارم بعدم تأثير أي عمولة على دقة المقارنات التقنية.'
                : 'Nexora is architected to support future affiliate partnerships. We are committed to complete transparency regarding referral arrangements.'}
            </p>
          </div>
          <p>
            {language === 'ar'
              ? 'في حال تفعيل روابط الشركاء في المستقبل، قد نحصل على عمولة إحالة صغيرة إذا قمت بالنقر على رابط تاجر معتمد وإتمام عملية الشراء. هذه العمولة لا تزيد من السعر النهائي الذي تدفعه على الإطلاق وتساعد في تغطية تكاليف الخوادم المستقلة وأبحاث تدقيق المواصفات.'
              : 'If outbound retailer links are activated in the future, Nexora may earn an affiliate commission on qualifying purchases made through those links. This occurs at zero additional cost to you and supports the ongoing independent maintenance and verification of our technical hardware catalog.'}
          </p>
          <p>
            {language === 'ar'
              ? 'في النسخة الحالية، جميع روابط ومراجع المتاجر هي نماذج تجريبية استرشادية (Reference Links) ولا تحتوي على أي كود تتبع خاص أو عمولات حية.'
              : 'In this current deployment, all retailer links are demonstration reference placeholders without tracking cookies or live commercial affiliate IDs.'}
          </p>
        </div>
      );
    }

    if (type === 'privacy') {
      return (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            {language === 'ar'
              ? 'نحن نحترم خصوصيتك بالكامل. تعمل منصة نيكسورا (Nexora) كمنصة معلومات مفتوحة دون اشتراط تسجيل حساب شخصي أو إدخال بيانات بنكية.'
              : 'Your privacy is paramount. Nexora is designed as an open consumer reference tool without mandatory registration, password walls, or invasive profiling.'}
          </p>
          <h4 className="font-semibold text-slate-900">{language === 'ar' ? '1. تخزين البيانات محلياً' : '1. Client-Side Preferences'}</h4>
          <p>
            {language === 'ar'
              ? 'نستخدم التخزين المحلي في متصفحك (localStorage) فقط لتذكر لغتك المفضلة (العربية أو الإنجليزية) وحفظ قائمة الأجهزة التي اخترت مقارنتها أثناء جلستك الحالية.'
              : 'We use client-side browser storage (localStorage) exclusively to persist your chosen language preference and your active side-by-side comparison queue.'}
          </p>
          <h4 className="font-semibold text-slate-900">{language === 'ar' ? '2. ملفات تعريف الارتباط والإعلانات المستقبيلة' : '2. Future AdSense Cookies'}</h4>
          <p>
            {language === 'ar'
              ? 'عند تفعيل شبكة Google AdSense مستقبلاً، قد تستخدم Google ملفات تعريف ارتباط لتقديم إعلانات ذات صلة وفقاً لسياسات الخصوصية الخاصة بها. لا نقوم ببيع بياناتك لأي جهة خارجية.'
              : 'When third-party ad networks (such as Google AdSense) are deployed, they may utilize cookies to serve relevant contextual advertisements in accordance with standard privacy frameworks. Nexora does not sell personal records.'}
          </p>
        </div>
      );
    }

    // Terms
    return (
      <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
        <p>
          {language === 'ar'
            ? 'باستخدامك لموقع نيكسورا (Nexora)، فإنك توافق على الشروط والأحكام التالية:'
            : 'By accessing and utilizing Nexora, you agree to the following terms and terms of use:'}
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>{language === 'ar' ? 'طبيعة المعلومات:' : 'Informational Reference Only:'}</strong>{' '}
            {language === 'ar'
              ? 'المواصفات الفنية مقدمة لأغراض المقارنة والاسترشاد. يجب التحقق من الموديل الدقيق مع البائع المعتمد في بلدك قبل الشراء.'
              : 'Specification matrices are published for comparative reference. Hardware variants, cellular bands, and power plugs vary by region; always verify local SKU details with authorized merchants.'}
          </li>
          <li>
            <strong>{language === 'ar' ? 'العلامات التجارية:' : 'Trademarks:'}</strong>{' '}
            {language === 'ar'
              ? 'جميع أسماء الشركات والعلامات التجارية (مثل Apple, Samsung, Dell, Sony, Garmin) هي ملكية لأصحابها وتُذكر لغرض تحديد المنتجات فقط.'
              : 'All brand names, trademarks, and model identifiers remain the property of their respective owners and are referenced solely for identification and comparison under nominative fair use.'}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#191C24] rounded-2xl shadow-2xl border border-[#E8EAF0] dark:border-[#2A2E39] overflow-hidden max-h-[85vh] flex flex-col text-[#171923] dark:text-[#F5F7FF]"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8EAF0] dark:border-[#2A2E39] bg-[#F7F8FC] dark:bg-[#111318]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#635BFF] dark:text-[#36BFFA]" />
            <h3 id="modal-title" className="font-bold text-[#171923] dark:text-[#F5F7FF] text-lg">
              {getTitle()}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#687083] dark:text-slate-400 hover:text-[#171923] dark:hover:text-white hover:bg-[#F7F8FC] dark:hover:bg-[#20242E] rounded-lg transition-colors cursor-pointer"
            aria-label={t('modalClose')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#687083] dark:text-slate-300">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#E8EAF0] dark:border-[#2A2E39] bg-[#F7F8FC] dark:bg-[#111318] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white dark:bg-[#191C24] border border-[#E8EAF0] dark:border-[#2A2E39] hover:border-[#635BFF] text-[#171923] dark:text-[#F5F7FF] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            {t('modalClose')}
          </button>
        </div>
      </div>
    </div>
  );
};
