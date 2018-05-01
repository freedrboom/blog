import React from "react"

import "./banner.sass"

const Banner = ({ appName, token }) => {
  if (token) {
    return null
  }
  return (
    <div className="banner">
      <h1 className="logo-font">{appName.toLowerCase()}</h1>
      <p>A place to share your knowledge.</p>
    </div>
  )
}

export default Banner
