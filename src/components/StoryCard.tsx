import React, { useState } from 'react';
import { Story } from '../types';
import { EditorialThumbnail } from './EditorialThumbnail';

interface StoryCardProps {
  story: Story;
  onSelectStory: (story: Story) => void;
  onToggleBookmark: (storyId: string) => void;
  onClap: (storyId: string) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  onSelectStory,
  onToggleBookmark,
  onClap,
}) => {
  const [justClapped, setJustClapped] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleClapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClap(story.id);
    setJustClapped(true);
    setTimeout(() => setJustClapped(false), 600);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(story.id);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <article
      onClick={() => onSelectStory(story)}
      className="group py-8 border-b border-stone-200/80 cursor-pointer transition-colors"
    >
      <div className="grid grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Side: Editorial Prose & Metadata (8-9 cols) */}
        <div className="col-span-8 sm:col-span-8 lg:col-span-9 space-y-3">
          {/* Author Byline */}
          <div className="flex items-center gap-2 text-xs text-stone-700">
            <span
              className={`w-5 h-5 rounded-full ${story.author.avatarBg} text-[10px] font-bold flex items-center justify-center shrink-0`}
            >
              {story.author.avatarText}
            </span>
            <span className="font-semibold text-stone-900 hover:underline">
              {story.author.name}
            </span>
            {story.publication && (
              <>
                <span className="text-stone-400 font-serif italic">in</span>
                <span className="font-medium text-stone-700 truncate hover:underline">
                  {story.publication}
                </span>
              </>
            )}
          </div>

          {/* Title and Subtitle */}
          <div className="space-y-1.5">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-stone-900 group-hover:text-stone-700 leading-snug tracking-tight">
              {story.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed font-sans">
              {story.subtitle}
            </p>
          </div>

          {/* Card Footer: Metadata & Interactive Actions (Zero-pill discipline) */}
          <div className="flex items-center justify-between gap-4 pt-1 text-xs text-stone-500 font-sans">
            {/* Left metadata tags */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span>{story.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span>{story.readTime}</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-700 font-medium">{story.topic}</span>
              {story.author.isMember && (
                <>
                  <span aria-hidden="true">·</span>
                  <svg
                    className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0"
                    viewBox="0 0 24 24"
                    aria-label="Member story"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </>
              )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Clap button */}
              <button
                onClick={handleClapClick}
                className="flex items-center gap-1 text-stone-500 hover:text-stone-900 transition-colors p-1 rounded-md hover:bg-stone-100 cursor-pointer"
                title="Clap for this story"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${
                    justClapped ? 'scale-130 text-amber-600 fill-amber-500' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                <span className="font-mono text-[11px] tabular-nums">
                  {story.claps > 999
                    ? `${(story.claps / 1000).toFixed(1)}k`
                    : story.claps}
                </span>
              </button>

              {/* Responses count */}
              <div
                className="hidden sm:flex items-center gap-1 text-stone-500 p-1"
                title={`${story.responsesCount} responses`}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="font-mono text-[11px] tabular-nums">
                  {story.responsesCount}
                </span>
              </div>

              {/* Share button */}
              <button
                onClick={handleShareClick}
                className="text-stone-400 hover:text-stone-700 transition-colors p-1 rounded-md hover:bg-stone-100 cursor-pointer relative"
                title="Share link"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                {copiedLink && (
                  <span className="absolute -top-7 right-0 text-[10px] bg-stone-900 text-white px-2 py-0.5 rounded whitespace-nowrap shadow-xs">
                    Link copied
                  </span>
                )}
              </button>

              {/* Bookmark Toggle */}
              <button
                onClick={handleBookmarkClick}
                className="text-stone-500 hover:text-stone-900 transition-colors p-1 rounded-md hover:bg-stone-100 cursor-pointer"
                title={story.isBookmarked ? 'Remove bookmark' : 'Bookmark story'}
              >
                <svg
                  className={`w-4 h-4 ${
                    story.isBookmarked
                      ? 'fill-stone-900 text-stone-900'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                  viewBox="0 0 24 24"
                  fill={story.isBookmarked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Artwork Thumbnail (4-3 cols) */}
        <div className="col-span-4 sm:col-span-4 lg:col-span-3">
          <EditorialThumbnail
            theme={story.colorTheme}
            title={story.title}
            topic={story.topic}
            aspectRatio="4/3"
            className="w-full"
          />
        </div>
      </div>
    </article>
  );
};
