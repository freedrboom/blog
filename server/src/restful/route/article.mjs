import Router from "koa-router"

import {
  addArticle,
  getArticleById,
  getArticleByUser,
  getAllArticles
} from "../controllers/article"
const articleRouter = new Router()
articleRouter
  .post("/addArticle", addArticle)
  .get("/articles/:id", getArticleById)
  .get("/getArticleByUser", getArticleByUser)
  .get("/articles", getAllArticles)
export default articleRouter
