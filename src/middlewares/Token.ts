import { Account, User } from "@prisma/client";
import jwt from "jsonwebtoken";

export class TokenMiddlewares {
  public static generateAccessToken(user: User): string {
    const payload = {
      id: user.id,
      username: user.username,
    }
    const secret: string = String(process.env.JWT_PASSWORD)
    const token: string = jwt.sign(payload, secret, { expiresIn: '24 hours' })
    return token
  }
  
  public static validateAccessToken(token: string): boolean {
    try {
      jwt.verify(token, String(process.env.JWT_PASSWORD))
      return true
    } catch (error: any) {
      return false
    }
  }

  public static validateApiKey(apiKey: string): boolean {
    return apiKey == process.env.API_KEY
  }
}