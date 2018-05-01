import { GraphQLID } from "graphql"
import { CommentType } from "../../types"
import { Comment } from "../../../mongoose/proxy"

export default {
  type: CommentType,
  args: {
    id: {
      type: GraphQLID,
      description: "ID of comment"
    }
  },
  resolve: async (root, { id }) => {
    let comment = await Comment.getCommentById(id)

    if (comment) {
      return await comment.remove()
    }
  }
}
