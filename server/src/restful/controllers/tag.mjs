import { Tag } from "../../mongoose/proxy"

export const addTag = async (ctx, next) => {
  const { user, name, description } = ctx.request.body
  const data = { user, name, description }
  try {
    const newComment = await Tag.newAndSave(data)
    const addedComment = await Tag.getCommentById(newComment.id)
    if (!addedComment) {
      throw new Error("服务器内部错误")
    }
    ctx.body = addedComment
  } catch (err) {
    ctx.throw(500, err.message)
  }
}

export const getTagsByArticle = async (ctx, next) => {
  const { article } = ctx.request.body
  try {
    const tempTags = await Tag.getTagsByArticle(article)
    if (!tempTags) {
      throw new Error("找不到")
    }
    ctx.body = tempTags
  } catch (e) {
    ctx.throw(500, err.message)
  }
}

export const getTagsByUser = async (ctx, next) => {
  const { user } = ctx.request.body
  try {
    const tempTags = await Tag.queryTag({ user })
    if (!tempTags) {
      throw new Error("找不到")
    }
    ctx.body = tempTags
  } catch (e) {
    ctx.throw(500, err.message)
  }
}
