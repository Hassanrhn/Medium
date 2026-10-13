export interface Author {
  id: string;
  name: string;
  handle: string;
  bio: string;
  avatarBg: string;
  avatarText: string;
  isMember?: boolean;
  isFollowing?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  avatarBg: string;
  avatarText: string;
  date: string;
  content: string;
  likes: number;
}

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  author: Author;
  publication?: string;
  publishedAt: string;
  readTime: string;
  topic: string;
  featured?: boolean;
  trendingRank?: number;
  claps: number;
  responsesCount: number;
  isBookmarked?: boolean;
  colorTheme: 'stone' | 'amber' | 'emerald' | 'indigo' | 'rose' | 'slate' | 'teal';
  content: {
    dropCapLetter: string;
    leadParagraph: string;
    sections: {
      heading?: string;
      paragraphs: string[];
      pullQuote?: string;
      codeSnippet?: string;
    }[];
  };
  comments: Comment[];
}

export type TopicCategory =
  | 'All'
  | 'Technology'
  | 'Design'
  | 'Culture'
  | 'Science'
  | 'Writing'
  | 'Philosophy'
  | 'Saved';
