import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Building2, ShieldCheck, PhoneCall, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEOMeta } from '../components/SEOMeta';

export const ContactView: React.FC = () => {
  const { language, t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          language
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit contact message.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Error sending message. Please try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <SEOMeta
        title={t('navContact')}
        description="Contact the Nexora technical editorial and hardware audit team. Official email: support@tooloraweb.com."
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#635BFF]/10 text-[#635BFF] dark:text-[#36BFFA] text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-[#635BFF] dark:text-[#36BFFA]" />
          <span>support@tooloraweb.com</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171923] dark:text-[#F5F7FF] tracking-tight">
          {t('modalContactTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-[#687083] dark:text-[#94A3B8] leading-relaxed">
          {language === 'ar'
            ? 'هل لاحظت تصحيحاً لمواصفات جهاز، أو ترغب في استفسار تجاري لفرق المشتريات؟ يسعدنا التواصل معك عبر بريدنا المعتمد.'
            : 'Have a specification correction, hardware discrepancy report, or enterprise procurement inquiry? Reach out directly below.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Info Column */}
        <div className="md:col-span-5 space-y-6 bg-gradient-to-b from-[#191C24] to-[#111318] text-white p-6 sm:p-8 rounded-2xl shadow-md border border-[#2A2E39]">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">
              {language === 'ar' ? 'معلومات التواصل الرسمية' : 'Official Channels'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'ar'
                ? 'تتم مراجعة كافة رسائل الاستفسار وتصحيح المواصفات بانتظام بواسطة فريق التحرير التقني.'
                : 'All incoming inquiries and specification audit requests are tracked in our administrative dispatch inbox.'}
            </p>
          </div>

          <div className="space-y-4 text-xs border-y border-[#2A2E39] py-6">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#36BFFA] shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-slate-300">Official Correspondence</span>
                <a href="mailto:support@tooloraweb.com" className="text-[#36BFFA] font-mono hover:underline text-sm">
                  support@tooloraweb.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-slate-300">Data Integrity Policy</span>
                <span className="text-slate-400 text-[11px]">
                  Zero sponsored ranking alterations. Corrections verified against manufacturer whitepapers.
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            {t('contactDisclaimer')}
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-7 bg-white dark:bg-[#191C24] p-6 sm:p-8 rounded-2xl border border-[#E8EAF0] dark:border-[#2A2E39] shadow-xs">
          {status === 'success' ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-[#171923] dark:text-[#F5F7FF]">
                {language === 'ar' ? 'تم استلام رسالتك بنجاح' : 'Message Dispatched Successfully'}
              </h3>
              <p className="text-xs sm:text-sm text-[#687083] dark:text-slate-400 max-w-md mx-auto">
                {t('contactSentSuccess')}
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-4 px-5 py-2 bg-gradient-to-r from-[#635BFF] to-[#36BFFA] text-white rounded-xl text-xs font-bold hover:opacity-95 transition-opacity cursor-pointer shadow-xs"
              >
                {language === 'ar' ? 'إرسال استفسار آخر' : 'Send Another Inquiry'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#171923] dark:text-slate-300 mb-1">
                    {t('contactName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F8FC] dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] text-[#171923] dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#171923] dark:text-slate-300 mb-1">
                    {t('contactEmail')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#F7F8FC] dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] text-[#171923] dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171923] dark:text-slate-300 mb-1">
                  {t('contactSubject')}
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={language === 'ar' ? 'مثال: اقتراح جهاز جديد أو استفسار اشتراك Pro' : 'e.g. Spec correction or Pro tier inquiry'}
                  className="w-full px-3 py-2 text-xs bg-[#F7F8FC] dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] text-[#171923] dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171923] dark:text-slate-300 mb-1">
                  {t('contactMessage')} *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F8FC] dark:bg-[#111318] border border-[#E8EAF0] dark:border-[#2A2E39] text-[#171923] dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF] resize-none"
                />
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs rounded-xl">
                  {errorMessage}
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#635BFF] to-[#36BFFA] text-white rounded-xl text-xs font-bold hover:opacity-95 transition-opacity shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {status === 'sending'
                      ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...')
                      : t('contactSend')}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
