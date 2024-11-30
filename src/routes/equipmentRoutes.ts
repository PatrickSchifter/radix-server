import express from "express";
import EquipmentController from "../controllers/EquipmentController";
import {
  validatePostEquipment,
  validateEquipmentPagination,
} from "../middlewares/validate.equipment.middleware";
import { AuthMiddleware } from "../middlewares/auth.middleware";
const router = express.Router();
const equipmentController = new EquipmentController();
import { Request, Response } from "express";

router.post(
  "/",
  AuthMiddleware,
  validatePostEquipment,
  (req: Request, res: Response) => equipmentController.register(req, res)
);

/**
 * @openapi
 * /equipment:
 *   post:
 *     description: Register new equipment
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *             required:
 *               - id
 *           example:
 *             id: EQ-12495
 *     responses:
 *       201:
 *         description: Returns registered equipment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 api_key:
 *                   type: string
 *             example:
 *               id: EQ-12495
 *               api_key: 8c7696c7-942f-4278-8455-7710a780d3a2
 *       409:
 *         description: Conflict error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Equipment ID already exists
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *             example:
 *               message: An error occurred while registering equipment
 *               error: error details
 */

router.get(
  "/",
  AuthMiddleware,
  validateEquipmentPagination,
  (req: Request, res: Response) => equipmentController.paginate(req, res)
);

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /equipment:
 *   get:
 *     description: Paginate and retrieve a list of equipment
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records to return per page (pagination limit)
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number to retrieve (pagination)
 *       - in: query
 *         name: api_key
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by equipment API key
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by equipment ID
 *     responses:
 *       200:
 *         description: Returns a paginated list of equipment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       api_key:
 *                         type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     last_page:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *             example:
 *               data:
 *                 - id: EQ-12495
 *                   api_key: db087272-b820-4a25-b79c-bbdc88b91ea3
 *               pagination:
 *                 page: 1
 *                 last_page: 1
 *                 total: 1
 *                 limit: 10
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Invalid query parameters
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *             example:
 *               message: An error occurred while paginating equipment
 *               error: error details
 */

export default router;
