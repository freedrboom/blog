import {
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList
} from "graphql"
export default new GraphQLInputObjectType({
  name: "articleAddInput",
  description: "Insert article",
  fields: () => ({
    title: { type: GraphQLString, description: "标题" },
    content: { type: GraphQLString, description: "内容" },
    cover: { type: GraphQLString, description: "封面" },
    user: { type: GraphQLID, description: "作者" },
    tags: { type: new GraphQLList(GraphQLID), description: "标签" }
  })
})
