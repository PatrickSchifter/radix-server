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

/**
 * @openapi
 * /auth/register:
 *   post:
 *     description: Register new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: John Doe
 *             email: jhondoe@email.com
 *             password: password
 *     responses:
 *       201:
 *         description: Returns user
 *         content:
 *           application/json:
 *             example:
 *                 id: 1
 *                 name: John Doe
 *                 email: jhondoe@email.com
 *       409:
 *         description: Conflict error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Conflict'
 */

router.post("/login", validatePostAuthLogin, (req: Request, res: Response) =>
  authController.login(req, res)
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     description: Login user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: jhondoe@email.com
 *             password: password
 *     responses:
 *       200:
 *         description: Returns user and access token
 *         content:
 *           application/json:
 *             example:
 *               access_token: "token"
 *               expires_at: "2024-01-01T00:00:00.000Z"
 *               user:
 *                 id: 1
 *                 uuid: "uuid"
 *                 name: John Doe
 *                 email: jhondoe@email.com
 *                 profile_type: STANDARD
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Unauthorized'
 *             example:
 *               message: Invalid credentials
 *       403:
 *         description: Email not confirmed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Forbidden'
 *             example:
 *               message: Email not confirmed
 */

export default router;
