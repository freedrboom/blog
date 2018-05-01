import { GraphQLList, GraphQLID } from "graphql"

import { CommentType } from "../../types"
import { Comment } from "../../../mongoose/proxy"

export default {
  type: new GraphQLList(CommentType),
  args: {
    article: {
      type: GraphQLID,
      description: "article id"
    }
  },
  async resolve(root, { article }) {
    return await Comment.getCommentsByArticle(article)
  }
}
