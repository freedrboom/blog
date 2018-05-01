import { User, Article } from "../../mongoose/proxy"

export const addArticle = async (ctx, next) => {
  const {
    user,
    tags,
    title,
    content,
    release = false,
    cover
  } = ctx.request.body
  const data = { user, tags, title, content, release, cover }
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

export const getArticleById = async (ctx, next) => {
  const { id } = ctx.params
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

export const getArticleByUser = async (ctx, next) => {
  const { user } = ctx.request.body
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

export const getAllArticles = async (ctx, next) => {
  const { user } = ctx.request.body
  try {
    const tempArticle = await Article.queryArticle()
    if (!tempArticle) {
      throw new Error("找不到")
    }
    ctx.body = tempArticle
  } catch (e) {
    ctx.throw(500, err.message)
  }
}
