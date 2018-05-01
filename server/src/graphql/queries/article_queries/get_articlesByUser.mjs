import { GraphQLID, GraphQLNonNull, GraphQLList } from "graphql"

import { ArticleType } from "../../types"
import { Article } from "../../../mongoose/proxy"

export default {
  type: new GraphQLList(ArticleType),
  args: {
    user: {
      name: "user ID",
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (root, { user }) => {
    return await Article.queryArticle({ user })
  }
}
