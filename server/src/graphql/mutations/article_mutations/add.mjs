import { GraphQLNonNull } from "graphql"

import { ArticleType, ArticleInputType } from "../../types"
import { Article } from "../../../mongoose/proxy"

export default {
  type: ArticleType,
  args: {
    data: {
      name: "data",
      type: new GraphQLNonNull(ArticleInputType)
    }
  },
  async resolve(root, { data }) {
    return await Article.newAndSave(data)
  }
}
