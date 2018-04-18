import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import { withRoute } from 'react-router5'
import Loadable from 'react-loadable'
import App from './App'

const createUniversalComponent = LoadedComponent =>
  Loadable({
    loader: () => Promise.resolve(LoadedComponent),
    loading: () => <div>Loading...</div>
  })

class Root extends Component {
  render () {
    const name = this.props.route.name
    switch (name) {
      case 'home':
      case 'user':
      case 'profile':
      case 'wall':
        const UniversalComponent = createUniversalComponent(this.props.route.component.default)
        return <UniversalComponent />
      default:
        return <App />
    }
  }
}

export default withRoute(connect()(Root))
