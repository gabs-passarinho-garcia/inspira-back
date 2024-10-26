import { Prisma, PrismaClient } from "@prisma/client";

export class PrismaHandler extends PrismaClient<
  Prisma.PrismaClientOptions,
  "query" | "error"
> {
  private static instance: PrismaHandler;

  private constructor() {
    super({
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" },
      ],
    });
  }

  private static init(): void {
    if (!PrismaHandler.instance) {
      PrismaHandler.instance = new PrismaHandler();
    }
  }

  public static get client(): PrismaClient {
    PrismaHandler.init();
    return PrismaHandler.instance;
  }
}
