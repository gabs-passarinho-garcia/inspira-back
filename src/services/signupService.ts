import { SignupInput } from './dto';
import { ContentOutput, CreateContentUseCase, UpdateContentUseCase } from '@/models/content';
import { UserOutput, CreateUserUseCase } from '@/models/user';
import { FundingOutput, CreateFundingUseCase } from '@/models/funding';
import { PrismaHandler } from '@/shared/providers/prisma/PrismaHandler';
import { ContentStatus } from '@prisma/client';
import { FundingStatusEnum } from '@/shared/enum';

export class SignupService {
  public static async execute(data: SignupInput): Promise<{
    user: UserOutput;
    content: ContentOutput;
    funding: FundingOutput;
    approved: boolean;
  }> {
    return await PrismaHandler.client.$transaction(async tx => {
      const user = await CreateUserUseCase.execute({ ...data.user }, { tx });

      if (!user) {
        throw new Error('Error creating user');
      }

      const content = await CreateContentUseCase.execute(
        {
          ...data.content,
          status: ContentStatus.WAITING_IA_APPROVAL,
          authorId: user.user.id,
        },
        { tx },
      );

      if (!content) {
        throw new Error('Error creating content');
      }

      const funding = await CreateFundingUseCase.execute(
        {
          title: data.funding.title,
          description: data.funding.description,
          goal: data.funding.goal,
          deadline: data.funding.deadline,
          authorId: user.user.id,
          status: FundingStatusEnum.PENDING,
          type: data.funding.type,
          contentId: content.content.id,
        },
        { tx },
      );

      if (!funding) {
        throw new Error('Error creating funding');
      }

      await UpdateContentUseCase.execute(
        {
          id: content.content.id,
          status: ContentStatus.WAITING_CURATOR_APPROVAL,
        },
        { tx },
      );

      return {
        user,
        content,
        funding,
        approved: true,
      };
    });
  }
}
