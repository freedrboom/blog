import requests from "./request"
const encode = encodeURIComponent

const Tags = {
  getAll: () => requests.get("/tags"),
  create: tag => requests.post(`/tags`, { tag }),
  update: tag => requests.put("/tags", { tag }),
}

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`
const omitSlug = article => Object.assign({}, article, { slug: undefined })

const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
}

const Profile = {
  follow: username => requests.post(`/profiles/${username}/follow`),
  get: username => requests.get(`/profiles/${username}`),
  unfollow: username => requests.del(`/profiles/${username}/follow`),
}

export { Comments, Profile, Tags }
