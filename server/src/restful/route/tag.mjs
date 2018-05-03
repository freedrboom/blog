import Router from "koa-router"

import { addTag, queryTag } from "../controllers/tag"
const tagRouter = new Router()
tagRouter.post("/tags", addTag).get("/tags", queryTag)

export default tagRouter
