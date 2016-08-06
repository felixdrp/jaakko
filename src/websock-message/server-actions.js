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
export function registerAccount({email, password}) {
  return {
    type: MUTATE,
    action: LOGIN_ACCOUNT,
    payload: {
      email,
      password
    }
  }
}
