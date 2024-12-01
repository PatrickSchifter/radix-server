import { validationResult, body, query } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const validatePostEquipment: RequestHandler[] = [
  body("id")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Id is required")
    .isString()
    .withMessage("Id must be a String"),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

export const validateEquipmentPagination: RequestHandler[] = [
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

  query("id").optional().isString().withMessage("ID must be a string").toInt(),

  query("api_key")
    .optional()
    .isString()
    .withMessage("Api Key must be a String")
    .toInt(),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];
