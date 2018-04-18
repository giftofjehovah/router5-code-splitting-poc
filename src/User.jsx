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
          <h1 className='App-title'>Welcome to User</h1>
        </header>
        <Link routeName='profile'>Profile</Link>
        <Link routeName='wall'>Wall</Link>
      </div>
    )
  }
}

export default withRoute(connect()(App))
