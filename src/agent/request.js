import superagentPromise from "superagent-promise"
import _superagent from "superagent"

const superagent = superagentPromise(_superagent, global.Promise)
//const API_ROOT = "http://207.148.27.201:3000/resetful"
const API_ROOT = "https://apimu.freedrb.org/resetful"
//const API_ROOT = 'http://127.0.0.1:3000/resetful'
const handleErrors = err => {
  // if (err && err.response && err.response.status === 401) {
  //   authStore.logout()
  // }
  return err
}

const responseBody = res => res.body

const tokenPlugin = req => {
  // if (commonStore.token) {
  //   req.set("authorization", `Token ${commonStore.token}`)
  // }
  // req.set('authorization', `Token ${'commonStore.token'}`)
  // req.set('authorization1', `Token ${'commonStore.token'}`)
}

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
}

export default requests
