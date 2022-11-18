import { PrismaClient } from "@prisma/client";
import { dataAccounts } from "./accounts";
import { dataTransactions } from "./transactions";
import { dataUsers } from "./users";

const prisma = new PrismaClient()

const main = async () => {
  const users = await dataUsers()
  await prisma.user.createMany(users)
  await prisma.account.createMany(dataAccounts)
  await prisma.transaction.createMany(dataTransactions)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })