import { GraphQLList } from "graphql"
import { ArticleType } from "../../types"
import { Article } from "../../../mongoose/proxy"

export default {
  type: new GraphQLList(ArticleType),
  description: "获取所有的文章",
  resolve: async root => {
    return await Article.getAllArticle()
  }
}
