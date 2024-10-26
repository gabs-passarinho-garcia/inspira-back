import { UserRepository } from "../../repository";
import type { UpdateUserInput,UserOutput } from "../dto";



export class UpdateUserUseCase {
  public static async execute(data: UpdateUserInput): Promise<UserOutput | null> {
    const user = await UserRepository.getById({ id: data.id });

    if (!user) {
      return null;
    }

    user.name =data.name;
    dateOfBirth: data.dateOfBirth;
    phoneNumber: data.documentNumber;
    documentNumber: data.documentNumber;
    email: data.email;
    address: data.address;
    cityState: data.cityState;
    country: data.country;
    createdAt: new Date();
    updatedAt: new Date();
    createdBy: "API";
    updatedBy: "API";
    role: data.role;


    await UserRepository.update({ user });

    return {
      user,
    };
  }
}