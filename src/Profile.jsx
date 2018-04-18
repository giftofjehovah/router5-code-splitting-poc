import React, { Component } from 'react'
import logo from './logo.svg'
import { connect } from 'react-redux'
import './App.css'
import { withRoute } from 'react-router5'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to Profile</h1>
        </header>
      </div>
    )
  }
}

export default withRoute(connect()(App))
