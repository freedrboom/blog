import { GraphQLNonNull } from "graphql"

import { CommentType, CommentInputType } from "../../types"
import { Comment } from "../../../mongoose/proxy"

export default {
  type: CommentType,
  args: {
    data: {
      name: "data",
      type: new GraphQLNonNull(CommentInputType)
    }
  },
  async resolve(root, { data }) {
    return await Comment.newAndSave(data)
  }
}
