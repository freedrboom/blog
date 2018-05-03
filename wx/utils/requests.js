import { apiPrefix } from "../data/config"
const ajax = ({
  url = "",
  method = "GET",
  header = {
    "Content-Type": "json",
  },
  data,
}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiPrefix + url,
      method,
      header,
      data,
      success: res => resolve(res.data),
      fail: error => reject(error),
    })
  })
}
export default {
  del: url => ajax({ url, method: "DELETE" }),
  get: url => ajax({ url }),
  post: url => (url, data) => ajax({ url, data, method: "POST" }),
  put: url => (url, data) => ajax({ url, data, method: "PUT" }),
}
