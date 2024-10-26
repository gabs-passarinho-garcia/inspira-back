import { PrismaHandler } from '@/shared/providers/prisma/PrismaHandler';

import { User } from '../domain';
import { Prisma } from '@prisma/client';

export class UserRepository {
  public static async getById(data: { id: string }): Promise<User | null> {
    const user = await PrismaHandler.client.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!user) {
      return null;
    }

    return User.create({
      id: user.id,
      name: user.name,
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      documentNumber: user.documentNumber,
      email: user.email,
      address: user.address,
      cityState: user.cityState,
      country: user.country,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      createdBy: user.createdBy,
      updatedBy: user.updatedBy,
      role: user.role,
    });
  }

  public static async create(
    data: { user: User },
    options?: {
      tx?: Prisma.TransactionClient;
    },
  ): Promise<void> {
    const tx = options?.tx ?? PrismaHandler.client;
    await tx.user.create({
      data: {
        id: data.user.id,
        name: data.user.name,
        dateOfBirth: data.user.dateOfBirth,
        phoneNumber: data.user.phoneNumber,
        documentNumber: data.user.documentNumber,
        email: data.user.email,
        address: data.user.address,
        cityState: data.user.cityState,
        country: data.user.country,
        createdAt: data.user.createdAt,
        createdBy: data.user.createdBy,
        role: data.user.role,
      },
    });
  }

  public static async getAll(): Promise<User[]> {
    const users = await PrismaHandler.client.user.findMany();

    return users.map(user =>
      User.create({
        id: user.id,
        name: user.name,
        dateOfBirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber,
        documentNumber: user.documentNumber,
        email: user.email,
        address: user.address,
        cityState: user.cityState,
        country: user.country,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        createdBy: user.createdBy,
        updatedBy: user.updatedBy,
        role: user.role,
      }),
    );
  }
  public static async update(
    data: { user: User },
    options?: {
      tx?: Prisma.TransactionClient;
    },
  ): Promise<void> {
    const tx = options?.tx ?? PrismaHandler.client;
    await tx.user.update({
      where: {
        id: data.user.id,
      },
      data: {
        name: data.user.name,
        dateOfBirth: data.user.dateOfBirth,
        phoneNumber: data.user.phoneNumber,
        documentNumber: data.user.documentNumber,
        email: data.user.email,
        address: data.user.address,
        cityState: data.user.cityState,
        country: data.user.country,
        updatedAt: data.user.updatedAt,
        updatedBy: data.user.updatedBy,
        role: data.user.role,
      },
    });
  }
}
