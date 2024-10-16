import { Prisma } from "@prisma/client";
import { dbClient } from "../database/PrismaClient";

export default class UserRepository {
  getAllUsers() {
    return dbClient.user.findMany();
  }

  create(data: Prisma.UserCreateInput) {
    return dbClient.user.create({
      data,
    });
  }

  findByEmail({ email }: { email: string }) {
    return dbClient.user.findFirst({
      where: {
        email,
      },
    });
  }

  findById({ id }: { id: number }) {
    return dbClient.user.findFirst({
      where: {
        id,
      },
    });
  }
}
