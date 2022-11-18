import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schemas/index";
import { managePlugins } from "@utils/managePlugins";

export const prisma = new PrismaClient({ log: ['query'] })

const main = async () => {
  const plugins = managePlugins()
  const server = new ApolloServer({schema, plugins})
  const {url} = await startStandaloneServer(server)
  console.log(`Server running. URL: ${url}`)
}

main()
.catch(async (e) => {
  console.log(e)
  process.exit(1)
})