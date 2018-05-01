import { GraphQLNonNull } from "graphql"

import { TagType, TagInputType } from "../../types"
import { Tag } from "../../../mongoose/proxy"

export default {
  type: TagType,
  args: {
    data: {
      name: "data",
      type: new GraphQLNonNull(TagInputType)
    }
  },
  async resolve(root, params) {
    return await Tag.newAndSave(params.data)
  }
}
