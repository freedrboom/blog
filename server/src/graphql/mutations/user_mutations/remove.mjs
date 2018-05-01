import { GraphQLString } from "graphql"

import { UserType } from "../../types"
import { User } from "../../../mongoose/proxy"

export default {
  type: UserType,
  args: {
    account: {
      type: GraphQLString,
      description: "account or email"
    }
  },
  resolve: async (root, { account }) => {
    let user = await User.getUserByAccount(account)

    return await user.remove()
  }
}
