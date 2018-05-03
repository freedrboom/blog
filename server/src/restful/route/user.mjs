import Router from "koa-router"

import {
  logout,
  login,
  register,
  queryUser,
  getUserById,
  updateUserById
} from "../controllers/user"
const userRouter = new Router()
userRouter
  .post("/login", login)
  .post("/register", register)
  .get("/users/:id", getUserById)
  .get("/users", queryUser)
  .put("/users/:id", updateUserById)
export default userRouter
