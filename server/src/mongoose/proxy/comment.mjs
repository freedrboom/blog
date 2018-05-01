import { CommentModel } from "../models"
import User from "./user"
import Article from "./article"

/*  获取全部评论  */
export default class Comment {
  static async queryComment(query = {}) {
    return CommentModel.find(query)
      .populate([
        {
          path: "user",
          select: {
            password: 0,
            token: 0,
            resetPassword: 0
          }
        },
        {
          path: "artile"
        }
      ])
      .sort({ created_at: -1 })
  }

  static async getCommentsAccount(critics) {
    const user = await User.getUserByAccount(account)
    if (!user) {
      throw "没有该帐号"
    }
    return Comment.queryComment({ user: user.id })
  }
  static async getCommentById(id) {
    return CommentModel.findById(id)
      .populate([
        {
          path: "user",
          select: {
            password: 0,
            token: 0,
            resetPassword: 0
          }
        },
        {
          path: "artile"
        }
      ])
      .sort({ created_at: -1 })
  }

  static async getCommentsByArticle(article) {
    return Comment.queryComment({ article })
  }

  /*  删除该文章下的所有评论  */
  static async deleteComments(id) {
    let comments = await CommentModel.find({
      article: id
    })
    Array.from(comments, async c => {
      await c.remove()
    })
  }

  /*  通过评论类型获取评论数目  */
  static async getCommentCountByType(type) {
    return CommentModel.count({ type })
  }

  static async newAndSave(data) {
    const { user, article, type, content } = data
    let findUser = await User.getUserById(user)
    if (!findUser) {
      throw "the user id is invalid"
    }
    let hasArticle = await Article.getArticleById(article)
    if (!hasArticle) {
      throw "the artile id is invalid"
    }
    let c = new CommentModel({ user, article, type, content })
    c.floor = (await CommentModel.count({ article })) + 1
    c = await c.save()
    hasArticle.comments.push(c._id)
    await hasArticle.save()

    return Comment.getCommentById(c._id)
  }
}

/*  生成新独立评论  */
