import { FundingRepository } from '../../repository';
import type { GetFundingInput, FundingOutput } from '../dto';

export class GetFundingUseCase {
  public static async execute(data: GetFundingInput): Promise<FundingOutput | null> {
    const funding = await FundingRepository.getById({ id: data.id });

    if (!funding) {
      return null;
    }

    return {
      funding: funding.toJSON(),
    };
  }
}
