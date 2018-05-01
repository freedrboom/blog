import graphqlHTTP from 'koa-graphql'
import mount from 'koa-mount'
import schema from '../graphql'
export default mount(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    pretty: true
  })
)
