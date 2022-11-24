import { objectType } from "nexus";
import { extendType, inputObjectType, NexusObjectTypeDef } from "nexus/dist/core";

export const User = objectType({
  name: "User",
  definition(t) {
    t.int('id')
    t.string('username')
  }
})

export const Account = objectType({
  name: "Account",
  definition(t) {
    t.int('id')
    t.float('balance')
    t.field('user', {type: User})
  }
})

export const Transaction = objectType({
  name: "Transaction",
  definition(t) {
    t.int('id')
    t.float('value')
    t.field('debitedAccount', {type: "Account"})
    t.field('creditedAccount', {type: "Account"})
    t.string('createdAt')
  }
})

export const Token = objectType({
  name: "Token",
  definition(t) {
    t.string('token')
  },
})

export const Date = inputObjectType({
  name: "Date", 
  definition(t) {
    t.int('day')
    t.int('month')
    t.int('year')
  },
})
