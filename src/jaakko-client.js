// *** Load react and react-dom ***
import React from 'react'
import { render } from 'react-dom'

import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware, push  } from 'react-router-redux'
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

// https://github.com/reactjs/react-router-redux
const middleware = routerMiddleware(browserHistory)

// // Create Redux store with initial state
// // const store = createStore(counterApp, initialState)

// const finalCreateStore = compose(
//   applyMiddleware(middleware)
//   // DevTools.instrument()
//   //
// )(createStore)
// const store = finalCreateStore(reducer, window.__INITIAL_STATE__)

function loginReducer(state = { loginStatus: null }, action) {
  switch (action.type) {
  case 'LOGIN_ERROR_BAD_EMAIL':
    return { loginStatus: 'EMAIL_NO_VALID' }
  case 'LOGIN_ERROR_PASSWORD_EMAIL':
    return { loginStatus: 'PASSWORD_NO_VALID' }
  default:
    return state
  }
}

const store = createStore(
  combineReducers({
    loginReducer,
    routing: routerReducer,
  }),
  initialState,
  compose(
    applyMiddleware(middleware),
  )
)
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

console.log(store.getState())
// Connection example: "wss://localhost:8008"
var ws = new WebSocket( 'wss://' + location.host )
// Facade object to use websocket
class WebSocketSimple {
  constructor(initialWebsocket) {
    this.ws = initialWebsocket
    // console.log('Initiated ')
  }

  send(data) {
    let message
    if ( typeof data === 'object' ) {
      message = JSON.stringify(event.data)
    }
    this.ws.send(message)
  }
}

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
        ws,
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

setTimeout( () => websocket.send( JSON.stringify({ type: 'MUTATE', action: 'LOGIN_ACCOUNT', payload: {email:'me@me.me', password: 'algo'} }) ), 2000)

// setTimeout( () => store.dispatch(push('/modules/example')), 3000)
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
