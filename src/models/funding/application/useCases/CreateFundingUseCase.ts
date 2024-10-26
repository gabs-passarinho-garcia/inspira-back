import { FundingRepository } from '../../repository';
import type { CreateFundingInput, FundingOutput } from '../dto';
import { Funding } from '../../domain';

export class CreateFundingUseCase {
  public static async execute(data: CreateFundingInput): Promise<FundingOutput> {
    const funding = Funding.create({
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      goal: data.goal,
      deadline: data.deadline,
      authorId: data.authorId,
      status: data.status,
      type: data.type,
      contentId: data.contentId,
      current: 0,
      entries: [],
    });

    await FundingRepository.create({ funding });

    return {
      funding: funding.toJSON(),
    };
  }
}
