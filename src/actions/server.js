// SErver actions

// Register a new account in the db and add to the account list
export const REGISTER_ACCOUNT = 'REGISTER_ACCOUNT'

// Check the account and add to the account list
export const LOGIN_ACCOUNT = 'LOGIN_ACCOUNT'

export const SEND_ALL_MESSAGE = 'SEND_GROUP_MESSAGE'
export const SEND_GROUP_MESSAGE = 'SEND_GROUP_MESSAGE'
export const SEND_ACCOUNT_MESSAGE = 'SEND_ACCOUNT_MESSAGE'

// Create a group of accounts
export const GROUP_CREATE = 'GROUP_CREATE'
// Create groups autonomously 
export const GROUP_CREATE_AUTOMATIC = 'GROUP_CREATE_AUTOMATIC'

export const GROUP_ADD_ACCOUNT = 'GROUP_ADD_ACCOUNT'
export const GROUP_REMOVE_ACCOUNT = 'GROUP_REMOVE_ACCOUNT'

/*
 * action creators
 */

export function registerAccount(account) {
  return { type: REGISTER_ACCOUNT, account }
}

export function loginAccount(login) {
  return { type: LOGIN_ACCOUNT, login }
}

/*
 * reducers
 */


function account(state = [], action) {
  switch (action.type) {
  case REGISTER_ACCOUNT:
    return action.
  case LOGIN_ACCOUNT:
    return action.filter
  default:
    return state
  }
}

