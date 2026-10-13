import React from 'react';

interface EditorialThumbnailProps {
  theme: 'stone' | 'amber' | 'emerald' | 'indigo' | 'rose' | 'slate' | 'teal';
  title: string;
  topic: string;
  className?: string;
  aspectRatio?: '4/3' | '16/9' | 'square';
}

const THEME_STYLES = {
  stone: {
    bg: 'bg-stone-100',
    primary: '#44403c',
    secondary: '#a8a29e',
    accent: '#292524',
    border: 'border-stone-200',
    glow: 'from-stone-200/50 to-stone-100',
  },
  amber: {
    bg: 'bg-amber-50',
    primary: '#b45309',
    secondary: '#f59e0b',
    accent: '#78350f',
    border: 'border-amber-200',
    glow: 'from-amber-100/60 to-orange-50',
  },
  emerald: {
    bg: 'bg-emerald-50',
    primary: '#047857',
    secondary: '#10b981',
    accent: '#064e3b',
    border: 'border-emerald-200',
    glow: 'from-emerald-100/50 to-teal-50',
  },
  indigo: {
    bg: 'bg-indigo-50',
    primary: '#4338ca',
    secondary: '#6366f1',
    accent: '#312e81',
    border: 'border-indigo-200',
    glow: 'from-indigo-100/50 to-blue-50',
  },
  rose: {
    bg: 'bg-rose-50',
    primary: '#be123c',
    secondary: '#fb7185',
    accent: '#881337',
    border: 'border-rose-200',
    glow: 'from-rose-100/50 to-orange-50',
  },
  slate: {
    bg: 'bg-slate-100',
    primary: '#334155',
    secondary: '#94a3b8',
    accent: '#0f172a',
    border: 'border-slate-200',
    glow: 'from-slate-200/50 to-slate-100',
  },
  teal: {
    bg: 'bg-teal-50',
    primary: '#0f766e',
    secondary: '#14b8a6',
    accent: '#134e4a',
    border: 'border-teal-200',
    glow: 'from-teal-100/50 to-cyan-50',
  },
};

export const EditorialThumbnail: React.FC<EditorialThumbnailProps> = ({
  theme,
  title,
  topic,
  className = '',
  aspectRatio = '4/3',
}) => {
  const currentTheme = THEME_STYLES[theme] || THEME_STYLES.stone;
  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : 'aspect-[4/3]';

  // Seeded variation based on title string
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variant = hash % 4;

  return (
    <div
      className={`relative overflow-hidden rounded-md ${currentTheme.bg} border ${currentTheme.border} ${aspectClass} ${className} flex items-center justify-center select-none group-hover:opacity-95 transition-all duration-300`}
      aria-label={`Editorial illustration for ${title}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.glow} opacity-80`} />

      {/* Decorative SVG Geometric Artwork */}
      {variant === 0 && (
        <svg
          viewBox="0 0 200 150"
          className="w-full h-full p-4 relative z-10 transition-transform duration-500 ease-out group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="75" r="48" stroke={currentTheme.secondary} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="100" cy="75" r="32" stroke={currentTheme.primary} strokeWidth="2" />
          <path d="M60 75 H140 M100 35 V115" stroke={currentTheme.accent} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
          <circle cx="100" cy="75" r="5" fill={currentTheme.accent} />
          <rect x="76" y="51" width="48" height="48" stroke={currentTheme.secondary} strokeWidth="1" transform="rotate(45 100 75)" opacity="0.4" />
        </svg>
      )}

      {variant === 1 && (
        <svg
          viewBox="0 0 200 150"
          className="w-full h-full p-4 relative z-10 transition-transform duration-500 ease-out group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="40" y="30" width="120" height="90" rx="3" stroke={currentTheme.secondary} strokeWidth="1.5" opacity="0.4" />
          <path d="M40 90 Q100 40 160 90" stroke={currentTheme.primary} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M40 70 Q100 120 160 70" stroke={currentTheme.accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <circle cx="70" cy="55" r="7" fill={currentTheme.secondary} opacity="0.8" />
          <circle cx="130" cy="95" r="4" fill={currentTheme.primary} />
        </svg>
      )}

      {variant === 2 && (
        <svg
          viewBox="0 0 200 150"
          className="w-full h-full p-4 relative z-10 transition-transform duration-500 ease-out group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="30" y1="35" x2="170" y2="35" stroke={currentTheme.secondary} strokeWidth="1.5" opacity="0.5" />
          <line x1="30" y1="55" x2="135" y2="55" stroke={currentTheme.primary} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="75" x2="160" y2="75" stroke={currentTheme.accent} strokeWidth="1.5" opacity="0.7" />
          <line x1="30" y1="95" x2="110" y2="95" stroke={currentTheme.secondary} strokeWidth="1.5" opacity="0.5" />
          <line x1="30" y1="115" x2="145" y2="115" stroke={currentTheme.secondary} strokeWidth="1.5" opacity="0.3" />
          <rect x="135" y="65" width="30" height="40" rx="2" stroke={currentTheme.primary} strokeWidth="1.5" fill={currentTheme.bg} />
          <circle cx="150" cy="85" r="6" fill={currentTheme.accent} />
        </svg>
      )}

      {variant === 3 && (
        <svg
          viewBox="0 0 200 150"
          className="w-full h-full p-4 relative z-10 transition-transform duration-500 ease-out group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="100,25 155,120 45,120" stroke={currentTheme.primary} strokeWidth="2" fill="none" />
          <polygon points="100,50 135,110 65,110" stroke={currentTheme.secondary} strokeWidth="1.2" strokeDasharray="2 2" fill="none" opacity="0.7" />
          <circle cx="100" cy="80" r="14" stroke={currentTheme.accent} strokeWidth="1.5" />
          <circle cx="100" cy="80" r="4" fill={currentTheme.primary} />
        </svg>
      )}

      {/* Tiny editorial watermark stamp in corner */}
      <span className="absolute bottom-2 right-2 text-[10px] uppercase font-sans tracking-widest text-stone-500 font-medium px-1.5 py-0.5 rounded bg-white/70 backdrop-blur-xs opacity-75 group-hover:opacity-100 transition-opacity">
        {topic}
      </span>
    </div>
  );
};
