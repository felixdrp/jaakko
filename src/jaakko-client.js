// *** Load react and react-dom ***
import React from 'react'
import { render } from 'react-dom'

import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routeActions  } from 'react-router-redux'
import Routes from './routes';
import { createHistory } from 'history';

// console.log(Object.keys(reactRR))
// *** Load store reducers ***
// import topicListPage from './reducers/topic-list-reducer'

// The initial state from server-generated HTML
// have a look to server code.
const initialState = window.__INITIAL_STATE__ || {}

// // https://github.com/rackt/history/blob/master/docs/GettingStarted.md
// const history = createHistory()

// https://github.com/rackt/react-router-redux/blob/master/examples/basic/app.js
// const middleware = syncHistory(history)
// const reducer = combineReducers({
//   // topicListPage,
//   routing: routeReducer
// })

// // Create Redux store with initial state
// // const store = createStore(counterApp, initialState)

// const finalCreateStore = compose(
//   applyMiddleware(middleware)
//   // DevTools.instrument()
//   //
// )(createStore)
// const store = finalCreateStore(reducer, window.__INITIAL_STATE__)
const store = createStore(
  combineReducers({
    // topicListPage,
    routing: routerReducer
  }),
  initialState
)
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

console.log(store.getState())

render(
  <Provider store={store}>
    {Routes( history )}
  </Provider>,
  document.getElementById('app')
)
