import Router from "koa-router"

import { addComment, getCommentsByArticle } from "../controllers/comment"
const commentRouter = new Router()
commentRouter
  .post("/addComment", addComment)
  .post("/getCommentsByArticle", getCommentsByArticle)

export default commentRouter
