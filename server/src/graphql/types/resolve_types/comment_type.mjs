import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} from "graphql"

import UserType from "./user_type"
import ArticleType from "./article_type"

export default new GraphQLObjectType({
  name: "Comment",
  description: "评论",
  fields: () => ({
    _id: { type: GraphQLID, description: "id" },
    article: { type: ArticleType, description: "文章id" },
    user: { type: UserType, description: "评论人" },
    comment_like: { type: GraphQLInt, description: "顶" },
    comment_hate: { type: GraphQLInt, description: "踩" },
    type: { type: GraphQLString, description: "类型" },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: "评论内容"
    },
    created_at: { type: GraphQLString, description: "评论时间" },
    floor: { type: GraphQLInt, description: "楼层数" },
    view: { type: GraphQLString, description: "解析后的评论内容" },
    deleted: { type: GraphQLBoolean, description: "是否被删除" }
  })
})
