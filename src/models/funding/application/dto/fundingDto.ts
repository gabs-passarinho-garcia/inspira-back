import { FundingStatus, FundingType } from '@/shared/enum';
import { FundingEntryType } from '../../domain';

export interface FundingOutput {
  funding: {
    id: string;
    title: string;
    description: string;
    goal: number;
    current: number;
    deadline: string;
    authorId: string;
    status: FundingStatus;
    type: FundingType;
    contentId: string;
    entries: FundingEntryType[];
  };
}

export interface ListFundingOutput {
  fundings: FundingOutput['funding'][];
}

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
