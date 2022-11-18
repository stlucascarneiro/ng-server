import { Account } from "@prisma/client";

interface IAccountSeed {
  balance: number,
  userId: number
}

export const dataAccounts: {data: IAccountSeed[]} = {
  data: [
    {
      balance: 25.40,
      userId: 1
    },
    {
      balance: 631.14,
      userId: 2
    },
    {
      balance: 87.03,
      userId: 3
    },
    {
      balance: 99.27,
      userId: 4
    }
  ]
}