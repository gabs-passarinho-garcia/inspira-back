import { ContentCategory, ContentCategoryEnum, ContentStatus } from '@/shared/enum';
import z from 'zod';

export const ContentOutputSchema = z
  .object({
    content: z.object({
      id: z.string().uuid().openapi({ description: 'Unique identifier for the content' }),
      title: z.string().openapi({ description: 'Title of the content' }),
      place: z.string().openapi({ description: 'Place associated with the content' }),
      description: z.string().openapi({ description: 'Description of the content' }),
      authorId: z
        .string()
        .uuid()
        .openapi({ description: 'Unique identifier of the content author' }),
      category: z
        .nativeEnum(ContentCategoryEnum)
        .openapi({ description: 'Category of the content' }),
      status: z.nativeEnum(ContentStatus).openapi({ description: 'Status of the content' }),
      fundingId: z
        .string()
        .uuid()
        .optional()
        .openapi({ description: 'Unique identifier of funding, if applicable' }),
    }),
  })
  .openapi({ title: 'ContentOutput', description: 'Response schema for content information' });

export type ContentOutput = z.infer<typeof ContentOutputSchema>;

export const ListContentOutputSchema = z
  .object({
    contents: z.array(ContentOutputSchema.shape.content).openapi({
      description: 'List of content items',
      title: 'ListContentOutput',
    }),
  })
  .openapi({
    title: 'ListContentOutput',
    description: 'Response schema for listing content items',
  });

export type ListContentOutput = z.infer<typeof ListContentOutputSchema>;

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
  title?: string;
  place?: string;
  description?: string;
  status?: ContentStatus;
  category?: ContentCategory;
}
