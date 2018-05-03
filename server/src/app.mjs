import koa from "koa"
import process from "process"
import connectMongoose from "./mongoose/connect_mongodb"
import router from "./restful/route" // restful router
import bodyParser from "koa-bodyparser"
import { timed, graphqlMounted, cors } from "./middleware"

export default connectMongoose
  .then(e => {
    const app = new koa()
    app
      .use(timed)
      //.use(cors)
      .use(bodyParser())
      .use(graphqlMounted)
      .use(router.routes())
      .use(router.allowedMethods())
      .listen(3000, () => {
        console.log("the server started at: localhost:3000")
      })
  })
  .catch(e => {
    console.log(e)
    process.exit()
  })
