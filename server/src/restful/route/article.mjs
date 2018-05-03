import Router from "koa-router"

import {
  queryArticles,
  updateArticleById,
  removeArticleById,
  addArticle,
  getArticleById
} from "../controllers/article"
const articleRouter = new Router()
articleRouter
  .post("/articles", addArticle)
  .get("/articles/:id", getArticleById)
  .get("/articles", queryArticles)
  .del("articles/:id", removeArticleById)
  .put("articles/:id", updateArticleById)
export default articleRouter
