import { Request, Response } from "express";
import { SensorReadingService } from "../services/SensorReadingService";
import { PaginationResponse } from "../interfaces/PaginationInterface";
import { TimestampFilter } from "../repositories/SensorReadingRepository";
import { subHours, subWeeks, subMonths } from "date-fns";
import { parse } from "csv-parse";

class SensorReadingController {
  private sensorReadingService: SensorReadingService;

  constructor() {
    this.sensorReadingService = new SensorReadingService();
  }

  async create(req: Request, res: Response) {
    const { equipmentId, timestamp, value } = req.body;
    if (equipmentId !== req.equipmentId) {
      res.status(403).send({
        message:
          "The requesting equipment must be registered and use its own API key.",
      });
    }
    const { statusCode, body } = await this.sensorReadingService.create({
      equipmentId,
      timestamp,
      value,
    });
    res.status(statusCode).send(body);
  }

  async paginate(req: Request, res: Response) {
    try {
      const { limit, page, timestamp } = req.query as {
        limit?: string;
        page?: string;
        timestamp?: TimestampFilter;
      };

      let timestampFilter: Date | undefined;
      const currentDate = new Date();

      switch (timestamp) {
        case "24hours":
          timestampFilter = subHours(currentDate, 24);
          break;
        case "48hours":
          timestampFilter = subHours(currentDate, 48);
          break;
        case "1week":
          timestampFilter = subWeeks(currentDate, 1);
          break;
        case "1month":
          timestampFilter = subMonths(currentDate, 1);
          break;
        default:
          timestampFilter = undefined;
      }

      const where = timestampFilter
        ? {
            timestamp: {
              gte: timestampFilter,
            },
          }
        : {};

      const { statusCode, body } = await this.sensorReadingService.paginate({
        where,
        pagination: {
          limit: limit ? parseInt(limit) : 10,
          page: page ? parseInt(page) : 1,
        },
      });

      res.status(statusCode).send(body as PaginationResponse);
    } catch (error: any) {
      console.error("Error paginating sensor reading:", error);
      res.status(500).send({
        message: "An error occurred while paginating sensor reading",
        error: error.message,
      });
    }
  }

  async average(req: Request, res: Response) {
    try {
      const { timestamp } = req.query as {
        timestamp: TimestampFilter;
      };

      let timestampFilter: Date;
      const currentDate = new Date();

      switch (timestamp) {
        case "24hours":
          timestampFilter = subHours(currentDate, 24);
          break;
        case "48hours":
          timestampFilter = subHours(currentDate, 48);
          break;
        case "1week":
          timestampFilter = subWeeks(currentDate, 1);
          break;
        case "1month":
          timestampFilter = subMonths(currentDate, 1);
          break;
        default:
          timestampFilter = subHours(currentDate, 24);
      }

      const { statusCode, body } = await this.sensorReadingService.getAverage({
        timestamp: timestampFilter,
      });

      res.status(statusCode).send(body);
    } catch (error: any) {
      console.error("Error to get average sensor reading:", error);
      res.status(500).send({
        message: "An error occurred while getting the average sensor reading",
        error: error.message,
      });
    }
  }

  async upload(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const filePath = req.file.path;

    try {
      const sensorReading: {
        equipmentId: string;
        timestamp: string;
        value: number;
      }[] = [];

      const parser = parse({ columns: true, skip_empty_lines: true });
      parser.on("readable", () => {
        let record;
        while ((record = parser.read())) {
          const equipmentId = record.equipmentId;
          const timestamp = record.timestamp;
          const value = parseFloat(record.value);

          if (!equipmentId || !timestamp || !value) {
            throw new Error(`Invalid record: ${JSON.stringify(record)}`);
          }

          sensorReading.push({ equipmentId, timestamp, value });
        }
      });

      parser.on("error", (error) => {
        throw new Error(`CSV parsing error: ${error.message}`);
      });

      parser.on("end", async () => {
        const { statusCode, body } = await this.sensorReadingService.createMany(
          sensorReading
        );

        res.status(statusCode).send(sensorReading);
      });

      const fs = require("fs");
      fs.createReadStream(filePath).pipe(parser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default SensorReadingController;
