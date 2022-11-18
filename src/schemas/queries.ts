import { AccountController } from "@controllers/Account";
import { TransactionController } from "@controllers/Transaction";
import { UserController } from "@controllers/User";
import { queryType, nonNull, intArg, stringArg } from "nexus";

export const Query = queryType({
  definition(t) {
    t.field('authenticateUser', {
      type: "Token",
      args: {
        apiKey: nonNull(stringArg()),
        username: nonNull(stringArg()),
        password: nonNull(stringArg())
      },
      resolve: async (_, {apiKey, username, password}) => {
        const token = await UserController.authenticate(apiKey, username, password)
        return {token}
      }
    })

    t.field('getAccount', {
      type: "Account",
      args: {
        token: nonNull(stringArg()),
        userId: nonNull(intArg())
      },
      resolve: async (_, {token, userId}) => {
        const account = await AccountController.getAccount(token, userId)
        return account
      }
    })

    t.list.field('getTransactions', {
      type: "Transaction",
      args: {
        token: nonNull(stringArg()),
        accountId: nonNull(intArg())
      },
      resolve: async (_, {token, accountId}) => {
        const transactions = await TransactionController.getTransactions(token, accountId)
        return transactions
      }
    })
  }
})