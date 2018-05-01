import React from "react"
import { Link } from "react-router-dom"
import { inject, observer } from "mobx-react"

import "./style.sass"

const LoggedOutView = props => {
  let data = [
    {
      to: "/",
      label: "Home",
    },
    {
      to: "/login",
      label: "Sign in",
    },
    {
      to: "/register",
      label: "Sign up",
    },
  ].map((item, index) => (
    <li className="nav-item" key={index}>
      <Link to={item.to} className="nav-link">
        {item.label}
      </Link>
    </li>
  ))
  return <ul className="navbar-nav">{data}</ul>
}
export default LoggedOutView
