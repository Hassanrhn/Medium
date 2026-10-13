import React, { useState, useEffect, useRef } from 'react';
import { Story, Comment } from '../types';
import { EditorialThumbnail } from './EditorialThumbnail';

interface StoryReaderModalProps {
  story: Story | null;
  onClose: () => void;
  onClap: (storyId: string) => void;
  onToggleBookmark: (storyId: string) => void;
  onToggleFollow: (authorId: string) => void;
  onAddComment: (storyId: string, comment: Omit<Comment, 'id' | 'date' | 'likes'>) => void;
}

export const StoryReaderModal: React.FC<StoryReaderModalProps> = ({
  story,
  onClose,
  onClap,
  onToggleBookmark,
  onToggleFollow,
  onAddComment,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [userClaps, setUserClaps] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Track scroll depth inside modal
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  // Simulate audio narration
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1.2;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  if (!story) return null;

  const handleClap = () => {
    onClap(story.id);
    setUserClaps((prev) => Math.min(50, prev + 1));
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const authorName = newCommentName.trim() || 'Thoughtful Reader';
    const initials = authorName
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    onAddComment(story.id, {
      author: authorName,
      avatarBg: 'bg-stone-700 text-stone-100',
      avatarText: initials || 'TR',
      content: newCommentText.trim(),
    });

    setNewCommentText('');
    setNewCommentName('');
  };

  const fontClass = fontFamily === 'serif' ? 'font-serif' : 'font-sans';
  const sizeClass =
    fontSize === 'normal'
      ? 'text-lg sm:text-[19px] leading-[1.8]'
      : fontSize === 'large'
      ? 'text-xl sm:text-[21px] leading-[1.85]'
      : 'text-2xl sm:text-[23px] leading-[1.9]';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-center animate-in fade-in duration-200">
      {/* Top Reading Progress Line */}
      <div
        className="fixed top-0 left-0 h-1 bg-stone-900 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Main Reading Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full max-w-4xl bg-white h-full overflow-y-auto shadow-2xl relative"
      >
        {/* Sticky Utility Header */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 -ml-1 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              aria-label="Back to feed"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
              {story.topic}
            </span>
          </div>

          {/* Reading Controls */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium text-stone-600">
            {/* Audio Listen Feature */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                isPlayingAudio ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
              title="Listen to story audio narration"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                {isPlayingAudio ? (
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
              </svg>
              <span className="hidden sm:inline">{isPlayingAudio ? 'Playing' : 'Listen'}</span>
              {isPlayingAudio && (
                <span className="font-mono text-[10px] tabular-nums">{Math.round(audioProgress)}%</span>
              )}
            </button>

            {/* Font Family Switcher */}
            <button
              onClick={() => setFontFamily(fontFamily === 'serif' ? 'sans' : 'serif')}
              className="px-2.5 py-1 text-xs border border-stone-200 hover:border-stone-400 rounded-md transition-colors cursor-pointer"
              title="Toggle Serif / Sans Font"
            >
              {fontFamily === 'serif' ? 'Serif' : 'Sans'}
            </button>

            {/* Font Size Adjuster */}
            <div className="flex items-center border border-stone-200 rounded-md overflow-hidden">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 text-[11px] ${
                  fontSize === 'normal' ? 'bg-stone-900 text-white' : 'hover:bg-stone-100'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 text-xs font-semibold ${
                  fontSize === 'large' ? 'bg-stone-900 text-white' : 'hover:bg-stone-100'
                }`}
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(story.id)}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              title={story.isBookmarked ? 'Saved to reading list' : 'Save to reading list'}
            >
              <svg
                className={`w-4 h-4 ${story.isBookmarked ? 'fill-stone-900 text-stone-900' : 'text-stone-500'}`}
                viewBox="0 0 24 24"
                fill={story.isBookmarked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>

            {/* Close Cross */}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close reader"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Story Prose Canvas (Strict max-w-2xl 65-75ch measure) */}
        <article className="max-w-2xl mx-auto px-6 sm:px-8 py-10 sm:py-14 space-y-8">
          {/* Story Title & Subtitle */}
          <header className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-950 leading-[1.18] tracking-tight text-balance">
              {story.title}
            </h1>
            <p className="text-lg sm:text-xl text-stone-600 font-sans leading-relaxed">
              {story.subtitle}
            </p>
          </header>

          {/* Author Byline Bar */}
          <div className="flex items-center justify-between py-4 border-y border-stone-200">
            <div className="flex items-center gap-3">
              <span
                className={`w-11 h-11 rounded-full ${story.author.avatarBg} text-sm font-bold flex items-center justify-center shrink-0`}
              >
                {story.author.avatarText}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-900 text-sm">
                    {story.author.name}
                  </span>
                  <button
                    onClick={() => onToggleFollow(story.author.id)}
                    className="text-xs text-stone-600 hover:text-stone-950 font-medium cursor-pointer underline underline-offset-2"
                  >
                    {story.author.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
                  {story.publication && (
                    <>
                      <span>in {story.publication}</span>
                      <span aria-hidden="true">·</span>
                    </>
                  )}
                  <span>{story.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{story.publishedAt}</span>
                </div>
              </div>
            </div>

            {/* Quick Clap in Header */}
            <button
              onClick={handleClap}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 fill-stone-700" viewBox="0 0 24 24">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <span className="font-mono tabular-nums font-semibold">
                {story.claps + userClaps}
              </span>
            </button>
          </div>

          {/* Lead Editorial Illustration */}
          <div className="my-6">
            <EditorialThumbnail
              theme={story.colorTheme}
              title={story.title}
              topic={story.topic}
              aspectRatio="16/9"
              className="w-full shadow-xs"
            />
            <p className="text-xs font-serif text-stone-500 italic mt-2.5 text-center">
              Plate I. An exploration of stillness, human perception, and intellectual cadence.
            </p>
          </div>

          {/* Editorial Long-form Body with Drop Cap */}
          <div className={`space-y-6 ${fontClass} ${sizeClass} text-stone-850`}>
            {/* Opening paragraph with elegant drop cap */}
            <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:leading-none text-stone-900">
              <span className="font-bold">{story.content.dropCapLetter}</span>
              {story.content.leadParagraph}
            </p>

            {/* Formatted Story Sections */}
            {story.content.sections.map((section, idx) => (
              <div key={idx} className="space-y-5 pt-4">
                {section.heading && (
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 pt-3 pb-1 tracking-tight">
                    {section.heading}
                  </h3>
                )}

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}

                {section.pullQuote && (
                  <blockquote className="my-8 py-6 border-y border-stone-200 text-center px-4">
                    <p className="text-xl sm:text-2xl font-serif italic text-stone-900 leading-relaxed">
                      "{section.pullQuote}"
                    </p>
                  </blockquote>
                )}
              </div>
            ))}
          </div>

          {/* Author Footer Bio */}
          <div className="pt-10 border-t border-stone-200 space-y-3">
            <div className="flex items-start gap-4">
              <span
                className={`w-12 h-12 rounded-full ${story.author.avatarBg} text-base font-bold flex items-center justify-center shrink-0 mt-1`}
              >
                {story.author.avatarText}
              </span>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-stone-900 text-base">
                    Written by {story.author.name}
                  </h4>
                  <button
                    onClick={() => onToggleFollow(story.author.id)}
                    className="text-xs px-3 py-1 rounded-full border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-colors cursor-pointer"
                  >
                    {story.author.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {story.author.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Clapping & Comments Interaction Bar */}
          <div className="flex items-center justify-between py-6 border-y border-stone-200">
            {/* Multi-clap button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleClap}
                className="flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-full transition-transform active:scale-95 cursor-pointer shadow-xs"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                <span className="font-mono text-sm tabular-nums font-bold">
                  {story.claps + userClaps}
                </span>
              </button>
              {userClaps > 0 && (
                <span className="text-xs text-amber-600 font-sans font-medium">
                  +{userClaps} from you
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Toggle Responses */}
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{story.comments.length} Responses</span>
              </button>

              {/* Share */}
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer relative"
                title="Share story"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                {copiedLink && (
                  <span className="absolute -top-7 right-0 text-[10px] bg-stone-900 text-white px-2 py-0.5 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Reader Responses Section */}
          <div className="pt-6 space-y-6">
            <h4 className="text-lg font-bold font-serif text-stone-900">
              Responses ({story.comments.length})
            </h4>

            {/* Post a Response Form */}
            <form onSubmit={handleSubmitComment} className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-3">
              <input
                type="text"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full text-xs px-3 py-1.5 bg-white border border-stone-200 rounded-md focus:border-stone-400 focus:outline-hidden"
              />
              <textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="What are your thoughts?"
                rows={3}
                required
                className="w-full text-xs px-3 py-2 bg-white border border-stone-200 rounded-md focus:border-stone-400 focus:outline-hidden resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-50 rounded-full transition-colors cursor-pointer"
                >
                  Respond
                </button>
              </div>
            </form>

            {/* Existing Comments List */}
            <div className="space-y-4">
              {story.comments.length === 0 ? (
                <p className="text-xs text-stone-500 italic py-2">
                  There are no responses yet. Be the first to share your thoughts.
                </p>
              ) : (
                story.comments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-lg border border-stone-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-full ${comment.avatarBg} text-[10px] font-bold flex items-center justify-center`}
                        >
                          {comment.avatarText}
                        </span>
                        <span className="text-xs font-semibold text-stone-900">
                          {comment.author}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-400 font-sans">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed font-sans">
                      {comment.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
