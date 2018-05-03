import Router from "koa-router"

import { addComment, getCommentsByArticle } from "../controllers/comment"
const commentRouter = new Router()
commentRouter.post("/comments", addComment)

export default commentRouter
