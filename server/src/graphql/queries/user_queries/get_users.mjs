import { GraphQLList } from "graphql"

import { UserType } from "../../types"
import { User } from "../../../mongoose/proxy"

export default {
  type: new GraphQLList(UserType),
  async resolve() {
    return await User.queryUser()
  }
}
