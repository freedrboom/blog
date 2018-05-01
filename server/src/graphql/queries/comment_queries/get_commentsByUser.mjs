import { GraphQLList, GraphQLID } from "graphql"

import { CommentType } from "../../types"
import { Comment } from "../../../mongoose/proxy"

export default {
  type: new GraphQLList(CommentType),
  args: {
    user: {
      type: GraphQLID,
      description: "用户id"
    }
  },
  async resolve(root, { user }) {
    return await Comment.getCommentsByUser(user)
  }
}
