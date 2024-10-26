import { UserRepository } from "../../repository";
import { ListUserOutput } from "../dto";

export class ListUserUseCase {
  public static async execute(): Promise<ListUserOutput> {
    const users = await UserRepository.getAll();
    
    return {
      users,
    };
  }
}
