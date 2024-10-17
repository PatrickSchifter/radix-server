import { validationResult, body } from "express-validator";
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
