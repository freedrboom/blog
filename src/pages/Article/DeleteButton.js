import React from "react"
const DeleteButton = props => {
  if (props.onDelete) {
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={props.onDelete} />
      </span>
    )
  }
  return null
}

export default DeleteButton
