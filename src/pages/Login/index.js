import React from "react"
import { Link } from "react-router-dom"

import "./style.sass"

const Login = props => {
  return (
    <section id="login-section">
      <div className="group">
        <input id="user" type="text" className="input" placeholder="account" />
        <label for="user" className="label">
          用户名
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
        <a href="https://www.baidu.com">忘记密码</a>
      </div>
      <button type="button" className="login">
        登录
      </button>
    </section>
  )
}
export default Login
