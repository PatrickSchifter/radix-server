import { Prisma, PrismaClient } from "@prisma/client";
import {
  PaginationRequest,
  PaginationResponse,
} from "../interfaces/PaginationInterface";

const prisma = new PrismaClient();

class EquipmentRepository {
  async create(data: Prisma.EquipmentCreateInput) {
    try {
      const equipment = await prisma.equipment.create({
        data,
      });
      return equipment;
    } catch (error) {
      console.error("Error creating equipment:", error);
      throw new Error("Failed to create equipment");
    }
  }

  async findById(id: string) {
    try {
      const equipment = await prisma.equipment.findUnique({
        where: { id },
      });
      return equipment;
    } catch (error) {
      console.error("Error finding equipment by ID:", error);
      throw new Error("Failed to find equipment");
    }
  }

  async findByApiKey(apiKey: string) {
    try {
      const equipment = await prisma.equipment.findUnique({
        where: { api_key: apiKey },
      });
      return equipment;
    } catch (error) {
      console.error("Error finding equipment by API key:", error);
      throw new Error("Failed to find equipment");
    }
  }

  async paginate({
    where,
    pagination,
    select,
  }: {
    where?: Prisma.EquipmentWhereInput;
    pagination?: PaginationRequest;
    select?: Prisma.EquipmentSelect;
  }): Promise<PaginationResponse> {
    const limit = pagination?.limit ? pagination.limit : 10;
    const page = pagination?.page ? pagination.page : 1;
    const skip = (page - 1) * limit;

    const equipments = await prisma.equipment.findMany({
      where,
      select,
      skip,
      take: limit,
    });

    const total = await prisma.equipment.count({ where });

    return {
      data: equipments,
      pagination: {
        page,
        last_page: total > 0 ? Math.ceil(total / limit) : 1,
        total,
        limit,
      },
    };
  }
}

export default EquipmentRepository;
