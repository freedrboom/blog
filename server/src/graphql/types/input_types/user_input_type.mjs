import { GraphQLString, GraphQLInputObjectType } from "graphql"
export default new GraphQLInputObjectType({
  name: "UserInput",
  description: "Insert User",
  fields: () => ({
    email: {
      type: GraphQLString
    },
    account: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  })
})
