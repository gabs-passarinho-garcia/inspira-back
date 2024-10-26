import { ContentCategory } from '@/shared/enum';

export interface ContentOutput {
  content: {
    id: string;
    title: string;
    place: string;
    description: string;
    authorId: string;
    category: string;
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
}

export interface UpdateContentInput {
  id: string;
  title: string;
  place: string;
  description: string;
  category: ContentCategory;
}
