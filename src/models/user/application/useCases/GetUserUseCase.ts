import { UserRepository } from "../../repository";
import type { GetUnserInput,UserOutput } from "../dto";


export class GetUserUseCase {
  public static async execute(data: GetUnserInput): Promise<UserOutput | null> {
    const user = await UserRepository.getById({ id: data.id });

    if (!user) {
      return null;
    }

    return {
      user,
    };
  }
}