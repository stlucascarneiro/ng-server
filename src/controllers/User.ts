import { prisma } from "..";
import { GraphQLError } from "graphql";
import { UserMiddlewares } from "@middlewares/User";
import { TokenMiddlewares } from "@middlewares/Token";
import { Account, User } from "@prisma/client";

export class UserController {
  public static async create(apiKey: string, username: string, password: string): Promise<User>{
    if(!TokenMiddlewares.validateApiKey(apiKey)) throw new GraphQLError('Não autorizado', {extensions: {code: 401}})
    if(!UserMiddlewares.validateUsername(username)) throw new GraphQLError('Nome de usuário inválido', {extensions: {code: 400}})
    if(!UserMiddlewares.validatePassword(password)) throw new GraphQLError('Senha inválida', {extensions: {code: 400}})
    if(!await UserMiddlewares.validateUniqueUsername(username)) throw new GraphQLError('Username already in use', {extensions: {code: 400}})
    
    const hashPassword: string = await UserMiddlewares.generateHashPassword(password)
    
    const res = await prisma.user.create({
      data: {
        username, 
        password: hashPassword,
        account: {
          create: {
            balance: 100.00
          }
        }
      }, include: {account: true}
    })

    return res
  }

  public static async authenticate(apiKey: string, username: string, password: string): Promise<string>{
    if(!TokenMiddlewares.validateApiKey(apiKey)) throw new GraphQLError('Não autorizado', {extensions: {code: 401}})
    if(!UserMiddlewares.validateUsername(username)) throw new GraphQLError('Invalid username', {extensions: {code: 400}})
    if(!UserMiddlewares.validatePassword(password)) throw new GraphQLError('Senha inválida', {extensions: {code: 400}})

    const user = await prisma.user.findUnique({where: {username}})
    if(!user) throw new Error('User not found')    

    if(!await UserMiddlewares.authenticatePassword(password, user.password)) throw new GraphQLError('Senha incorreta', {extensions: {code: 400}})

    return TokenMiddlewares.generateAccessToken(user)
  }

  public static async getUser(token: string, searchFor: number | string){
    if(!TokenMiddlewares.validateAccessToken(token)) throw new GraphQLError('Token Inválido', {extensions: {code: 401}})

    let where = {}
    if(typeof searchFor == 'number') where = {id: searchFor}
    else if(typeof searchFor == 'string') where = {username: searchFor}
    else throw new GraphQLError('Requisição inválida', {extensions: {code: 400}})

    const user = prisma.user.findUnique({where})
    
  }
}