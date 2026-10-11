import React from 'react';

interface NexoraLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showTagline?: boolean;
  taglineText?: string;
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
}

export const NexoraLogo: React.FC<NexoraLogoProps> = ({
  size = 'md',
  showWordmark = true,
  showTagline = false,
  taglineText,
  theme = 'auto',
  className = '',
}) => {
  // Dimensions mapping
  const sizeMap = {
    xs: { badge: 'w-6 h-6', text: 'text-base', svgSize: 24, radius: 'rounded-lg' },
    sm: { badge: 'w-8 h-8', text: 'text-lg', svgSize: 32, radius: 'rounded-xl' },
    md: { badge: 'w-10 h-10', text: 'text-xl', svgSize: 40, radius: 'rounded-xl' },
    lg: { badge: 'w-12 h-12', text: 'text-2xl', svgSize: 48, radius: 'rounded-2xl' },
    xl: { badge: 'w-16 h-16', text: 'text-3xl', svgSize: 64, radius: 'rounded-2xl' },
  };

  const currentSize = sizeMap[size];

  // Theme-adaptive classes
  const badgeThemeClass =
    theme === 'dark'
      ? 'bg-[#191C24] border-[#2A2E39] shadow-sm'
      : theme === 'light'
      ? 'bg-[#F7F8FC] border-[#E8EAF0] shadow-xs'
      : 'bg-[#F7F8FC] dark:bg-[#191C24] border-[#E8EAF0] dark:border-[#2A2E39] shadow-xs';

  const textPrimaryClass =
    theme === 'dark'
      ? 'text-[#F5F6FA]'
      : theme === 'light'
      ? 'text-[#171923]'
      : 'text-[#171923] dark:text-[#F5F6FA]';

  const taglineClass =
    theme === 'dark'
      ? 'text-[#A5ADBD]'
      : theme === 'light'
      ? 'text-[#687083]'
      : 'text-[#687083] dark:text-[#A5ADBD]';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Geometric N Icon Badge */}
      <div
        className={`relative ${currentSize.badge} ${currentSize.radius} ${badgeThemeClass} border flex items-center justify-center p-1 group-hover:border-[#635BFF]/50 transition-all duration-300 shrink-0 overflow-hidden`}
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="nexoraPillarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#635BFF" />
              <stop offset="100%" stopColor="#36BFFA" />
            </linearGradient>
            <linearGradient id="nexoraBridgeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#36BFFA" />
              <stop offset="100%" stopColor="#635BFF" />
            </linearGradient>
          </defs>

          {/* Left vertical data pillar */}
          <rect
            x="14"
            y="13"
            width="7.5"
            height="38"
            rx="3.75"
            fill="url(#nexoraPillarGrad)"
          />

          {/* Right vertical data pillar */}
          <rect
            x="42.5"
            y="13"
            width="7.5"
            height="38"
            rx="3.75"
            fill="url(#nexoraPillarGrad)"
          />

          {/* Diagonal smart connection bridge */}
          <path
            d="M18 14.5 L46 49.5 H39 L14.5 18 C14 16 16 14.5 18 14.5 Z"
            fill="url(#nexoraBridgeGrad)"
            opacity="0.95"
          />

          {/* Precision comparison nodes */}
          <circle cx="17.75" cy="16.75" r="3" fill="#36BFFA" />
          <circle cx="46.25" cy="47.25" r="3" fill="#635BFF" />
          
          {/* Central alignment node */}
          <circle cx="32" cy="32" r="2" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      {showWordmark && (
        <div className="flex flex-col text-left rtl:text-right">
          <div className="flex items-center tracking-tight leading-none">
            <span className={`font-black ${currentSize.text} ${textPrimaryClass} tracking-tight`}>
              Nex
            </span>
            <span className={`font-black ${currentSize.text} bg-gradient-to-r from-[#635BFF] to-[#36BFFA] bg-clip-text text-transparent`}>
              ora
            </span>
          </div>

          {showTagline && taglineText && (
            <span className={`text-[10px] ${taglineClass} font-medium tracking-tight mt-0.5 hidden sm:block`}>
              {taglineText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
