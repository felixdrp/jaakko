// *** Load react and react-dom ***
import React from 'react'
import { render } from 'react-dom'

import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware, push  } from 'react-router-redux'
import Routes from './routes';
import { createHistory } from 'history';
import WebSocketSimple from './websocket-message/websocket-simple'

// console.log(Object.keys(reactRR))
// *** Load store reducers ***
import { account } from './reducers/client-reducers'

// The initial state from server-generated HTML
// have a look to server code.
const initialState = window.__INITIAL_STATE__ || {}

// // https://github.com/rackt/history/blob/master/docs/GettingStarted.md
// const history = createHistory()

// https://github.com/reactjs/react-router-redux
const middleware = routerMiddleware(browserHistory)

// // Create Redux store with initial state
const store = createStore(
  combineReducers({
    account,
    routing: routerReducer,
  }),
  initialState,
  compose(
    applyMiddleware(middleware),
    // Redux devToolsExtension
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

console.log(store.getState())
// Connection example: "wss://localhost:8008"
var ws = new WebSocket( 'wss://' + location.host )
// var websocket used to send data.
var websocket = new WebSocketSimple(ws)

// Llegan mensajes del servidor:
ws.onmessage = (event) => {
  // Check the query.
  // Process action.
  let message
  console.log( '>>>' + event.data )
  if ( /^\{.*\}$/.test(event.data) ) {
    message = JSON.parse(event.data)
  } else {
    console.log(event.data)
    return
  }
  console.log( '>>>' + JSON.stringify(event.data) )

  switch ( message.type ) {
    // Process message of type MUTATE
    case 'MUTATE':
      mutate({
        action: message.action,
        payload: message.payload,
        websocket,
        store
      })
      break
    // Process message of type QUERY
    case 'QUERY':
      console.log(message.type + ' ' + message.payload.email || '')
      break
    // Process message of type ACTIONS
    default:
      // dispatch 'ACTIONS'
      console.log(message.type + ' ' + message.payload || '')
      store.dispatch( { type: message.action, payload: message.payload } )
  }
}

// Simulate a login...
// setTimeout( () => websocket.send( { type: 'MUTATE', action: 'LOGIN_ACCOUNT', payload: {email:'me@me.me', password: 'algo'} } ), 2000)
setTimeout( () => websocket.send( { type: 'MUTATE', action: 'LOGIN_ACCOUNT', payload: {email:'felixdrp@gmail.com', password: '1234'} } ), 1000)
setTimeout( () => websocket.send( { type: 'MUTATE', action: 'LOGIN_ACCOUNT', payload: {email:'rpsoft@gmail.com', password: '1234'} } ), 1000)
// {"firstName":"Jesus","surename":"RP","email":"rpsoft@gmail.com","password":"1234","reEnterPassword":"1234"}
// Move the client to a web page...
// setTimeout( () => store.dispatch(push('/modules/example')), 3000)

// Class to pass the websocket with context to the rest of components.
class HiperApp extends React.Component {
  getChildContext() {
    return {websocket: websocket};
  }

  render() {
    return <div id='hiperApp'>{this.props.children}</div>;
  }
}

HiperApp.childContextTypes = {
    websocket: React.PropTypes.object
  }

render(
  <Provider store={store}>
    <HiperApp>
      {Routes( history )}
    </HiperApp>
  </Provider>
  ,
  document.getElementById('app')
)
