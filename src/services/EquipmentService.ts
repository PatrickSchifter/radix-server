import HttpResponse from "../utils/HttpResponse";
import { generateApiKey } from "../utils/apiKeyGenerator";
import EquipmentRepository from "../repositories/EquipmentRepository";
import { PaginationRequest } from "../interfaces/PaginationInterface";
import { Prisma } from "@prisma/client";

export class EquipmentService {
  private equipmentRepository: EquipmentRepository;

  constructor() {
    this.equipmentRepository = new EquipmentRepository();
  }

  async register(data: { id: string }) {
    try {
      const idExists = await this.equipmentRepository.findById(data.id);

      if (idExists) {
        return HttpResponse.conflict({
          message: "Equipment Id already exists",
        });
      }

      const equipment = await this.equipmentRepository.create({
        api_key: generateApiKey(),
        id: data.id,
      });

      return HttpResponse.created(equipment);
    } catch (error) {
      console.error(error);
      return HttpResponse.serverError();
    }
  }

  async paginate({
    where,
    pagination,
  }: {
    where: Prisma.EquipmentWhereInput;
    pagination: PaginationRequest;
  }) {
    const equipments = await this.equipmentRepository.paginate({
      where,
      pagination,
    });

    return HttpResponse.ok(equipments);
  }
}
