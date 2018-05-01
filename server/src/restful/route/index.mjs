// const user = require('./user');
// const category = require('./category');
// const post = require('./article');
// const comment = require('./comment');
// const Router = require('koa-router');
// const router = new Router();
//
// router.post('/api/post/new',post.addArticle)
//       .get('/api/post/view/:id',post.getArticleById)
//     //   .put('/api/post/modify/:id')
//     //   .get('/api/post/like/:id')
//     //   .delete('/api/post/delete/:id')
//       .get('/api/posts/list/:page',post.getAllArticles);
//
// router.post('/api/user/register',user.addUser)
//       .post('/api/user/login',user.loginWithPassword);
//
// router.post('/api/category/new',category.addCategory)
//     //   .get('/api/categorys/list')
//     //   .delete('/api/category/delete/:id');
//
// router.post('/api/comment/new',comment.addComment)
//       .get('/api/:id/comments/list',comment.getCommentsByArticleId);
//     //   .delete('/api/comment/delete/:id');
//
// module.exports=router;

import Router from "koa-router"
import articleRouter from "./article"
import tagRouter from "./tag"
import commentRouter from "./comment"
import userRouter from "./user"
const router = new Router()
const routers = [articleRouter, tagRouter, commentRouter, userRouter]
routers.forEach(element => {
  router.use("/restful", element.routes(), element.allowedMethods())
})

// router.use("/page", page.routes(), page.allowedMethods())
export default router
