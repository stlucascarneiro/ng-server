import { makeSchema } from "nexus";
import { Account, Date, Token, Transaction, User } from "./objects";
import { Query } from "./queries";
import { Mutation } from "./mutations";
import path from "path";

export const schema = makeSchema({
  types: [Account, Date, Transaction, Token, User, Query, Mutation],
  outputs: {
    schema: path.join(__dirname, 'schema.graphql'),
    typegen: path.join(__dirname, '../prisma/generated', 'nexus.ts')
  }
})