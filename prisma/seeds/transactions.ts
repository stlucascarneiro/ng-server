interface ITransactionSeed {
  value: number
  debitedAccountId: number
  creditedAccountId: number
  createdAt: Date
}

export const dataTransactions: {data: ITransactionSeed[]} = {
  data: [
    {
      value: 10.14,
      debitedAccountId: 1,
      creditedAccountId: 2,
      createdAt: new Date()
    },
    {
      value: 20.25,
      debitedAccountId: 2,
      creditedAccountId: 1,
      createdAt: new Date()
    },
    {
      value: 30.36,
      debitedAccountId: 2,
      creditedAccountId: 3,
      createdAt: new Date()
    },
    {
      value: 5.47,
      debitedAccountId: 2,
      creditedAccountId: 4,
      createdAt: new Date()
    },
    {
      value: 15.58,
      debitedAccountId: 4,
      creditedAccountId: 1,
      createdAt: new Date()
    },
  ]
}