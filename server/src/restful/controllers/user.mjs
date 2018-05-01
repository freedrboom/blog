import { User } from "../../mongoose/proxy"
import { pwdCompare, signToken } from "../../common/sigin"
export const login = async (ctx, next) => {
  const { account, password } = ctx.request.body
  try {
    const user = await User.getUserByAccount(account)
    if (!user) {
      throw new Error("帐号不存在")
    }
    if (await pwdCompare(password, user.password)) {
      user.token = signToken({
        id: user.id,
        account: user.account,
        role: user.role
      })
      const result = await user.save()
      //ctx.cookies.set("userId", result.token, { path: "/", maxAge: "24h" })
      ctx.body = Object.assign(result, { password: undefined })
    } else {
      throw new Error("密码错误")
    }
  } catch (err) {
    ctx.throw(500, err.message)
  }
}

export const register = async (ctx, next) => {
  const { account, password, email, description } = ctx.request.body
  const data = { account, password, email, description }
  try {
    const newuser = await User.newAndSave(data)
    const userInfo = await User.getUserInfo(newuser.id)
    if (!userInfo) {
      throw new Error("服务器内部错误")
    }
    ctx.body = userInfo
  } catch (err) {
    ctx.throw(500, err.message)
  }
}
export const logout = async (ctx, next) => {
  ctx.cookies.set("userId", "", {
    path: "/",
    maxAge: -1
  })
  ctx.body = "ok"
}
