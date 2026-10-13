import React from 'react';

interface HeaderProps {
  onOpenWriteModal: () => void;
  onOpenMembershipModal: () => void;
  onSelectTopic: (topic: any) => void;
  onScrollToStories: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWriteModal,
  onOpenMembershipModal,
  onScrollToStories,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in editorial display face) */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-2xl lg:text-3xl font-serif font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 group hover:opacity-90 transition-opacity"
        >
          <svg
            className="w-8 h-8 text-stone-900 group-hover:scale-105 transition-transform"
            viewBox="0 0 1043 596"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M589 298c0 165-132 298-295 298S0 463 0 298 131 0 295 0s294 133 294 298zM929 298c0 155-66 281-147 281s-148-126-148-281 66-281 148-281 147 126 147 281zM1043 298c0 142-23 257-51 257s-51-115-51-257 23-257 51-257 51 115 51 257z" />
          </svg>
          <span className="font-serif">Medium</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={onScrollToStories}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            Our story
          </button>
          <button
            onClick={onOpenMembershipModal}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Membership
          </button>
          <button
            onClick={onOpenWriteModal}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-4 h-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Write
          </button>
          <button
            onClick={onOpenMembershipModal}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Sign in
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {savedCount > 0 && (
            <button
              onClick={() => {
                const element = document.getElementById('stories-feed-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              title="View your saved reading list"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-stone-700" viewBox="0 0 24 24">
                <path d="M5 3v18l7-4 7 4V3H5z" />
              </svg>
              <span>{savedCount} Saved</span>
            </button>
          )}

          <button
            onClick={onOpenMembershipModal}
            className="px-5 py-2.5 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-full transition-all duration-150 whitespace-nowrap shrink-0 shadow-xs cursor-pointer active:scale-98"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
