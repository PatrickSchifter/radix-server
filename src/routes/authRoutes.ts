import express from "express";
import AuthController from "../controllers/AuthController";
import {
  validatePostAuthRegister,
  validatePostAuthLogin,
} from "../middlewares/validate.auth.middleware";
const router = express.Router();
const authController = new AuthController();
import { Request, Response } from "express";

router.post(
  "/register",
  validatePostAuthRegister,
  (req: Request, res: Response) => authController.register(req, res)
);

router.post("/login", validatePostAuthLogin, (req: Request, res: Response) =>
  authController.login(req, res)
);

export default router;
