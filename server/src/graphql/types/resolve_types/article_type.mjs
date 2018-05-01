import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean
} from "graphql"
import UserType from "./user_type"
import TagType from "./tag_type"
import CommentType from "./comment_type"
export default new GraphQLObjectType({
  name: "Article",
  description: "文章",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID), description: "id" },
    title: { type: GraphQLString, description: "标题" },
    content: { type: GraphQLString, description: "内容" },
    like: { type: GraphQLInt, description: "点赞" },
    hate: { type: GraphQLInt, description: "差评" },
    viewed: { type: GraphQLInt, description: "查看数" },
    release: { type: GraphQLBoolean, description: "是否发布" },
    cover: { type: GraphQLString, description: "封面" },
    created_at: { type: GraphQLString, description: "注册时间" },
    update_at: { type: GraphQLString, description: "更新时间" },
    view: { type: GraphQLString, description: "解析后的内容" },
    deleted: { type: GraphQLBoolean, description: "是吧被删除" },
    user: { type: UserType, description: "作者" },
    tags: { type: new GraphQLList(TagType), description: "标签" },
    comments: { type: new GraphQLList(CommentType), description: "" }
  })
})
