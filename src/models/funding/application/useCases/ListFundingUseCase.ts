import { FundingRepository } from '../../repository';
import type { ListFundingOutput } from '../dto';

export class ListFundingUseCase {
  public static async execute(): Promise<ListFundingOutput> {
    const fundings = await FundingRepository.getAll();

    return {
      fundings: fundings.map(funding => funding.toJSON()),
    };
  }
}
