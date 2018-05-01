import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from "graphql"

import TagType from "./tag_type"
import ArticleType from "./article_type"
import CommentType from "./comment_type"

export default new GraphQLObjectType({
  name: "User",
  description: "用户信息",
  fields: () => ({
    _id: { type: GraphQLID, description: "id" },
    account: { type: GraphQLString, description: "账号" },
    password: { type: GraphQLString, description: "密码" },
    email: { type: GraphQLString, description: "邮箱" },
    subscribe: { type: GraphQLBoolean, description: "是否订阅消息邮件" },
    avatar: { type: GraphQLString, description: "头像" },
    profile: { type: GraphQLString, description: "概况" },
    resetPassword: { type: GraphQLBoolean, description: "重置密码" },
    description: { type: GraphQLString, description: "概要" },
    token: { type: GraphQLString, description: "令牌" },
    location: { type: GraphQLString, description: "位置" },
    github: { type: GraphQLString, description: "Github" },
    website: { type: GraphQLString, description: "个人网站" },
    role: { type: GraphQLInt, description: "角色" },
    created_at: {
      type: GraphQLString,
      description: "注册时间"
    },
    updated_at: {
      type: GraphQLString,
      description: "修改时间"
    },
    deleted: { type: GraphQLBoolean, description: "是否被删除" }
  })
})
