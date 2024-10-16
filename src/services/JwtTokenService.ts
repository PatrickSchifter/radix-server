import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";

interface IAccessTokenData {
  user_id: number;
  email: string;
}
export class JwtTokenService {
  private static readonly secretKey: string = config.secrets.secretJwt || "";

  static generateAccessToken(data: IAccessTokenData) {
    const access_token = jwt.sign({ data }, this.secretKey, {
      expiresIn: "24h",
    });
    const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000);

    return {
      access_token,
      expires_at,
    };
  }

  static verifyAccessToken(access_token: string) {
    try {
      const decoded = jwt.verify(access_token, this.secretKey) as JwtPayload;

      return decoded?.data as IAccessTokenData;
    } catch (err) {
      throw new Error("Invalid access token");
    }
  }
}
