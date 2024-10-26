import { UserRepository } from '../../repository';
import { User } from '../../domain';
import type { CreateUserInput, UserOutput } from '../dto';
import { Prisma } from '@prisma/client';

export class CreateUserUseCase {
  public static async execute(
    data: CreateUserInput,
    options?: {
      tx?: Prisma.TransactionClient;
    },
  ): Promise<UserOutput> {
    const user = User.create({
      id: crypto.randomUUID(),
      name: data.name,
      dateOfBirth: data.dateOfBirth,
      phoneNumber: data.phoneNumber,
      documentNumber: data.documentNumber,
      email: data.email,
      address: data.address,
      cityState: data.cityState,
      country: data.country,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'API',
      updatedBy: 'API',
      role: data.role,
    });

    await UserRepository.create({ user }, options);

    return {
      user,
    };
  }
}
