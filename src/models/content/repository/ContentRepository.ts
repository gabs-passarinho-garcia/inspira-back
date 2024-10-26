import { PrismaHandler } from '@/shared/providers/prisma/PrismaHandler';
import { Content } from '../domain';
import { Prisma } from '@prisma/client';

export class ContentRepository {
  public static async getById(data: { id: string }): Promise<Content | null> {
    const content = await PrismaHandler.client.content.findUnique({
      where: {
        id: data.id,
      },
      include: {
        Funding: true,
      },
    });

    if (!content) {
      return null;
    }

    return Content.create({
      id: content.id,
      title: content.title,
      place: content.place,
      description: content.description,
      authorId: content.authorId,
      category: content.category,
      status: content.status,
      fundingId: content.Funding?.id,
    });
  }

  public static async getAll(): Promise<Content[]> {
    const contents = await PrismaHandler.client.content.findMany({
      include: {
        Funding: true,
      },
    });

    return contents.map(content =>
      Content.create({
        id: content.id,
        title: content.title,
        place: content.place,
        description: content.description,
        authorId: content.authorId,
        category: content.category,
        status: content.status,
        fundingId: content.Funding?.id,
      }),
    );
  }

  public static async create(
    data: { content: Content },
    options?: {
      tx?: Prisma.TransactionClient;
    },
  ): Promise<void> {
    const tx = options?.tx ?? PrismaHandler.client;
    await tx.content.create({
      data: {
        id: data.content.id,
        title: data.content.title,
        place: data.content.place,
        description: data.content.description,
        author: {
          connect: {
            id: data.content.authorId,
          },
        },
        category: data.content.category,
        status: data.content.status,
        createdBy: 'API',
      },
    });
  }

  public static async update(
    data: { content: Content },
    options?: {
      tx?: Prisma.TransactionClient;
    },
  ): Promise<void> {
    const tx = options?.tx ?? PrismaHandler.client;

    await tx.content.update({
      where: {
        id: data.content.id,
      },
      data: {
        title: data.content.title,
        place: data.content.place,
        description: data.content.description,
        category: data.content.category,
        status: data.content.status,
        updatedBy: 'API',
      },
    });
  }
}
