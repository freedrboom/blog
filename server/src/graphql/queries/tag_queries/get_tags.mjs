import { GraphQLList } from "graphql"
import { TagType } from "../../types"
import { Tag } from "../../../mongoose/proxy"

export default {
  type: new GraphQLList(TagType),
  description: "all tags",
  resolve: async root => {
    return await Tag.getAllTags()
  }
}
