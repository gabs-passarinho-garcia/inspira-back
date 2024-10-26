import { ContentRepository } from '../../repository';
import { ListContentOutput } from '../dto';

export class ListContentUseCase {
  public static async execute(): Promise<ListContentOutput> {
    const contents = await ContentRepository.getAll();

    return {
      contents,
    };
  }
}
