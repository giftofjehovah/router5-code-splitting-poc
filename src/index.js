import React from 'react'
import ReactDOM from 'react-dom'
import { RouterProvider } from 'react-router5'
import { router5Reducer, router5Middleware } from 'redux-router5'
import createRouter from 'router5'
import browserPlugin from 'router5/plugins/browser'
import listenersPlugin from 'router5/plugins/listeners'

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'

import './index.css'
import Root from './Root'
import registerServiceWorker from './registerServiceWorker'

const routes = [
  { name: 'app', path: '/' },
  { name: 'home', path: '/home', loadComponent: () => import('./Home') },
  { name: 'profile', path: '/profile', loadComponent: () => import('./Profile') },
  { name: 'wall', path: '/wall', loadComponent: () => import('./Wall') },
  {
    name: 'user',
    path: '/user',
    related: ['profile', 'wall'],
    loadComponent: () => import('./User')
  }
]

const onRouteActivateMiddleware = routes => (router, dependencies) => (toState, fromState, done) => {
  const nextRoute = routes.find(route => route.name === toState.name)
  if (nextRoute && nextRoute.loadComponent) {
    return nextRoute
      .loadComponent()
      .then(c => {
        console.log(`loaded ${nextRoute.name} component`)
        return { ...toState, component: c }
      })
      .catch(err => console.log(err))
  }
  done()
}

const preloadRelated = routes => (router, dependencies) => (toState, fromState, done) => {
  const nextRoute = routes.find(route => route.name === toState.name)
  if (nextRoute && nextRoute.related) {
    const allCompToLoad = nextRoute.related.map(related => routes.find(route => route.name === related).loadComponent())
    return Promise.all(allCompToLoad)
      .then(c => {
        console.log(`loaded ${nextRoute.related.join(', ')} components`)
        return c
      })
      .catch(err => console.log(err))
  }
  done()
}

const router = createRouter(routes)
router.useMiddleware(onRouteActivateMiddleware(routes), preloadRelated(routes))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const createStoreWithMiddleware = applyMiddleware(router5Middleware(router))(createStore)
const store = createStore(
  combineReducers({
    router: router5Reducer
  }),
  composeEnhancers(applyMiddleware(router5Middleware(router)))
)
router.usePlugin(browserPlugin(), listenersPlugin())
router.start(() => {
  ReactDOM.render(
    <Provider store={store}>
      <RouterProvider router={router}>
        <Root />
      </RouterProvider>
    </Provider>,
    document.getElementById('root')
  )
})
registerServiceWorker()
