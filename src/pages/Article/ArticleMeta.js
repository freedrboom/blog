// import ArticleActions from "./ArticleActions"
import { Link } from "react-router-dom"
import React from "react"
import { observer } from "mobx-react"

import "./Articlemeta.sass"

const ArticleMeta = observer(props => {
  const user = props.user
  return (
    <section className="article-meta">
      <Link to={`/@${user._id}`}>
        <img className="avatar" src={user.avatar} alt="" />
      </Link>

      <div className="info">
        <Link to={`/@${user._id}`} className="author">
          {user.account}
        </Link>
        <span className="date">{new Date().toDateString()}</span>
      </div>

      {/* <ArticleActions
        canModify={props.canModify}
        article={article}
        onDelete={props.onDelete}
      /> */}
    </section>
  )
})

export default ArticleMeta
