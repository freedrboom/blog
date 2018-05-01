import { TagModel } from "../models"
import User from "./user"

export default class Tag {
  /*  根据id查找标签  */
  static async getTagById(id) {
    return TagModel.findById(id).populate({
      path: "user",
      select: {
        password: 0,
        token: 0,
        resetPassword: 0
      }
    })
  }
  /*  生成新标签  */
  static async newAndSave(data) {
    const { user, name, description } = data
    let userMode = await User.getUserById(user)
    if (!userMode) {
      throw "the user id is invalid"
    }
    const t = new TagModel({ user, name, description })
    return t.save()
  }
  static async queryTag(options = {}) {
    return TagModel.find(options).populate({
      path: "user",
      select: {
        password: 0,
        token: 0,
        resetPassword: 0
      }
    })
  }
  static async queryTagsAccount(account) {
    const user = await User.getUserByAccount(account)
    if (!user) {
      throw "没有该帐号"
    }
    return Tag.queryTag({ user: user.id })
  }
  static async getAllTags() {
    return Tag.queryTag()
  }
}
