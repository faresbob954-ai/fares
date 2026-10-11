import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface AdPlacementProps {
  format: 'leaderboard' | 'sidebar' | 'in-feed';
  className?: string;
}

export const AdPlacement: React.FC<AdPlacementProps> = ({ format, className = '' }) => {
  const { t } = useLanguage();

  return (
    <div
      className={`my-6 mx-auto w-full max-w-5xl rounded-lg border border-dashed border-slate-300 bg-slate-100/70 p-4 text-center transition-colors ${className}`}
      aria-label="Configured Advertisement Slot"
    >
      <div className="flex items-center justify-between text-xs text-slate-600 mb-2 font-mono uppercase tracking-wider">
        <span>{t('adLabel')}</span>
        <span>AdSense Ready</span>
      </div>

      <div
        className={`flex items-center justify-center rounded bg-slate-200/80 text-slate-500 text-xs font-mono select-none ${
          format === 'leaderboard'
            ? 'h-24 sm:h-28 w-full'
            : format === 'sidebar'
            ? 'h-64 w-full'
            : 'h-24 w-full'
        }`}
      >
        <div className="space-y-1 text-center px-4">
          <p className="font-medium text-slate-600">
            {format === 'leaderboard'
              ? t('adPlaceholderLeaderboard')
              : format === 'sidebar'
              ? t('adPlaceholderSidebar')
              : 'Standard Responsive Banner Placement'}
          </p>
          <p className="text-[11px] text-slate-600">
            {t('adNotice')}
          </p>
        </div>
      </div>
    </div>
  );
};
