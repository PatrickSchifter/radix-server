import express from "express";
import { Request, Response } from "express";
import multer from "multer";
import SensorReadingController from "../controllers/SensorReadingController";
import {
  AuthMiddleware,
  AuthApiKeyMiddleware,
} from "../middlewares/auth.middleware";
import {
  validatePostSensorReading,
  validateFileMiddleware,
} from "../middlewares/validate.sensor-reading.middleware";

const router = express.Router();
const sensorReadingController = new SensorReadingController();
const upload = multer({ dest: "uploads/" }); // Pasta temporária para armazenar o CSV

router.post(
  "/",
  AuthApiKeyMiddleware,
  validatePostSensorReading,
  (req: Request, res: Response) => sensorReadingController.create(req, res)
);

/**
 * @openapi
 * /sensor-reading:
 *   post:
 *     description: Register new sensor reading
 *     tags: [Sensor Reading]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: header
 *         name: X-API-KEY
 *         required: true
 *         description: API key for equipment authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             equipmentId: EQ-12495
 *             timestamp: 2023-02-15T01:30:00.000-05:00
 *             value: 78.42
 *     responses:
 *       201:
 *         description: Returns sensor reading
 *         content:
 *           application/json:
 *             example:
 *                 id: 1
 *                 equipmentId: EQ-12495
 *                 timestamp: 2023-02-15T01:30:00.000-05:00
 *                 value: 78.42
 */

router.get("/", AuthMiddleware, (req: Request, res: Response) =>
  sensorReadingController.paginate(req, res)
);

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /sensor-reading:
 *   get:
 *     description: Paginate and retrieve sensor readings
 *     tags: [Sensor Reading]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records to return per page (pagination limit)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number to retrieve (pagination)
 *       - in: query
 *         name: timestamp
 *         schema:
 *           type: string
 *           enum: [24hours, 48hours, 1week, 1month]
 *         description: Filter by time range (24 hours, 48 hours, 1 week, or 1 month)
 *     responses:
 *       200:
 *         description: Returns a paginated list of sensor readings
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 - id: 1
 *                   equipmentId: EQ-12495
 *                   timestamp: 2023-02-15T01:30:00.000-05:00
 *                   value: 78.42
 *               pagination:
 *                 page: 1
 *                 last_page: 1
 *                 total: 1
 *                 limit: 10
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid query parameters
 *               errors:
 *                 - msg: "Limit must be a positive integer"
 *                   param: "limit"
 *                   location: "query"
 *       401:
 *         description: Unauthorized - missing or invalid Bearer token
 *         content:
 *           application/json:
 *             example:
 *               message: Unauthorized access
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while paginating sensor readings
 *               error: error details
 */

router.post(
  "/upload",
  AuthMiddleware,
  upload.single("file"),
  validateFileMiddleware,
  (req: Request, res: Response) => sensorReadingController.upload(req, res)
);

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /sensor-reading/upload:
 *   post:
 *     description: Upload sensor readings via CSV file
 *     tags: [Sensor Reading]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: CSV file containing sensor readings
 *           example:
 *             file: sensor-readings.csv
 *     responses:
 *       201:
 *         description: Successfully uploaded sensor readings
 *         content:
 *           application/json:
 *             example:
 *               - equipmentId: "EQ-12495"
 *                 timestamp: "2023-02-12T01:30:00.000-05:00"
 *                 value: 78.8
 *               - equipmentId: "EQ-12495"
 *                 timestamp: "2023-02-12T01:31:00.000-05:00"
 *                 value: 79.8
 *               - equipmentId: "EQ-12495"
 *                 timestamp: "2023-02-12T01:32:00.000-05:00"
 *                 value: 80.8
 *               - equipmentId: "EQ-12495"
 *                 timestamp: "2023-02-12T01:33:00.000-05:00"
 *                 value: 81.8
 *               - equipmentId: "EQ-12495"
 *                 timestamp: "2023-02-12T01:34:00.000-05:00"
 *                 value: 82.8
 *               - equipmentId: "EQ-12495"
 *                 timestamp: "2023-02-12T01:35:00.000-05:00"
 *                 value: 83.8
 *       400:
 *         description: Bad request or missing file
 *         content:
 *           application/json:
 *             example:
 *               error: "No file uploaded"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "CSV parsing error: Invalid format"
 */

export default router;
