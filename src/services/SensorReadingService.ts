import HttpResponse from "../utils/HttpResponse";
import SensorReadingRepository from "../repositories/SensorReadingRepository";
import { PaginationRequest } from "../interfaces/PaginationInterface";
import { Prisma } from "@prisma/client";
import { TimestampFilter } from "../repositories/SensorReadingRepository";

export class SensorReadingService {
  private sensorReadingService: SensorReadingRepository;

  constructor() {
    this.sensorReadingService = new SensorReadingRepository();
  }

  async create(data: Prisma.SensorReadingCreateInput) {
    try {
      const sensor_reading = await this.sensorReadingService.create(data);

      return HttpResponse.created(sensor_reading);
    } catch (error) {
      console.error(error);
      return HttpResponse.serverError();
    }
  }

  async createMany(data: Prisma.SensorReadingCreateManyInput[]) {
    try {
      const sensor_reading = await this.sensorReadingService.createMany(data);

      return HttpResponse.created(sensor_reading);
    } catch (error) {
      console.error(error);
      return HttpResponse.serverError();
    }
  }

  async getAverage({ timestamp }: { timestamp: Date }) {
    try {
      const averages = await this.sensorReadingService.getAverage(timestamp);
      return HttpResponse.ok(averages);
    } catch (error) {
      console.error(error);
      return HttpResponse.serverError();
    }
  }

  async paginate({
    where,
    pagination,
  }: {
    where: Prisma.SensorReadingWhereInput;
    pagination: PaginationRequest;
  }) {
    const readings = await this.sensorReadingService.paginate({
      where,
      pagination,
    });

    return HttpResponse.ok(readings);
  }
}
