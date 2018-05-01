import Router from "koa-router"

import { login, register } from "../controllers/user"
const userRouter = new Router()
userRouter.post("/login", login).post("/register", register)
export default userRouter
