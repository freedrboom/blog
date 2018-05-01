import Router from "koa-router"

import { addTag, getTagsByArticle, getTagsByUser } from "../controllers/tag"
const tagRouter = new Router()
tagRouter
  .post("/addTag", addTag)
  .post("/getTagsByArticle", getTagsByArticle)
  .post("/getTagsByUser", getTagsByUser)

export default tagRouter
