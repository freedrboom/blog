import React from "react"
import { Link } from "react-router-dom"
import { inject, observer } from "mobx-react"

import "./articleReview.sass"

const FAVORITED_CLASS = "btn btn-sm btn-primary"
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary"

@inject("articlesStore")
@observer
export default class ArticlePreview extends React.Component {
  handleClickFavorite = ev => {
    ev.preventDefault()
    const { articlesStore, article } = this.props
    if (article.favorited) {
      articlesStore.unmakeFavorite(article._id)
    } else {
      articlesStore.makeFavorite(article._id)
    }
  }

  render() {
    const { article } = this.props
    const favoriteButtonClass = article.favorited
      ? FAVORITED_CLASS
      : NOT_FAVORITED_CLASS

    return (
      <div className="article-preview">
        <div className="article-meta">
          <Link to={`/@${article.user._id}`}>
            <img src={article.user.avatar} alt="" />
          </Link>

          <div className="info">
            <Link className="author" to={`/@${article.user._id}`}>
              {article.user.account}
            </Link>
            <span className="date">
              {new Date(article.created_at).toDateString()}
            </span>
          </div>

          <div className="pull-xs-right">
            <button
              className={favoriteButtonClass}
              onClick={this.handleClickFavorite}
            >
              <i className="ion-heart" /> {article.favoritesCount}
            </button>
          </div>
        </div>

        <Link to={`/article/${article._id}`} className="preview-link">
          <h3>{article.title}</h3>
          <p className="preview-content">{article.content}</p>
          <div className="preview-bottom">
            <ul className="tag-list">
              {article.tags.map((tag, index) => {
                return (
                  <li className="tag-default tag-pill tag-outline" key={index}>
                    {tag.name}
                  </li>
                )
              })}
            </ul>
          </div>
        </Link>
      </div>
    )
  }
}
