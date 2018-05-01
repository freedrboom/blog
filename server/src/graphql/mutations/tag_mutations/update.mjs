import { GraphQLNonNull, GraphQLID } from "graphql"
import { TagType, TagInputType } from "../../types"
import { Tag } from "../../../mongoose/proxy"

export default {
  type: TagType,
  args: {
    id: {
      type: GraphQLID,
      description: "ID of tag"
    },
    data: {
      name: "data",
      type: new GraphQLNonNull(TagInputType)
    }
  },
  resolve: async (root, { id, data }) => {
    let tag = await Tag.getTagById(id)

    if (tag) {
      Object.assign(tag, data)
      return await tag.save()
    }
  }
}
