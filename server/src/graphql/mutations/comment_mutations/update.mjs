import { GraphQLNonNull, GraphQLID } from "graphql"
import { CommentType, CommentInputType } from "../../types"
import { Comment } from "../../../mongoose/proxy"

export default {
  type: CommentType,
  args: {
    id: {
      type: GraphQLID,
      description: "ID of comment"
    },
    data: {
      name: "data",
      type: new GraphQLNonNull(CommentInputType)
    }
  },
  resolve: async (root, { id, data }) => {
    let comment = await Comment.getCommentById(id)

    if (comment) {
      Object.assign(comment, data)
      return await comment.save()
    }
  }
}
