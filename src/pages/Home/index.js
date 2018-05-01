import "./Home.sass"
/*
import React from "react"
import PropTypes from "prop-types"

class Home extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
  }

  state = {
    welcomeText: "Hello world",
  }

  render() {
    const { welcomeText } = this.state
    const { username } = this.props

    return (
      <div>
        <h1 className="welcome">
          {welcomeText}
          <span className="username">{`:world`}</span>
        </h1>
      </div>
    )
  }
}

export default Home
*/

import Banner from "./Banner"
import MainView from "./MainView"
import React from "react"
import Tags from "./Tags"
import { inject, observer } from "mobx-react"
import { withRouter } from "react-router-dom"

// @inject("commonStore")
@withRouter
@observer
export default class Home extends React.Component {
  componentDidMount() {
    // this.props.commonStore.loadTags()
  }

  render() {
    //const { tags, token, appName } = this.props.commonStore
    const { tags, token, appName } = {
      tags: [{ id: 12, name: "dswerwrfdgdfgfd" }, { name: "dsfsf", id: 23 }],
      koken: "sdfsfs",
      appName: "lzm"
    }
    return (
      <div className="home-page">
        <Banner token={token} appName={appName} />
        <div className="container-page">
          <div className="mainView">
            <MainView />
          </div>
          <div className="sidebar">
            <p>Popular Tags</p>
            <Tags tags={tags} />
          </div>
        </div>
      </div>
    )
  }
}
