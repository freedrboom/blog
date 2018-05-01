import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import UserType from './user_type'

export default new GraphQLObjectType({
  name: 'Tag',
  description: '标签',
  fields: () => ({
    _id: { type: GraphQLID, description: 'id' },
    name: { type: GraphQLString, description: '标签名字' },
    //count: { type: GraphQLInt, description: '该标签下的文章数量' },
    user: { type: UserType, description: '拥有者' },
    description: { type: GraphQLString, description: '描述' },
    deleted: { type: GraphQLBoolean, description: '是否删除' }
  })
})
