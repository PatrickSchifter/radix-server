import { validationResult, body } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const validatePostAuthRegister: RequestHandler[] = [
  body("email")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format.")
    .isString()
    .withMessage("Email must be a String"),

  body("name")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("password")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

export const validatePostAuthLogin: RequestHandler[] = [
  body("email")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format.")
    .isString()
    .withMessage("Email must be a String"),

  body("password")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string"),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];
