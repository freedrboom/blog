import { ArticleModel } from '../models'
import User from './user'

export const getFromObject = (object, path) => {
  let temp = {}
  path.forEach(value => {
    if (value in object) {
      temp[value] = object[value]
    }
  })
  return temp
}
export default class Article {
  static async queryArticle(query = {}) {
    return ArticleModel.find(query).populate([
      {
        path: 'user',
        select: {
          password: 0,
          token: 0,
          resetPassword: 0
        }
      },
      { path: 'tags' },
      {
        path: 'comments',
        populate: {
          path: 'user',
          select: '-token -password'
        }
      }
    ])
  }

  /*  获取全部文章  */
  static async getAllArticle(condition = {}) {
    return Article.queryArticle(condition)
  }
  static async getArticlesByAccount(account) {
    const user = await User.getUserByAccount(account)
    if (!user) {
      throw '没有该帐号'
    }
    return Article.queryArticle({ user: user.id })
  }
  /*  根据id查找文章  */
  static async getArticleById(id) {
    return ArticleModel.findById(id).populate([
      {
        path: 'user',
        select: {
          password: 0,
          token: 0,
          resetPassword: 0
        }
      },
      { path: 'tags' },
      {
        path: 'comments',
        populate: {
          path: 'user',
          select: '-token -password'
        }
      }
    ])
  }

  /*  生成新文章  */
  static async newAndSave(data) {
    const { user, tags, title, content, release = false, cover } = data
    const a = new ArticleModel({
      user,
      tags,
      title,
      content,
      release,
      cover
    })
    let findUser = await User.getUserById(user)
    if (!findUser) {
      throw 'the user id is invalid'
    }
    return a.save()
  }
}
