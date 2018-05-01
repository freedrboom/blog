import userQueries from './user_queries'
import tagQueries from './tag_queries'
import commentQueries from './comment_queries'
import articleQueries from './article_queries'

export default {
  ...userQueries,
  ...tagQueries,
  ...commentQueries,
  ...articleQueries
}
