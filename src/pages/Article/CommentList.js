import Comment from "./Comment"
import React from "react"
import { observer } from "mobx-react"

const CommentList = observer(props => {
  return (
    <div>
      {props.comments.map(comment => {
        return (
          <Comment
            comment={comment}
            slug={props.slug}
            key={comment._id}
            onDelete={props.onDelete}
          />
        )
      })}
    </div>
  )
})

export default CommentList
