// Send the user to a new page
import { push  } from 'react-router-redux'

// Redux client actions
import {
  // ACCOUNT_REGISTER_ERROR,
  // ACCOUNT_LOGIN_ERROR,
  ACCOUNT_LOG_USER
} from '../actions/client-actions'

// Server socket actions
// Socket action types:

export const MUTATE = 'MUTATE'
export const QUERY = 'QUERY'
export const ACTION = 'ACTION'


// Register a new account in the db and add to the account list
export const REGISTER_ACCOUNT = 'REGISTER_ACCOUNT'
// Register using socket action creator
export function registerAccount({
  firstName,
  surename,
  email,
  password,
  reEnterPassword
}) {
  return {
    type: MUTATE,
    action: REGISTER_ACCOUNT,
    payload: {
      firstName,
      surename,
      email,
      password,
      reEnterPassword,
    }
  }
}

// Check the account and add to the account list
export const LOGIN_ACCOUNT = 'LOGIN_ACCOUNT'
// Register using socket action creator
export function loginAccount({email, password}) {
  return {
    type: MUTATE,
    action: LOGIN_ACCOUNT,
    payload: {
      email,
      password
    }
  }
}

// Log the account in the client redux store
export function wsLogAccount({email, firstName, surename, token}) {
  return {
    type: ACTION,
    action: ACCOUNT_LOG_USER,
    payload: {
      email,
      firstName,
      surename,
      token,
    }
  }
}

// Goto page
export function wsGotoPage({ url, options = {} }) {
  let routerAction = push(url)
  return {
    type: ACTION,
    action: routerAction.type,
    payload: routerAction.payload
  }
}
