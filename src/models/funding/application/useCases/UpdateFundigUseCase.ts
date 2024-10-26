import { parseISO } from 'date-fns';
import { FundingRepository } from '../../repository';
import type { FundingOutput, UpdateFundingInput } from '../dto';

export class UpdateFundingUseCase {
  public static async execute(data: UpdateFundingInput): Promise<FundingOutput | null> {
    const funding = await FundingRepository.getById({ id: data.id });

    if (!funding) {
      return null;
    }

    funding.title = data.title;
    funding.description = data.description;
    funding.goal = data.goal;
    funding.deadline = parseISO(data.deadline);
    funding.status = data.status;
    funding.type = data.type;

    await FundingRepository.update({ funding });

    return {
      funding: funding.toJSON(),
    };
  }
}
