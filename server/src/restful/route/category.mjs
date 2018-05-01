const models = require('../models/core');

const category=models.$Category;

const success = data => ({ result: true, data });
const failed  = message =>({result:false,message});

const addCategory = async(ctx)=>{
  const {name,remarks="nothing",user} = ctx.request.body;
  const data = {name,remarks,user};
  try {
    const result = await category.addCategory(data);
     ctx.body = { code: 200, data:result, msg:"ok"};
  } catch (e) {
    ctx.throw(500, '服务器内部错误-数据存储错误！');
  } finally {

  }
}

exports = module.exports = {
  addCategory,
};
