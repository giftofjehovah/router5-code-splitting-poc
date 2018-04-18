import React, { Component } from 'react'
import logo from './logo.svg'
import { connect } from 'react-redux'
import './App.css'
import { withRoute, Link } from 'react-router5'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link routeName='home'>Home</Link>
        <button onClick={() => this.props.router.navigate('user')}> User </button>
      </div>
    )
  }
}

export default withRoute(connect()(App))
