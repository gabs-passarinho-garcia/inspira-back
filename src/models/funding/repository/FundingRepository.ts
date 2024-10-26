import { PrismaHandler } from '@/shared/providers/prisma/PrismaHandler';
import { Funding } from '../domain';

export class FundingRepository {
  public static async getById(data: { id: string }): Promise<Funding | null> {
    const funding = await PrismaHandler.client.funding.findUnique({
      where: {
        id: data.id,
      },
      include: {
        entries: true,
      },
    });

    if (!funding) {
      return null;
    }

    return Funding.create({
      id: funding.id,
      title: funding.title,
      description: funding.description,
      goal: funding.goal.toNumber(),
      current: funding.current.toNumber(),
      deadline: funding.deadline.toISOString(),
      authorId: funding.authorId,
      status: funding.status,
      type: funding.type,
      contentId: funding.contentId,
      entries: funding.entries.map(entry => ({
        id: entry.id,
        amount: entry.amount.toNumber(),
        sponsorId: entry.sponsorId,
        fundingId: entry.fundingId,
        anonymous: entry.anonymous,
      })),
    });
  }

  public static async getAll(): Promise<Funding[]> {
    const fundings = await PrismaHandler.client.funding.findMany({
      include: {
        entries: true,
      },
    });

    return fundings.map(funding =>
      Funding.create({
        id: funding.id,
        title: funding.title,
        description: funding.description,
        goal: funding.goal.toNumber(),
        current: funding.current.toNumber(),
        deadline: funding.deadline.toISOString(),
        authorId: funding.authorId,
        status: funding.status,
        type: funding.type,
        contentId: funding.contentId,
        entries: funding.entries.map(entry => ({
          id: entry.id,
          amount: entry.amount.toNumber(),
          sponsorId: entry.sponsorId,
          fundingId: entry.fundingId,
          anonymous: entry.anonymous,
        })),
      }),
    );
  }

  public static async create(data: { funding: Funding }): Promise<void> {
    await PrismaHandler.client.funding.create({
      data: {
        id: data.funding.id,
        title: data.funding.title,
        description: data.funding.description,
        goal: data.funding.goal,
        current: data.funding.current,
        deadline: data.funding.deadline,
        author: {
          connect: { id: data.funding.authorId },
        },
        status: data.funding.status,
        type: data.funding.type,
        Content: {
          connect: { id: data.funding.contentId },
        },
        entries: {
          connectOrCreate: data.funding.entries.map(entry => ({
            where: { id: entry.id },
            create: {
              id: entry.id,
              amount: entry.amount,
              sponsor: {
                connect: { id: entry.sponsorId },
              },
              anonymous: entry.anonymous,
              createdBy: 'API',
            },
          })),
        },
        createdBy: 'API',
      },
    });
  }

  public static async update(data: { funding: Funding }): Promise<void> {
    await PrismaHandler.client.funding.update({
      where: {
        id: data.funding.id,
      },
      data: {
        entries: {
          set: [],
        },
      },
    });

    await PrismaHandler.client.funding.update({
      where: {
        id: data.funding.id,
      },
      data: {
        title: data.funding.title,
        description: data.funding.description,
        goal: data.funding.goal,
        current: data.funding.current,
        deadline: data.funding.deadline,
        status: data.funding.status,
        type: data.funding.type,
        entries: {
          connectOrCreate: data.funding.entries.map(entry => ({
            where: { id: entry.id },
            create: {
              id: entry.id,
              amount: entry.amount,
              sponsor: {
                connect: { id: entry.sponsorId },
              },
              anonymous: entry.anonymous,
              createdBy: 'API',
            },
          })),
        },
        updatedBy: 'API',
      },
    });
  }
}
