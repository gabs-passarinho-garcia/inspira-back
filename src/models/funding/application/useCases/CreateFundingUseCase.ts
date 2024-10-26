import { FundingRepository } from '../../repository';
import type { CreateFundingInput, FundingOutput } from '../dto';
import { Funding } from '../../domain';
import { Prisma } from '@prisma/client';

export class CreateFundingUseCase {
  public static async execute(
    data: CreateFundingInput,
    options?: {
      tx?: Prisma.TransactionClient;
    },
  ): Promise<FundingOutput> {
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

    await FundingRepository.create({ funding }, options);

    return {
      funding: funding.toJSON(),
    };
  }
}
