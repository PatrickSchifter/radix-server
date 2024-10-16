import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    const { email, name, password } = req.body;
    const { statusCode, body } = await this.authService.register({
      email,
      name,
      password,
    });
    res.status(statusCode).send(body);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { statusCode, body } = await this.authService.login({
      email,
      password,
    });
    res.status(statusCode).send(body);
  }
}

export default AuthController;
