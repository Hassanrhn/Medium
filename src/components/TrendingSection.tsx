import React from 'react';
import { Story } from '../types';

interface TrendingSectionProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({ stories, onSelectStory }) => {
  // Take top 6 trending stories
  const trendingStories = stories
    .filter((s) => s.trendingRank !== undefined)
    .sort((a, b) => (a.trendingRank ?? 99) - (b.trendingRank ?? 99))
    .slice(0, 6);

  if (trendingStories.length === 0) return null;

  return (
    <section className="py-10 border-b border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-7 h-7 rounded-full border border-stone-900 flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-stone-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h2 className="text-sm font-bold tracking-wider uppercase font-sans text-stone-900">
            Trending on Medium
          </h2>
        </div>

        {/* 6 Ranked Stories Grid (3 cols on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7">
          {trendingStories.map((story, idx) => {
            const rankStr = String(idx + 1).padStart(2, '0');

            return (
              <article
                key={story.id}
                onClick={() => onSelectStory(story)}
                className="group flex items-start gap-4 cursor-pointer p-2 -m-2 rounded-lg hover:bg-stone-50/80 transition-colors"
              >
                {/* Visual Rank Index */}
                <span className="text-3xl font-sans font-black text-stone-300 group-hover:text-stone-400 transition-colors tabular-nums shrink-0 select-none">
                  {rankStr}
                </span>

                {/* Story Content */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  {/* Author Header */}
                  <div className="flex items-center gap-2 text-xs text-stone-700">
                    <span
                      className={`w-5 h-5 rounded-full ${story.author.avatarBg} text-[10px] font-bold flex items-center justify-center shrink-0`}
                    >
                      {story.author.avatarText}
                    </span>
                    <span className="font-semibold text-stone-900 truncate">
                      {story.author.name}
                    </span>
                    {story.publication && (
                      <>
                        <span className="text-stone-400 font-serif italic">in</span>
                        <span className="font-medium text-stone-700 truncate">
                          {story.publication}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-stone-900 font-serif leading-snug line-clamp-2 group-hover:text-stone-600 transition-colors">
                    {story.title}
                  </h3>

                  {/* Metadata (Clean unboxed text, zero pills) */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
                    <span>{story.publishedAt}</span>
                    <span aria-hidden="true">·</span>
                    <span>{story.readTime}</span>
                    {story.author.isMember && (
                      <>
                        <span aria-hidden="true">·</span>
                        <svg
                          className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0"
                          viewBox="0 0 24 24"
                          aria-label="Member-only story"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
