import { ContentRepository } from '../../repository';
import type { UpdateContentInput, ContentOutput } from '../dto';

export class UpdateContentUseCase {
  public static async execute(data: UpdateContentInput): Promise<ContentOutput | null> {
    const content = await ContentRepository.getById({ id: data.id });

    if (!content) {
      return null;
    }

    content.title = data.title;
    content.place = data.place;
    content.description = data.description;
    content.category = data.category;
    content.status = data.status;

    await ContentRepository.update({ content });

    return {
      content,
    };
  }
}
