import React from "react"
import { Link } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner"

import "./tags.sass"
const Tags = props => {
  const tags = props.tags
  if (tags) {
    return (
      <div className="tag-list">
        {tags.map((tag, index) => {
          return (
            <Link
              to={{
                pathname: "/",
                search: "?tab=tag&tag=" + tag._id
              }}
              className="tag-pill"
              key={index}
            >
              {tag.name}
            </Link>
          )
        })}
      </div>
    )
  } else {
    return <LoadingSpinner />
  }
}

export default Tags
