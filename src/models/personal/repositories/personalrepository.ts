import { PrismaHandler } from "@/shared/providers/prisma/PrismaHandler";

export class PersonalRepository {

    async create(data: any) {
         return await PrismaHandler.client.personal.create(data);
    }
    async findAll() {
          return await PrismaHandler.client.personal.findMany();
        }

        // Read by ID
        async findById(id: string) {
          return await PrismaHandler.client.personal.findUnique({ where: { id } });
        }

        // Update
        async updateById(id: string, data: any) {
          return await PrismaHandler.client.personal.update({ where: { id }, data });
        }

        // Delete
        async deleteById(id: string) {
          return await PrismaHandler.client.personal.delete({ where: { id } });
        }
}