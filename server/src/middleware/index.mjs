import timed from "./timed"
import graphqlMounted from "./graphql-mount"

import { decodeToken, verifyToken } from "../common/sigin"
const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.response.status = e.statusCode || e.status || 500
    ctx.body = e.message || "未知错误"
  }
}

const verifyJwt = pathArr => {
  let optionPath = pathArr.map(path => path.substring(1).split("/"))
  function verityPath(path, tmpPath) {
    let pathArr = path.substring(1).split("/")
    if (pathArr.length !== tmpPath.length) {
      return false
    } else {
      return tmpPath.every((value, index) => {
        if (tmpPath[index].startsWith(":")) {
          return true
        } else {
          return tmpPath[index] === pathArr[index]
        }
      })
    }
  }
  return async (ctx, next) => {
    const { token } = ctx.query
    if (optionPath.some(value => verityPath(ctx.path, value)))
      if (!await verifyToken(token)) {
        ctx.throw(401, "令牌失效")
      } else {
        ctx.userInfo = await decodeToken(token)
      }
    return next()
  }
}
//query path params
const jsonp = async (ctx, next) => {
  await next()
  if (ctx.params.hasOwnProperty("callback") && ctx.method === "GET") {
    let { callback = "callback" } = ctx.params
    ctx.body = `;${callback}(${JSON.stringify(ctx.body)})`
    ctx.type = "text/javascript"
  }
}
/*
　１　简单请求
    －　method:GET,HEAD,POST
    －　请求头无自定义头
    －　Content-Type:text/plain  multipart/form-data  application/x-www-form-urlencoded

  2 非简单请求
  －　method为put,delete的ajax请求
  －　发送json格式的ajax请求
  －　带自定义头的ajax请求

３　OPTION预检命令以及预检命令的缓存

４　带cookies的ajax：withCredentials

隐藏跨域，反向代理

location /apis { rewrite ^.+apis/?(.*)$ /$1 break; include uwsgi_params; proxy_pass http://e.apix.cn; }

*/
const cors = async (ctx, next) => {
  ctx.set("Access-Control-Allow-Credentials", "true") //允许带cookies
  ctx.set("Access-Control-Allow-Origin", ctx.header.origin) //*可以设定允许跨域，但当要带cookies时必须全匹配，否则不能通过
  ctx.set(
    "Access-Control-Allow-Headers",
    ctx.header["access-control-request-headers"]
  ) //"Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild",
  ctx.set("Access-Control-Allow-Methods", "*") //"PUT, POST, GET, DELETE, OPTIONS"
  if (ctx.method == "OPTIONS") {
    ctx.set("Access-Control-Max-Age", 36000) //预检缓存Access-Control-Max-Age
    ctx.status = 200
  } else {
    return next()
  }
}
export { timed, graphqlMounted, errorHandler, verifyJwt, jsonp, cors }
