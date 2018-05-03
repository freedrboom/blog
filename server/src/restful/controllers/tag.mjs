import { Tag } from "../../mongoose/proxy"
import getFromObject from "../../common/utils"
const addTag = async (ctx, next) => {
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

const queryTag = async (ctx, next) => {
  const data = getFromObject(ctx.request.body, ["user", "name"])
  try {
    const tempTags = await Tag.queryTag(data)
    if (!tempTags) {
      throw new Error("找不到")
    }
    ctx.body = tempTags
  } catch (e) {
    ctx.throw(500, err.message)
  }
}
export { addTag, queryTag }
