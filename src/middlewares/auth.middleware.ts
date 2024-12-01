import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import EquipmentRepository from "../repositories/EquipmentRepository";

export interface RequestUserId extends Request {
  userId?: number;
}

const equipmentRepository = new EquipmentRepository();

export const AuthMiddleware = async (
  req: RequestUserId,
  reply: Response,
  next: NextFunction
) => {
  try {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) {
        reply.status(401).send({
          message: "You must be logged in. Authentication token not found.",
        });
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwt.verify(token, config.secrets.secretJwt);
      req.userId = parseInt(decoded.data.iduser);
      next();
    } catch (err) {
      reply.status(401).send({ message: "Invalid token" });
    }
  } catch (err) {
    reply.status(500).send({ message: "Internal Server Error" });
  }
};

export const AuthApiKeyMiddleware = async (
  req: Request,
  reply: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const key =
      (req.headers["X-API-KEY"] as string) ||
      (req.headers["x-api-key"] as string);

    if (!key) {
      return reply.status(401).send({
        message: "Api key not provided",
      });
    }

    const existingApiKey = await equipmentRepository.findByApiKey(key);

    if (!existingApiKey) {
      return reply.status(401).send({
        message: "Api key not found.",
      });
    }

    req.equipmentId = existingApiKey.id;
    next();
  } catch (err) {
    reply.status(500).send({ message: "Internal Server Error" });
  }
};
