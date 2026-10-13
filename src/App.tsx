/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Story, Author, TopicCategory, Comment } from './types';
import { INITIAL_STORIES, INITIAL_AUTHORS } from './data/mockStories';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrendingSection } from './components/TrendingSection';
import { TopicNav } from './components/TopicNav';
import { StoryCard } from './components/StoryCard';
import { Sidebar } from './components/Sidebar';
import { StoryReaderModal } from './components/StoryReaderModal';
import { WriteStoryModal } from './components/WriteStoryModal';
import { MembershipModal } from './components/MembershipModal';

const CATEGORIES: TopicCategory[] = [
  'All',
  'Philosophy',
  'Design',
  'Technology',
  'Culture',
  'Science',
  'Writing',
  'Saved',
];

export default function App() {
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [authors, setAuthors] = useState<Author[]>(INITIAL_AUTHORS);
  const [activeCategory, setActiveCategory] = useState<TopicCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'claps' | 'short'>('latest');

  // Modals & Reader States
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [isMemberActive, setIsMemberActive] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Saved / Bookmarked stories count
  const savedCount = useMemo(() => {
    return stories.filter((s) => s.isBookmarked).length;
  }, [stories]);

  // Handler: Clap for story
  const handleClap = (storyId: string) => {
    setStories((prev) =>
      prev.map((s) => (s.id === storyId ? { ...s, claps: s.claps + 1 } : s))
    );
    if (activeStory && activeStory.id === storyId) {
      setActiveStory((prev) => (prev ? { ...prev, claps: prev.claps + 1 } : null));
    }
  };

  // Handler: Toggle Bookmark
  const handleToggleBookmark = (storyId: string) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id === storyId) {
          const nextState = !s.isBookmarked;
          showToast(nextState ? 'Saved to your Reading List' : 'Removed from Reading List');
          return { ...s, isBookmarked: nextState };
        }
        return s;
      })
    );
    if (activeStory && activeStory.id === storyId) {
      setActiveStory((prev) =>
        prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null
      );
    }
  };

  // Handler: Toggle Follow Author
  const handleToggleFollow = (authorId: string) => {
    setAuthors((prev) =>
      prev.map((a) => {
        if (a.id === authorId) {
          const next = !a.isFollowing;
          showToast(next ? `Following ${a.name}` : `Unfollowed ${a.name}`);
          return { ...a, isFollowing: next };
        }
        return a;
      })
    );

    // Also update author state across stories
    setStories((prev) =>
      prev.map((s) => {
        if (s.author.id === authorId) {
          return {
            ...s,
            author: { ...s.author, isFollowing: !s.author.isFollowing },
          };
        }
        return s;
      })
    );

    if (activeStory && activeStory.author.id === authorId) {
      setActiveStory((prev) =>
        prev
          ? {
              ...prev,
              author: { ...prev.author, isFollowing: !prev.author.isFollowing },
            }
          : null
      );
    }
  };

  // Handler: Add new comment
  const handleAddComment = (
    storyId: string,
    commentData: Omit<Comment, 'id' | 'date' | 'likes'>
  ) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      date: 'Just now',
      likes: 0,
      ...commentData,
    };

    setStories((prev) =>
      prev.map((s) => {
        if (s.id === storyId) {
          return {
            ...s,
            comments: [newComment, ...s.comments],
            responsesCount: s.responsesCount + 1,
          };
        }
        return s;
      })
    );

    if (activeStory && activeStory.id === storyId) {
      setActiveStory((prev) =>
        prev
          ? {
              ...prev,
              comments: [newComment, ...prev.comments],
              responsesCount: prev.responsesCount + 1,
            }
          : null
      );
    }
    showToast('Response published');
  };

  // Handler: Publish new story
  const handlePublishStory = (
    newStoryData: Omit<Story, 'id' | 'claps' | 'responsesCount' | 'comments'>
  ) => {
    const newStory: Story = {
      id: `story-${Date.now()}`,
      claps: 0,
      responsesCount: 0,
      comments: [],
      ...newStoryData,
    };

    setStories((prev) => [newStory, ...prev]);
    showToast('Your story has been published to the feed!');
    // Open reader view directly
    setActiveStory(newStory);
  };

  // Filtered stories logic
  const filteredStories = useMemo(() => {
    return stories
      .filter((story) => {
        // Category filter
        if (activeCategory === 'Saved') {
          if (!story.isBookmarked) return false;
        } else if (activeCategory !== 'All') {
          if (story.topic.toLowerCase() !== activeCategory.toLowerCase()) {
            return false;
          }
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = story.title.toLowerCase().includes(q);
          const matchesSubtitle = story.subtitle.toLowerCase().includes(q);
          const matchesAuthor = story.author.name.toLowerCase().includes(q);
          const matchesTopic = story.topic.toLowerCase().includes(q);
          if (!matchesTitle && !matchesSubtitle && !matchesAuthor && !matchesTopic) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'claps') {
          return b.claps - a.claps;
        }
        if (sortBy === 'short') {
          const aMin = parseInt(a.readTime, 10) || 5;
          const bMin = parseInt(b.readTime, 10) || 5;
          return aMin - bMin;
        }
        return 0; // Default latest preservation
      });
  }, [stories, activeCategory, searchQuery, sortBy]);

  const scrollToStories = () => {
    const el = document.getElementById('stories-feed-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-[#ffc017] selection:text-stone-950">
      {/* Top Header (Zone 1 - 2 - 3 strict contract) */}
      <Header
        onOpenWriteModal={() => setIsWriteModalOpen(true)}
        onOpenMembershipModal={() => setIsMembershipModalOpen(true)}
        onSelectTopic={setActiveCategory}
        onScrollToStories={scrollToStories}
        savedCount={savedCount}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* Iconic Medium Hero Banner */}
        <Hero
          onStartReading={scrollToStories}
          onOpenWriteModal={() => setIsWriteModalOpen(true)}
        />

        {/* Trending on Medium Section (01 - 06 Grid) */}
        <TrendingSection
          stories={stories}
          onSelectStory={(story) => setActiveStory(story)}
        />

        {/* Feed & Discovery 2-Column Section */}
        <section
          id="stories-feed-section"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {/* Topic Navigation & Search Bar */}
          <TopicNav
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* 2-Column Responsive Reading Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
            {/* Left Column: Story Feed (8 cols on desktop) */}
            <div className="lg:col-span-8">
              {filteredStories.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-base font-serif font-bold text-stone-800">
                    {activeCategory === 'Saved'
                      ? 'No saved stories in your reading list'
                      : 'No stories found matching your filter'}
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    {activeCategory === 'Saved'
                      ? 'Click the bookmark icon on any story to save it for offline reading and quiet reflection.'
                      : 'Try broadening your search keywords or switching to another topic category.'}
                  </p>
                  {activeCategory !== 'All' && (
                    <button
                      onClick={() => {
                        setActiveCategory('All');
                        setSearchQuery('');
                      }}
                      className="text-xs text-stone-900 font-semibold underline underline-offset-4 cursor-pointer pt-2"
                    >
                      View all stories
                    </button>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {filteredStories.map((story) => (
                    <StoryCard
                      key={story.id}
                      story={story}
                      onSelectStory={(s) => setActiveStory(s)}
                      onToggleBookmark={handleToggleBookmark}
                      onClap={handleClap}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Sticky Discovery Rail (4 cols on desktop) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28">
                <Sidebar
                  staffPicks={stories.filter((s) => s.featured || s.claps > 2000)}
                  authors={authors}
                  onSelectStory={(s) => setActiveStory(s)}
                  onSelectTopic={(topic) => {
                    setActiveCategory(topic);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  onToggleFollow={handleToggleFollow}
                  onOpenMembershipModal={() => setIsMembershipModalOpen(true)}
                  activeTopic={activeCategory}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Reader Modal (Distraction-free Reading Experience) */}
      <StoryReaderModal
        story={activeStory}
        onClose={() => setActiveStory(null)}
        onClap={handleClap}
        onToggleBookmark={handleToggleBookmark}
        onToggleFollow={handleToggleFollow}
        onAddComment={handleAddComment}
      />

      {/* Story Creator Modal ("Write on Medium") */}
      <WriteStoryModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onPublishStory={handlePublishStory}
      />

      {/* Membership & Subscription Modal */}
      <MembershipModal
        isOpen={isMembershipModalOpen}
        onClose={() => setIsMembershipModalOpen(false)}
        onActivateMembership={() => {
          setIsMemberActive(true);
          showToast('Medium Membership activated!');
        }}
        isMemberActive={isMemberActive}
      />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-150 flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
