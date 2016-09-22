import {
  ACCOUNT_REGISTER_ERROR,
  ACCOUNT_LOGIN_ERROR,
  ACCOUNT_LOG_USER,
} from '../actions/client-actions'

import {
  TASK_UPDATE_GROUP_IDEAS,
} from '../websocket-message/server-actions'


export function account(state = { registerStatus: {}, loginStatus: {} }, action) {
  switch (action.type) {
  case ACCOUNT_REGISTER_ERROR:
    return { registerStatus: action.payload }
  case ACCOUNT_LOGIN_ERROR:
    return { loginStatus: action.payload }
  case ACCOUNT_LOG_USER:
    if ('token' in action.payload)
      document.cookie = 'token=' + action.payload.token
    return { ...state, ...action.payload }
  default:
    return state
  }
}

export function task(state = { tasks: [] }, action) {
  switch (action.type) {
  case TASK_UPDATE_GROUP_IDEAS:
    state.tasks = action.payload
    return state

  default:
    return state
  }
}
