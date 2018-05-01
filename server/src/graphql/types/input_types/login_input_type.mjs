import { GraphQLString, GraphQLInputObjectType } from "graphql"

export default new GraphQLInputObjectType({
  name: "loginInput",
  description: "login",
  fields: () => ({
    account: {
      type: GraphQLString,
      description: "account or email"
    },
    password: {
      type: GraphQLString,
      description: "password"
    }
  })
})
