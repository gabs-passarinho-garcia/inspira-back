import { Prisma } from '@prisma/client';
import { ContentRepository } from '../../repository';
import type { UpdateContentInput, ContentOutput } from '../dto';

export class UpdateContentUseCase {
  public static async execute(
    data: UpdateContentInput,
    options?: {
      tx?: Prisma.TransactionClient;
    },
  ): Promise<ContentOutput | null> {
    const content = await ContentRepository.getById({ id: data.id });

    if (!content) {
      return null;
    }

    content.title = data.title ?? content.title;
    content.place = data.place ?? content.place;
    content.description = data.description ?? content.description;
    content.category = data.category ?? content.category;
    content.status = data.status ?? content.status;

    await ContentRepository.update({ content }, options);

    return {
      content,
    };
  }
}
