import { GraphQLID, GraphQLNonNull } from "graphql"

import { TagType } from "../../types"
import { Tag } from "../../../mongoose/proxy"

export default {
  type: TagType,
  args: {
    id: {
      name: "ID",
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (root, { id }) => {
    return await Tag.getTagById(id)
  }
}
