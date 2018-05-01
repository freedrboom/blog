import { GraphQLID } from "graphql"

import { ArticleType } from "../../types"
import { Article } from "../../../mongoose/proxy"

export default {
  type: ArticleType,
  args: {
    id: {
      type: GraphQLID,
      description: "account or email"
    }
  },
  resolve: async (root, { id }) => {
    let article = await Article.getArticleById(id)
    if (article) return await article.remove()
  }
}
