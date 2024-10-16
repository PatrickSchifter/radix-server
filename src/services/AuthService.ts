import UserRepository from "../repositories/UserRepository";
import HttpResponse from "../utils/HttpResponse";
import { validatePassword } from "../utils/password";
import { JwtTokenService } from "./JwtTokenService";
import { Prisma } from "@prisma/client";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data: Prisma.UserCreateInput) {
    try {
      const emailExists = await this.userRepository.findByEmail({
        email: data.email,
      });

      if (emailExists) {
        return HttpResponse.conflict({ message: "User already exists" });
      }

      await this.userRepository.create({
        email: data.email,
        name: data.name,
        password: data.password,
      });
      const userData = await this.userRepository.findByEmail({
        email: data.email,
      });
      if (!userData)
        return HttpResponse.notFound({ message: "User not found" });

      return HttpResponse.created({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        created_at: userData.created_at,
      });
    } catch (error) {
      console.error(error);
      return HttpResponse.serverError();
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    const userData = await this.userRepository.findByEmail({ email });
    try {
      if (!userData)
        return HttpResponse.unauthorized({
          message:
            "Invalid credentials. Verify your email or password and try again.",
        });

      const passwordMatch = await validatePassword(password, userData.password);

      if (!passwordMatch)
        return HttpResponse.unauthorized({
          message:
            "Invalid credentials. Verify your email or password and try again.",
        });

      const { access_token, expires_at } = JwtTokenService.generateAccessToken({
        email: email,
        user_id: userData.id,
      });

      return HttpResponse.ok({
        access_token,
        expires_at,
        user_id: userData.id,
        user_name: userData.name,
      });
    } catch (error) {
      console.error(error);
      return HttpResponse.serverError();
    }
  }
}
