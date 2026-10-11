import React from 'react';
import { Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { PolicyModalType } from './Modals/PolicyModal';
import { NexoraLogo } from './NexoraLogo';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenPolicyModal: (type: PolicyModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicyModal }) => {
  const { language, t } = useLanguage();
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#111318] text-[#687083] dark:text-[#A5ADBD] border-t border-[#E8EAF0] dark:border-[#2A2E39] mt-20 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E8EAF0] dark:border-[#2A2E39]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <NexoraLogo size="lg" showWordmark={true} theme={isDark ? 'dark' : 'light'} />
            
            <p className="text-xs text-[#687083] dark:text-slate-400 leading-relaxed max-w-sm">
              {t('footerDesc')}
            </p>

            {/* Official Support Email */}
            <div className="pt-2 text-xs text-[#171923] dark:text-slate-300 space-y-1">
              <div className="flex items-center gap-2 text-[#635BFF] dark:text-[#36BFFA] font-mono text-[11px]">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <a href="mailto:support@tooloraweb.com" className="hover:underline">
                  support@tooloraweb.com
                </a>
              </div>
              <p className="text-[11px] text-[#687083] dark:text-slate-500">
                {language === 'ar' ? 'البريد الرسمي المعتمد للتواصل والملاحظات الفنية' : 'Official correspondence address for inquiries & hardware feedback'}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#171923] dark:text-[#F5F7FF] uppercase tracking-wider">
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('navHome')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('compare')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('navCompare')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('navCatalog')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('articles')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('navArticles')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('premium')}
                  className="text-[#635BFF] dark:text-[#36BFFA] hover:underline font-semibold cursor-pointer"
                >
                  {t('navPremium')} ★
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#171923] dark:text-[#F5F7FF] uppercase tracking-wider">
              {t('footerCategories')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog', 'smartphones')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('catSmartphones')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog', 'laptops')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('catLaptops')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog', 'tablets')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('catTablets')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog', 'headphones')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('catHeadphones')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog', 'smartwatches')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('catSmartwatches')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog', 'monitors')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('catMonitors')}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#171923] dark:text-[#F5F7FF] uppercase tracking-wider">
              {t('footerLegal')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('modalAboutTitle')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('modalContactTitle')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicyModal('privacy')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('modalPrivacyTitle')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicyModal('terms')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('modalTermsTitle')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicyModal('affiliate')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('modalAffiliateTitle')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicyModal('editorial')}
                  className="text-[#687083] dark:text-slate-400 hover:text-[#635BFF] dark:hover:text-[#36BFFA] transition-colors cursor-pointer"
                >
                  {t('modalEditorialTitle')}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 space-y-4">
          <p className="text-[11px] text-[#687083] dark:text-slate-400 leading-relaxed text-center sm:text-left">
            {t('footerDisclaimer')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#687083] dark:text-[#A5ADBD] pt-2 border-t border-[#E8EAF0] dark:border-[#2A2E39]">
            <span>{t('copyright', { year: currentYear })}</span>
            <div className="mt-2 sm:mt-0 flex items-center gap-4 text-[11px]">
              <span className="font-mono">Contact: support@tooloraweb.com</span>
              <span>·</span>
              <span>Bilingual LTR / RTL Architecture</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
