// SErver actions

// Register a new account in the db and add to the account list
export const REGISTER_ACCOUNT = 'REGISTER_ACCOUNT'

// Check the account and add to the account list
export const LOGIN_ACCOUNT = 'LOGIN_ACCOUNT'

export function registerAccount(account) {
  return { type: REGISTER_ACCOUNT, account }
}

export function loginAccount(login) {
  return { type: LOGIN_ACCOUNT, login }
}


// Redux: Admin accounts in the server
export const ACCOUNTS_ADD = 'ACCOUNTS_ADD'
export const ACCOUNTS_UPDATE = 'ACCOUNTS_UPDATE'
export const ACCOUNTS_REMOVE = 'ACCOUNTS_REMOVE'

export function accountsAdd(account) {
  return { type: ACCOUNTS_ADD, payload: account }
}
export function accountsUpdate(account) {
  return { type: ACCOUNTS_UPDATE, payload: account }
}
export function accountsRemove(account) {
  return { type: ACCOUNTS_REMOVE, payload: account }
}

// Create a group of accounts
export const GROUPS_ADD = 'GROUPS_ADD'
export const GROUPS_REMOVE = 'GROUPS_REMOVE'

export const GROUPS_ADD_ACCOUNT = 'GROUPS_ADD_ACCOUNT'
export const GROUPS_REMOVE_ACCOUNT = 'GROUPS_REMOVE_ACCOUNT'

export function groupsAdd(groupId, list=[]) {
  return { type: GROUPS_ADD, payload: { groupId, list } }
}
export function groupsRemove(groupId) {
  return { type: GROUPS_REMOVE, payload: { groupId } }
}

export function groupsAddAccount(groupId, account) {
  return { type: GROUPS_ADD_ACCOUNT, payload: { groupId, account } }
}
// export function groupsUpdateAccount((groupId, account) {
//   return { type: ACCOUNTS_UPDATE, payload: account }
// }
export function groupsRemoveAccount(groupId, account) {
  return { type: GROUPS_REMOVE_ACCOUNT, payload: { groupId, account } }
}

// Thunk, to move an account betwen groups.
export function moveAccounFromGroup(accounId, toGroup) {
  return (dispatch, getState) => {
    // cState = current state
    let cState = getState()
    if (!cState.accounts[accounId]) {
      console.log('Account not found')
      console.log(cState)

      return
    }

    if (cState.accounts[accounId].group) {
      // Remove account from it the actual group
      dispatch(
        groupsRemoveAccount(cState.accounts[accounId].group, accounId)
      )
    }
    // Add the group to the account
    dispatch( accountsUpdate({ ...cState.accounts[accounId], group: toGroup}) )
    // Add the account to the group
    dispatch( groupsAddAccount(toGroup, accounId) )
  }
}

export const SEND_ALL_MESSAGE = 'SEND_GROUP_MESSAGE'
export const SEND_GROUP_MESSAGE = 'SEND_GROUP_MESSAGE'
export const SEND_ACCOUNT_MESSAGE = 'SEND_ACCOUNT_MESSAGE'


/*
 * action creators
 */


export const WAIT = 'WAIT'
export const CONTINUE = 'CONTINUE'

export function synchronize( action ) {
  switch (action) {
    case 'wait':
    case 'await':
      return { type: WAIT }
    case 'continue':
      return { type: CONTINUE }
    default:
      return { type: WAIT }
  }
}
