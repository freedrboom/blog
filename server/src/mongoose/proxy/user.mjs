import { UserModel } from "../models"
import { signToken, pwdHash } from "../../common/sigin"
export default class User {
  static getModel() {
    return UserModel
  }
  static async queryUser(options = {}) {
    return UserModel.find(options, { password: 0, token: 0, resetPassword: 0 })
  }
  static async getUserById(id) {
    return UserModel.findById(id)
  }
  static async getUserInfo(id) {
    return UserModel.findById(id, { password: 0, token: 0, resetPassword: 0 })
  }
  static async getUserByAccount(account) {
    return UserModel.findOne({ account })
  }

  static async newAndSave(data) {
    let {
      location,
      github,
      website,
      role = 10,
      description,
      account,
      password,
      email,
      subscribe,
      profile,
      avatar
    } = data

    if (await User.getUserByAccount(account)) {
      throw new Error("该账号已经被注册了")
    }
    password = await pwdHash(password)
    const user = new UserModel({
      location,
      github,
      website,
      role,
      description,
      account,
      password,
      email,
      subscribe,
      profile,
      avatar
    })
    user.token = signToken({
      id: user.id,
      account: user.account,
      role: user.role
    })
    return user.save()
  }
}
