import React from 'react';
import { Story, Author, TopicCategory } from '../types';

interface SidebarProps {
  staffPicks: Story[];
  authors: Author[];
  onSelectStory: (story: Story) => void;
  onSelectTopic: (topic: TopicCategory) => void;
  onToggleFollow: (authorId: string) => void;
  onOpenMembershipModal: () => void;
  activeTopic: TopicCategory;
}

const TOPIC_SUGGESTIONS: TopicCategory[] = [
  'Philosophy',
  'Technology',
  'Design',
  'Culture',
  'Science',
  'Writing',
];

export const Sidebar: React.FC<SidebarProps> = ({
  staffPicks,
  authors,
  onSelectStory,
  onSelectTopic,
  onToggleFollow,
  onOpenMembershipModal,
  activeTopic,
}) => {
  return (
    <aside className="space-y-10 lg:pl-8 lg:border-l lg:border-stone-200/80">
      {/* Staff Picks Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold tracking-wider uppercase font-sans text-stone-900">
          Staff Picks
        </h3>
        <div className="space-y-5">
          {staffPicks.slice(0, 3).map((story) => (
            <div
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="group cursor-pointer space-y-1.5"
            >
              {/* Author header */}
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <span
                  className={`w-4 h-4 rounded-full ${story.author.avatarBg} text-[9px] font-bold flex items-center justify-center shrink-0`}
                >
                  {story.author.avatarText}
                </span>
                <span className="font-semibold text-stone-800 truncate">
                  {story.author.name}
                </span>
              </div>

              {/* Story Title */}
              <h4 className="text-sm font-serif font-bold text-stone-900 leading-snug group-hover:text-stone-600 transition-colors line-clamp-2">
                {story.title}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Topics (Interactive functional filter controls) */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold tracking-wider uppercase font-sans text-stone-900">
          Recommended Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {TOPIC_SUGGESTIONS.map((topic) => {
            const isSelected = activeTopic === topic;
            return (
              <button
                key={topic}
                onClick={() => onSelectTopic(topic)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>

      {/* Who to Follow */}
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-bold tracking-wider uppercase font-sans text-stone-900">
          Who to follow
        </h3>
        <div className="space-y-4">
          {authors.slice(0, 3).map((author) => (
            <div key={author.id} className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5 min-w-0">
                <span
                  className={`w-8 h-8 rounded-full ${author.avatarBg} text-xs font-bold flex items-center justify-center shrink-0 mt-0.5`}
                >
                  {author.avatarText}
                </span>
                <div className="min-w-0">
                  <div className="font-semibold text-xs text-stone-900 truncate">
                    {author.name}
                  </div>
                  <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed font-sans">
                    {author.bio}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onToggleFollow(author.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  author.isFollowing
                    ? 'border border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900 bg-white'
                    : 'border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white bg-transparent'
                }`}
              >
                {author.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Membership Promotional Card */}
      <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
          Writing on Medium
        </h4>
        <p className="text-xs text-stone-600 leading-relaxed font-sans">
          Expertise from industry leaders, cultural thinkers, and independent writers. No noise, just insight.
        </p>
        <button
          onClick={onOpenMembershipModal}
          className="text-xs font-semibold text-stone-900 hover:text-stone-700 underline underline-offset-4 cursor-pointer"
        >
          Explore membership benefits →
        </button>
      </div>

      {/* Quiet Editorial Footer */}
      <footer className="pt-4 border-t border-stone-200 text-[11px] text-stone-400 space-y-2 font-sans">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a href="#help" onClick={(e) => e.preventDefault()} className="hover:text-stone-600 transition-colors">Help</a>
          <a href="#status" onClick={(e) => e.preventDefault()} className="hover:text-stone-600 transition-colors">Status</a>
          <a href="#about" onClick={(e) => e.preventDefault()} className="hover:text-stone-600 transition-colors">About</a>
          <a href="#careers" onClick={(e) => e.preventDefault()} className="hover:text-stone-600 transition-colors">Careers</a>
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-stone-600 transition-colors">Privacy</a>
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-stone-600 transition-colors">Terms</a>
        </div>
        <p>© 2026 Medium Daily Digest. Curated for mindful reading.</p>
      </footer>
    </aside>
  );
};
