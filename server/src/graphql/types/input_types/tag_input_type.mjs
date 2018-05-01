import { GraphQLID, GraphQLString, GraphQLInputObjectType } from "graphql"
export default new GraphQLInputObjectType({
  name: "TagAddInput",
  description: "Insert Tag",
  fields: () => ({
    user: {
      type: GraphQLID,
      description: "UserID"
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
  })
})
