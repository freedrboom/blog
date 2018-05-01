import React from "react"
import { Link } from "react-router-dom"
import ArticleMeta from "./ArticleMeta"
import marked from "marked"
import CommentContainer from "./CommentContainer"
import { inject, observer } from "mobx-react"
import { withRouter } from "react-router-dom"
// import RedError from '../RedError';

import "./index.sass"

@inject("articlesStore")
@withRouter
@observer
export default class Article extends React.Component {
  componentDidMount() {
    const slug = this.props.match.params.id
    this.props.articlesStore.loadArticle(slug, { acceptCached: true })
  }

  handleDeleteArticle = slug => {
    this.props.articlesStore
      .deleteArticle(slug)
      .then(() => this.props.history.replace("/"))
  }

  handleDeleteComment = id => {
    // this.props.commentsStore.deleteComment(id)
  }

  render() {
    const slug = this.props.match.params.id

    const article = this.props.articlesStore.getArticle(slug)
    const currentUser = null
    if (!article)
      return <div message="Can't load article">Can't load article</div>
    const { comments } = article
    const markup = { __html: marked(article.content) }
    console.log(markup)
    return (
      <div className="article-page">
        <div className="banner">
          <h1>{article.title}</h1>
          <ArticleMeta user={article.user} />
        </div>

        <div dangerouslySetInnerHTML={markup} />
        <ul className="tag-list">
          {article.tags.map(tag => {
            return (
              <li className="tag-default tag-pill tag-outline" key={tag._id}>
                {tag.name}
              </li>
            )
          })}
        </ul>

        <hr />
        <CommentContainer comments={article.comments} slug={article._id} />
      </div>
    )
  }
}
