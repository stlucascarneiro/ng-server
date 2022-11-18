import bcrypt from "bcrypt";
import { prisma } from "..";

export class UserMiddlewares {
  public static async generateHashPassword(password: string): Promise<string> {
    const hashCost: number = 12;
    const hashPassword: string = await bcrypt.hash(password, hashCost)
    return hashPassword
  }

  public static validateUsername(username: string): boolean {
    const invalidUsername: boolean = username.length > 24 || username.length < 3 || /[^a-zA-Z0-9\-\/]/.test(username)
    return !invalidUsername
  }

  public static async validateUniqueUsername(username: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { username } })
    if (user) return false
    return true
  }

  public static validatePassword(password: string): boolean {
    const meetsRequirements: boolean = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/.test(password)
    const validCharacters: boolean = !/[^a-zA-Z0-9!@#$%&\-/]/.test(password)
    return meetsRequirements && validCharacters
  }

  public static async authenticatePassword(password: string, hashPassword: string) {
    const isAuthentic = await bcrypt.compare(password, hashPassword)
    return isAuthentic
}
}