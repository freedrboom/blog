import React from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"
import { useStrict } from "mobx"
import { Provider } from "mobx-react"
import stores from "./store"
import App from "./App"
import promiseFinally from "promise.prototype.finally"
import "./assets/favicon.ico"

// For easier debugging
window._____APP_STATE_____ = stores

promiseFinally.shim()
//useStrict(true)

// import "./assets/normalize.css"

ReactDOM.render(
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
)
