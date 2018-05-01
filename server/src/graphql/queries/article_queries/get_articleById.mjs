import { GraphQLID, GraphQLNonNull } from "graphql"

import { ArticleType } from "../../types"
import { Article } from "../../../mongoose/proxy"

export default {
  type: ArticleType,
  args: {
    id: {
      name: "ID",
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve(root, { id }) {
    return await Article.getArticleById(id)
  }
}
