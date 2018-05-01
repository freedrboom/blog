import { GraphQLNonNull } from "graphql"

import { UserType, UserInputType } from "../../types"
import { User } from "../../../mongoose/proxy"

export default {
  type: UserType,
  args: {
    data: {
      name: "data",
      type: new GraphQLNonNull(UserInputType)
    }
  },
  async resolve(root, params) {
    return await User.newAndSave(params.data)
  }
}
