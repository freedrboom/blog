import React from "react"
import { hot } from "react-hot-loader"
import { Switch, Route, withRouter } from "react-router-dom"
import { inject, observer } from "mobx-react"
import Header from "./components/Header/index"
import Article from "./pages/Article/index"
import Editor from "./pages/Editor/index"
import Login from "./pages/Login/index"
import Profile from "./pages/Profile/index"
import Register from "./pages/Register/index"
import Home from "./pages/Home/index"

import "./styles/theme.sass"

@hot(module)
export default class App extends React.Component {
  static state = {}
  static props = {}
  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/editor/:slug?" component={Editor} />
          <Route path="/article/:id" component={Article} />
          <Route path="/@:username" component={Profile} />
          <Route path="/@:username/favorites" component={Profile} />
          <Route path="/" component={Home} />
        </Switch>
      </React.Fragment>
    )
  }
}
