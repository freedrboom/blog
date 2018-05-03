import { User, Article } from "../../mongoose/proxy"
import getFromObject from "../../common/utils"

const addArticle = async (ctx, next) => {
  const data = getFromObject(ctx.request.body, [
    "user",
    "tags",
    "title",
    "content",
    "release",
    "cover"
  ])
  try {
    const newArtile = await Article.newAndSave(data)
    const addedArticle = await Article.getArticleById(newArtile.id)
    if (!addedArticle) {
      throw new Error("服务器内部错误")
    }
    ctx.body = addedArticle
  } catch (err) {
    ctx.throw(500, err.message)
  }
}

const getArticleById = async (ctx, next) => {
  const { id } = getFromObject(ctx.params, ["id"])
  try {
    const tempArticle = await Article.getArticleById(id)
    if (!tempArticle) {
      throw new Error("找不到")
    }
    ctx.body = tempArticle
  } catch (e) {
    ctx.throw(500, err.message)
  }
}

const removeArticleById = async (ctx, next) => {
  const { id } = getFromObject(ctx.params, ["id"])
  try {
    const tempArticle = await Article.removeArticle(id)
    ctx.body = tempArticle
  } catch (e) {
    ctx.throw(500, err.message)
  }
}

const updateArticleById = async (ctx, next) => {
  const { id } = getFromObject(ctx.params, ["id"])
  try {
    const tempArticle = await Article.updateArticle(id)
    if (!tempArticle) {
      throw new Error("找不到")
    }
    ctx.body = tempArticle
  } catch (e) {
    ctx.throw(500, err.message)
  }
}

const queryArticles = async (ctx, next) => {
  const { user } = getFromObject(ctx.query, ["user"])
  try {
    const tempArticle = await Article.queryArticle({ user })
    if (!tempArticle) {
      throw new Error("找不到")
    }
    ctx.body = tempArticle
  } catch (e) {
    ctx.throw(500, err.message)
  }
}

export {
  queryArticles,
  updateArticleById,
  removeArticleById,
  getArticleById,
  addArticle
}
