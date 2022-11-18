import { TransactionController } from "@controllers/Transaction";
import { UserController } from "@controllers/User";
import { User } from "@prisma/client";
import { floatArg, intArg, mutationType, nonNull, stringArg } from "nexus";

export const Mutation = mutationType({
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        apiKey: nonNull(stringArg()),
        username: nonNull(stringArg()),
        password: nonNull(stringArg())
      },
      resolve: async (_, {apiKey, username, password}) => {
        const user: User = await UserController.create(apiKey, username, password)
        return user
      }
    })

    t.field('createTransaction', {
      type: 'Transaction',
      args: {
        token: nonNull(stringArg()),
        debitedAccountId: nonNull(intArg()),
        creditedAccountUsername: nonNull(stringArg()),
        value: nonNull(floatArg())
      },
      resolve: async (_, {token, debitedAccountId, creditedAccountUsername, value}) => {
        const transaction = await TransactionController.createTransaction(token, debitedAccountId, creditedAccountUsername, value)
        return transaction
      }
    })
  },
})