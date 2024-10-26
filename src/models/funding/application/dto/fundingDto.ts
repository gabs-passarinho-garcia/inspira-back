import { FundingStatus, FundingStatusEnum, FundingType, FundingTypeEnum } from '@/shared/enum';
import z from 'zod';

// FundingEntryType Schema
export const FundingEntryTypeSchema = z
  .object({
    id: z.string().uuid().openapi({ description: 'Unique identifier for the funding entry' }),
    amount: z
      .number()
      .positive()
      .openapi({ description: 'Amount contributed in the funding entry' }),
    sponsorId: z.string().uuid().openapi({ description: 'Unique identifier for the sponsor' }),
    fundingId: z
      .string()
      .uuid()
      .openapi({ description: 'Unique identifier for the associated funding' }),
    anonymous: z.boolean().openapi({ description: 'Indicates if the contribution is anonymous' }),
  })
  .openapi({ title: 'FundingEntryType', description: 'Individual funding entry' });

// FundingOutput Schema
export const FundingOutputSchema = z
  .object({
    funding: z.object({
      id: z.string().uuid().openapi({ description: 'Unique identifier for the funding' }),
      title: z.string().openapi({ description: 'Title of the funding' }),
      description: z.string().openapi({ description: 'Description of the funding' }),
      goal: z.number().positive().openapi({ description: 'Funding goal amount' }),
      current: z
        .number()
        .nonnegative()
        .openapi({ description: 'Current funding amount collected' }),
      deadline: z.string().datetime().openapi({ description: 'Deadline for the funding' }),
      authorId: z.string().uuid().openapi({ description: 'Unique identifier for the author' }),
      status: z.nativeEnum(FundingStatusEnum).openapi({ description: 'Status of the funding' }),
      type: z.nativeEnum(FundingTypeEnum).openapi({ description: 'Type of funding model' }),
      contentId: z
        .string()
        .uuid()
        .openapi({ description: 'Unique identifier of the associated content' }),
      entries: z
        .array(FundingEntryTypeSchema)
        .openapi({ description: 'List of entries for the funding' }),
    }),
  })
  .openapi({ title: 'FundingOutput', description: 'Response schema for funding details' });

// ListFundingOutput Schema
export const ListFundingOutputSchema = z
  .object({
    fundings: z.array(FundingOutputSchema.shape.funding).openapi({
      description: 'List of funding objects',
      title: 'ListFundingOutput',
    }),
  })
  .openapi({ title: 'ListFundingOutput', description: 'Response schema for listing fundings' });

// Exportando os tipos inferidos
export type FundingOutput = z.infer<typeof FundingOutputSchema>;
export type ListFundingOutput = z.infer<typeof ListFundingOutputSchema>;

export interface GetFundingInput {
  id: string;
}

export interface CreateFundingInput {
  title: string;
  description: string;
  goal: number;
  deadline: string;
  authorId: string;
  status: FundingStatus;
  type: FundingType;
  contentId: string;
}

export interface UpdateFundingInput {
  id: string;
  title: string;
  description: string;
  goal: number;
  deadline: string;
  status: FundingStatus;
  type: FundingType;
}

export interface AddFundingEntryInput {
  fundingId: string;
  sponsorId: string;
  amount: number;
  anonymous: boolean;
}
