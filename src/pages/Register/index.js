import React from "react"
import { Link } from "react-router-dom"

import "./style.sass"

const Register = props => {
  return (
    <section id="register-section">
      <div className="group">
        <input id="user" type="text" className="input" placeholder="account" />
        <label for="user" className="label">
          用户名
        </label>
      </div>
      <div className="group">
        <input
          id="email"
          type="text"
          className="input"
          data-type="password"
          placeholder="email"
        />
        <label for="email" className="label">
          邮箱
        </label>
      </div>
      <div className="group">
        <input
          id="pass"
          type="password"
          className="input"
          data-type="password"
          placeholder="password"
        />
        <label for="pass" className="label">
          密码
        </label>
      </div>
      <button type="button" className="login">
        注册
      </button>
    </section>
  )
}
export default Register
