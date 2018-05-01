export default {
  port: 3000,
  session: {
    secret: 'graphql',
    key: 'graphql',
    maxAge: '2592000000'
  },
  mongodb: 'mongodb://localhost:27017/blog'
}
