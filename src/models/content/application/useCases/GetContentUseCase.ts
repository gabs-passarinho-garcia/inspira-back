import { ContentRepository } from '../../repository';
import type { GetContentInput, ContentOutput } from '../dto';

export class GetContentUseCase {
  public static async execute(data: GetContentInput): Promise<ContentOutput | null> {
    const content = await ContentRepository.getById({ id: data.id });

    if (!content) {
      return null;
    }

    return {
      content,
    };
  }
}
