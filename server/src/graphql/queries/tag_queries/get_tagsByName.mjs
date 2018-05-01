import { GraphQLList, GraphQLString } from "graphql"
import { TagType } from "../../types"
import { Tag } from "../../../mongoose/proxy"

export default {
  type: new GraphQLList(TagType),
  args: {
    id: {
      name: "name",
      type: GraphQLString
    }
  },
  resolve: async (root, { name }) => {
    return await Tag.queryTag({ name })
  }
}
