import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export interface RequestUserId extends Request {
  userId?: number;
}

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
