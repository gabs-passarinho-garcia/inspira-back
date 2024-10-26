import { ContentCategory, ContentStatus } from '@/shared/enum';

export interface ContentOutput {
  content: {
    id: string;
    title: string;
    place: string;
    description: string;
    authorId: string;
    category: ContentCategory;
    status: ContentStatus;
    funding?: unknown;
  };
}

export interface ListContentOutput {
  contents: ContentOutput['content'][];
}

export interface GetContentInput {
  id: string;
}

export interface CreateContentInput {
  title: string;
  place: string;
  description: string;
  authorId: string;
  category: ContentCategory;
  status: ContentStatus;
}

export interface UpdateContentInput {
  id: string;
  title: string;
  place: string;
  description: string;
  status: ContentStatus;
  category: ContentCategory;
}
