import { Request, Response } from "express";
import { EquipmentService } from "../services/EquipmentService";
import { PaginationResponse } from "../interfaces/PaginationInterface";

class EquipmentController {
  private equipmentService: EquipmentService;

  constructor() {
    this.equipmentService = new EquipmentService();
  }

  async register(req: Request, res: Response) {
    const { id } = req.body;
    const { statusCode, body } = await this.equipmentService.register({
      id,
    });
    res.status(statusCode).send(body);
  }

  async paginate(req: Request, res: Response) {
    try {
      const { limit, page, api_key, id } = req.query as {
        limit?: string;
        page?: string;
        api_key?: string;
        id?: string;
      };

      const { statusCode, body } = await this.equipmentService.paginate({
        where: {
          id: id ? id : undefined,
          api_key: api_key ? api_key : undefined,
        },
        pagination: {
          limit: limit ? parseInt(limit) : 10,
          page: page ? parseInt(page) : 1,
        },
      });

      res.status(statusCode).send(body as PaginationResponse);
    } catch (error: any) {
      console.error("Error paginating equipment:", error);
      res.status(500).send({
        message: "An error occurred while paginating equipment",
        error: error.message,
      });
    }
  }
}

export default EquipmentController;
