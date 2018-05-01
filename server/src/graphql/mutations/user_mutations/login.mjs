import { GraphQLNonNull } from "graphql"

import { UserType, LoginInputType } from "../../types"
import { User } from "../../../mongoose/proxy"

export default {
  type: UserType,
  args: {
    data: {
      name: "data",
      type: new GraphQLNonNull(LoginInputType)
    }
  },
  resolve: async (root, { data: { account, password } }) => {
    let user = await User.getUserByAccount(account)
    console.log(user)
    if (user) {
      return user
    }
  }
}
