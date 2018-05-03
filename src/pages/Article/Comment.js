import DeleteButton from "./DeleteButton"
import { Link } from "react-router-dom"
import React from "react"

import "./comment.sass"

const Comment = props => {
  const comment = props.comment
  const user = comment.user
  console.log(comment, user)
  return (
    <div className="card">
      <p className="card-text">{comment.content}</p>
      <div className="card-footer">
        <Link to={`/@${user._id}`} className="comment-author">
          <img src={user.avatar} className="comment-author-img" alt="" />
        </Link>
        &nbsp;
        <Link to={`/@${user._id}`} className="comment-author">
          {user.account}
        </Link>
        <span className="date-posted">{comment.created_at}</span>
        <DeleteButton onDelete={props.onDelete} />
      </div>
    </div>
  )
}

export default Comment
