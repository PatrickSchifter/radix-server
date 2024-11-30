import { validationResult, query, body } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const validatePostSensorReading: RequestHandler[] = [
  body("equipmentId")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Equipment Id is required")
    .isString()
    .withMessage("Id must be a String"),

  body("timestamp")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Timestamp is required")
    .isISO8601()
    .withMessage("Timestamp must be a valid ISO 8601 date"),

  body("value")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Value is required")
    .isNumeric()
    .withMessage("Value must be a Number"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

export const validateSensorReadingPagination: RequestHandler[] = [
  query("limit")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Limit must be a positive integer")
    .toInt(),

  query("page")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Page must be a positive integer")
    .toInt(),

  query("timestamp")
    .optional()
    .isIn(["24hours", "48hours", "1week", "1month"])
    .withMessage(
      "Timestamp must be one of the following: '24hours', '48hours', '1week', '1month'"
    ),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export function validateFileMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(req.file);
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const allowedMimeTypes = ["text/csv"];
  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    res
      .status(400)
      .json({ error: "Invalid file type. Only CSV files are allowed." });
    return;
  }

  next();
}
