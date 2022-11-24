import { TokenMiddlewares } from "@middlewares/Token";
import { Transaction } from "@prisma/client";
import { GraphQLError } from "graphql";
import { prisma } from "src";
import { AccountController } from "./Account";
import { IDate } from "./types";


export class TransactionController {
  public static async getTransactions(token: string, accountId: number, fromDate: IDate | undefined, toDate: IDate | undefined, filterBy: 'todos' | 'ganhos' | 'gastos'): Promise<Transaction[]>{
    if(!TokenMiddlewares.validateAccessToken(token)) throw new GraphQLError('Token Inválido', {extensions: {code: 401}})
    

    let gte = new Date()
    if(fromDate) gte = new Date(fromDate.year, fromDate.month - 1, fromDate.day)
    else gte.setMonth(gte.getMonth() - 1)
    
    let lte = new Date()
    if(toDate) lte = new Date(toDate.year, toDate.month, toDate.day, 23, 59, 59)

    const OR = []
    if(filterBy === 'todos' || filterBy === 'ganhos') OR.push({creditedAccountId: accountId}) 
    if(filterBy === 'todos' || filterBy === 'gastos') OR.push({debitedAccountId: accountId}) 

    const transactions = await prisma.transaction.findMany({
      where: {
        OR,
        createdAt: { gte, lte },
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        creditedAccount: {
          include: {user: true}
        },
        debitedAccount: {
          include: {user: true}
        }
      }
    })

    return transactions
  }

  public static async createTransaction(token: string, debitedAccountId: number, creditedAccountUsername: string, value: number){

    const debitedAccount = await AccountController.getAccount(token, debitedAccountId)
    if(debitedAccount.balance < value) throw new GraphQLError('Saldo insuficiente', {extensions: {code: 400}})

    if(creditedAccountUsername == debitedAccount.user.username) throw new GraphQLError('Destino inválido', {extensions: {code: 400}})

    const creditedAccount = await AccountController.getAccount(token, creditedAccountUsername)

    await prisma.account.update({
      where: {id: debitedAccountId},
      data: {balance: {decrement: value}}
    })
    
    await prisma.account.update({
      where: {id: creditedAccount.id},
      data: {balance: {increment: value}}
    })

    const transaction = await prisma.transaction.create({
      data: {
        value: value,
        debitedAccountId,
        creditedAccountId: creditedAccount.id
      },
      include: {
        debitedAccount: {include: {user: true}},
        creditedAccount: {include: {user: true}}
      }
    })

    return transaction
  }
}