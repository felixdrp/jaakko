import {
  ACCOUNT_REGISTER_ERROR,
  ACCOUNT_LOGIN_ERROR,
  ACCOUNT_LOG_USER,
} from '../actions/client-actions'

import {
  TASK_UPDATE_GROUP_IDEAS,
  SET_SURVEY_INITIALS,
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

export function task(state = { tasks: [], payload: {} }, action) {
  switch (action.type) {
  case TASK_UPDATE_GROUP_IDEAS:
    return { tasks: action.payload }

  case SET_SURVEY_INITIALS:
    return { payload: action.payload }

  default:
    return state
  }
}
