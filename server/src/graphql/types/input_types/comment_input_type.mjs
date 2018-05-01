import { GraphQLID, GraphQLString, GraphQLInputObjectType } from "graphql"
export default new GraphQLInputObjectType({
  name: "CommentAddInput",
  description: "Insert Comment",
  fields: () => ({
    user: {
      type: GraphQLID,
      description: "UserID"
    },
    article: {
      type: GraphQLID
    },
    content: {
      type: GraphQLString
    }
  })
})
