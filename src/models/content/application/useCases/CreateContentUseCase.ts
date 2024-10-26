import { ContentRepository } from '../../repository';
import { Content } from '../../domain';
import type { CreateContentInput, ContentOutput } from '../dto';

export class CreateContentUseCase {
  public static async execute(data: CreateContentInput): Promise<ContentOutput> {
    const content = Content.create({
      id: crypto.randomUUID(),
      title: data.title,
      place: data.place,
      description: data.description,
      authorId: data.authorId,
      category: data.category,
      status: data.status,
    });

    await ContentRepository.create({ content });

    return {
      content,
    };
  }
}
