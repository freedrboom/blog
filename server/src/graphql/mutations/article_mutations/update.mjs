import { GraphQLNonNull, GraphQLID, GraphQLInputObjectType } from "graphql"

import { ArticleType, ArticleInputType } from "../../types"
import { Article } from "../../../mongoose/proxy"
export default {
  type: ArticleType,
  args: {
    id: {
      type: GraphQLID,
      description: "ID of comment"
    },
    data: {
      name: "data",
      type: new GraphQLNonNull(ArticleInputType)
    }
  },
  resolve: async (root, { id, data }) => {
    let article = await Article.getArticleById(id)

    if (article) {
      Object.assign(article, data)
      return await article.save()
    }
  }
}
