import { Prisma, PrismaClient } from "@prisma/client";
import {
  PaginationRequest,
  PaginationResponse,
} from "../interfaces/PaginationInterface";

const prisma = new PrismaClient();

export type TimestampFilter = "24hours" | "48hours" | "1week" | "1month";

class SensorReadingRepository {
  async create(data: Prisma.SensorReadingCreateInput) {
    try {
      const reading = await prisma.sensorReading.create({
        data,
      });
      return reading;
    } catch (error) {
      console.error("Error creating sensor reading:", error);
      throw new Error("Failed to create sensor reading");
    }
  }

  async createMany(data: Prisma.SensorReadingCreateInput[]) {
    try {
      await prisma.sensorReading.createMany({
        data,
      });
    } catch (error) {
      console.error("Error creating sensor reading:", error);
      throw new Error("Failed to create sensor reading");
    }
  }

  async findById(id: number) {
    try {
      const reading = await prisma.sensorReading.findUnique({
        where: { id },
      });
      return reading;
    } catch (error) {
      console.error("Error finding sensor reading by ID:", error);
      throw new Error("Failed to find sensor reading");
    }
  }

  async getAverage(timestamp: Date) {
    const averages = await prisma.sensorReading.groupBy({
      by: ["equipmentId"],
      _avg: {
        value: true,
      },
      where: {
        timestamp: {
          gte: timestamp,
        },
      },
    });

    return averages;
  }

  async paginate({
    where,
    pagination,
    select,
  }: {
    where?: Prisma.SensorReadingWhereInput;
    pagination?: PaginationRequest;
    select?: Prisma.SensorReadingSelect;
  }): Promise<PaginationResponse> {
    const limit = pagination?.limit ? pagination.limit : 10;
    const page = pagination?.page ? pagination.page : 1;
    const skip = (page - 1) * limit;

    const readings = await prisma.sensorReading.findMany({
      where,
      select,
      skip,
      take: limit,
    });

    const total = await prisma.sensorReading.count({ where });

    return {
      data: readings,
      pagination: {
        page,
        last_page: total > 0 ? Math.ceil(total / limit) : 1,
        total,
        limit,
      },
    };
  }
}

export default SensorReadingRepository;
