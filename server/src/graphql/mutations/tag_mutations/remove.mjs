import { GraphQLID } from "graphql"
import { TagType } from "../../types"
import { Tag } from "../../../mongoose/proxy"

export default {
  type: TagType,
  args: {
    id: {
      type: GraphQLID,
      description: "tag id"
    }
  },
  resolve: async (root, { account }) => {
    let tag = await Tag.getTagById(account)
    if (tag) return await tag.remove()
  }
}
