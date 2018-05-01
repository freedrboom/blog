import requests from './request'

const encode = encodeURIComponent

const limit = (count = 1, p = 0) => `limit=${count}&offset=${p}`
const omitSlug = article => Object.assign({}, article, { slug: undefined })

export default {
  all: (page, lim = 10) => requests.get(`/articles?${limit(lim, page)}`),
  byAuthor: (author, page, query) =>
    requests.get(`/articles?author=${author}&${limit(5, page)}`),
  byTag: (tag, page, lim = 10) =>
    requests.get(`/articles?tag=${tag}&${limit(lim, page)}`),
  del: slug => requests.del(`/articles/${slug}`),
  get: slug => requests.get(`/articles/${slug}`),
  update: article =>
    requests.put(`/articles/${article._id}`, { article: omitSlug(article) }),
  create: article => requests.post('/articles', { article }),
}
