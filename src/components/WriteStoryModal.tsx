import React, { useState } from 'react';
import { Story, TopicCategory } from '../types';

interface WriteStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishStory: (newStory: Omit<Story, 'id' | 'claps' | 'responsesCount' | 'comments'>) => void;
}

const TOPICS: Exclude<TopicCategory, 'All' | 'Saved'>[] = [
  'Philosophy',
  'Technology',
  'Design',
  'Culture',
  'Science',
  'Writing',
];

const THEMES: ('stone' | 'amber' | 'emerald' | 'indigo' | 'rose' | 'teal')[] = [
  'stone',
  'amber',
  'emerald',
  'indigo',
  'rose',
  'teal',
];

export const WriteStoryModal: React.FC<WriteStoryModalProps> = ({
  isOpen,
  onClose,
  onPublishStory,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [topic, setTopic] = useState<Exclude<TopicCategory, 'All' | 'Saved'>>('Philosophy');
  const [body, setBody] = useState('');
  const [colorTheme, setColorTheme] = useState<'stone' | 'amber' | 'emerald' | 'indigo' | 'rose' | 'teal'>('stone');

  if (!isOpen) return null;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const author = authorName.trim() || 'Independent Writer';
    const initials = author
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    // Split body into paragraphs
    const paragraphs = body
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const firstPara = paragraphs[0] || '';
    const dropCap = firstPara.charAt(0) || 'T';
    const remainingFirstPara = firstPara.slice(1);
    const restParagraphs = paragraphs.slice(1);

    // Calculate approximate read time
    const wordCount = (title + ' ' + subtitle + ' ' + body).split(/\s+/).length;
    const minutes = Math.max(1, Math.round(wordCount / 200));

    onPublishStory({
      title: title.trim(),
      subtitle: subtitle.trim() || 'An independent inquiry on modern culture and understanding.',
      author: {
        id: `author-${Date.now()}`,
        name: author,
        handle: `@${author.toLowerCase().replace(/\s+/g, '')}`,
        bio: 'Independent contributor writing on craft and discovery.',
        avatarBg: 'bg-stone-850 text-white',
        avatarText: initials || 'IW',
        isMember: true,
      },
      publishedAt: 'Just now',
      readTime: `${minutes} min read`,
      topic,
      colorTheme,
      content: {
        dropCapLetter: dropCap,
        leadParagraph: remainingFirstPara,
        sections: [
          {
            paragraphs: restParagraphs.length > 0 ? restParagraphs : [firstPara],
          },
        ],
      },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-lg text-stone-900">
              Draft in Storyteller
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              disabled={!title.trim() || !body.trim()}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 rounded-full transition-colors cursor-pointer"
            >
              Publish story
            </button>
          </div>
        </div>

        {/* Minimalist Writing Surface */}
        <form onSubmit={handlePublish} className="p-6 sm:p-10 space-y-6">
          {/* Metadata selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-stone-100 text-xs">
            <div>
              <label className="block text-stone-500 font-medium mb-1">
                Author byline
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-md focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-stone-500 font-medium mb-1">
                Topic Category
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value as any)}
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-md focus:bg-white focus:outline-hidden cursor-pointer"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-stone-500 font-medium mb-1">
                Visual Art Tone
              </label>
              <select
                value={colorTheme}
                onChange={(e) => setColorTheme(e.target.value as any)}
                className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-md focus:bg-white focus:outline-hidden cursor-pointer capitalize"
              >
                {THEMES.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-3xl sm:text-4xl font-serif font-bold text-stone-900 placeholder:text-stone-300 focus:outline-hidden border-none p-0 tracking-tight"
          />

          {/* Subtitle Input */}
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Write a clear, compelling subtitle..."
            className="w-full text-lg sm:text-xl font-sans text-stone-600 placeholder:text-stone-300 focus:outline-hidden border-none p-0"
          />

          {/* Story Body */}
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Tell your story... Separate paragraphs with an empty line. Give ideas room to breathe."
            rows={10}
            className="w-full text-base sm:text-lg font-serif text-stone-850 placeholder:text-stone-300 focus:outline-hidden border-none p-0 resize-y leading-relaxed"
          />

          <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs text-stone-400">
            <span>Prose length: {body.split(/\s+/).filter(Boolean).length} words</span>
            <span>Distraction-free markdown supported</span>
          </div>
        </form>
      </div>
    </div>
  );
};
