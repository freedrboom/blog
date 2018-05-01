import { GraphQLID, GraphQLNonNull } from "graphql"

import { UserType } from "../../types"
import { User } from "../../../mongoose/proxy"
export default {
  type: UserType,
  args: {
    id: {
      name: "ID",
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve(root, params) {
    return await User.getUserById(params.id)
  }
}
