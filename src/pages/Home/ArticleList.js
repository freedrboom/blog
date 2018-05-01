import ArticlePreview from "./ArticlePreview"
import ListPagination from "./ListPagination"
import LoadingSpinner from "./LoadingSpinner"
import React from "react"

const ArticleList = props => {
  if (props.loading && props.articles.length === 0) {
    return <LoadingSpinner />
  }
  if (props.articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>
  }

  return (
    <React.Fragment>
      {props.articles.map((article, index) => {
        return <ArticlePreview article={article} key={index} />
      })}

      <ListPagination
        onSetPage={props.onSetPage}
        totalPagesCount={props.totalPagesCount}
        currentPage={props.currentPage}
      />
    </React.Fragment>
  )
}

export default ArticleList
