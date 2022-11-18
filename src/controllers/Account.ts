import { TokenMiddlewares } from "@middlewares/Token";
import { Account, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { prisma } from "..";

export class AccountController {
  public static async getAccount(token: string, searchKey: number | string): Promise<Account & { user: User }> {
    if (!TokenMiddlewares.validateAccessToken(token)) throw new GraphQLError('Token Inválido', { extensions: { code: 401 } })

    let where = {}
    if(typeof searchKey == 'number') where = {id: searchKey}
    else if (typeof searchKey == 'string') where = {username: searchKey}
    else throw new GraphQLError('Requisição inválida', {extensions: {code: 404}})

    const user = await prisma.user.findUnique({where, include: {account: true}})
    if (!user) throw new GraphQLError('Conta não encontrada', { extensions: { code: 404 } })
 
    return { ...user.account[0], user }
  }
}