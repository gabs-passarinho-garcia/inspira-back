import { FundingRepository } from '../../repository';
import type { FundingOutput, AddFundingEntryInput } from '../dto';

export class AddFundingEntryUseCase {
  public static async execute(data: AddFundingEntryInput): Promise<FundingOutput | null> {
    const funding = await FundingRepository.getById({ id: data.fundingId });

    if (!funding) {
      return null;
    }

    funding.current += data.amount;
    funding.addFundingEntry({
      id: crypto.randomUUID(),
      amount: data.amount,
      sponsorId: data.sponsorId,
      fundingId: data.fundingId,
      anonymous: data.anonymous,
    });

    funding.updateFundingStatus();

    await FundingRepository.update({ funding });

    return {
      funding: funding.toJSON(),
    };
  }
}
