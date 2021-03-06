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
export const GROUPS_SELECTED_ACCOUNTS_TO_GROUP = 'GROUPS_SELECTED_ACCOUNTS_TO_GROUP'
export const GROUPS_SELECTED_ACCOUNTS_UNASSIGN = 'GROUPS_SELECTED_ACCOUNTS_UNASSIGN'
export const GROUPS_ACCOUNTS_UNASSIGN = 'GROUPS_ACCOUNTS_UNASSIGN'
export const GROUPS_AUTOMATE_CREATION = 'GROUPS_AUTOMATE_CREATION'

export function groupsAdd({groupId, type, list=[],}) {
  return { type: GROUPS_ADD, payload: { groupId, type, list } }
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

// Return a copy of the store without the cyclic web socket of the client
export function storeStateWithoutWebSocket(state) {
  let copyWithoutWS = {}
  let vervose = true
  if (vervose) {
    console.log('XXXXXXXresult')
    console.log(state)
    console.time('time1')
  }
  for(let key in state) {
    if (key == 'accounts') {
      copyWithoutWS[key] = {}
      copyWithoutWS[key].list = state[key].list
      state.accounts.list.forEach( (id) => { copyWithoutWS.accounts[id] = {...state.accounts[id], ws: null} } )
      // remove ws from accounts before send
      copyWithoutWS.accounts.list.forEach( (id) => { delete copyWithoutWS.accounts[id].ws } )
    } else {
      copyWithoutWS[key] = state[key]
    }
  }
  if (vervose) {
    console.timeEnd('time1')
    console.log(copyWithoutWS)
    console.log(state)
  }

  return copyWithoutWS
}

// Add the session information to the store
export const SESSION_DATA_ADD = 'SESSION_DATA_ADD'

export function sessionDataAdd(sessionData) {
  return { type: SESSION_DATA_ADD, payload: sessionData }
}

// Take a step on the survey for all account in the array.
export const SURVEY_STEP_ALL = 'SURVEY_STEP_ALL'

// Submit the survey info to the server to process
export const SUBMIT_SURVEY_INFO = 'SUBMIT_SURVEY_INFO'


export const STORE_SURVEY_INFO = 'STORE_SURVEY_INFO'

export function storeSurveInfo( surveyInfo ) {
  return { type: STORE_SURVEY_INFO, payload: surveyInfo }
}

export const TASK_ADD_IDEA = 'TASK_ADD_IDEA'

export function taskIdeaAdd( idea ) {
  return { type: TASK_ADD_IDEA, payload: idea }
}

export const TASK_ADD_ALL_SIMILARITIES = 'TASK_ADD_ALL_SIMILARITIES'

export function taskAddAllSimilarities( similarities ) {
  return { type: TASK_ADD_ALL_SIMILARITIES, payload: similarities }
}

export const TASK_ADD_ALL_FAVOURITES = 'TASK_ADD_ALL_FAVOURITES'

export function taskAddAllFavourites( favourites ) {
  return { type: TASK_ADD_ALL_FAVOURITES, payload: favourites }
}

export const TASK_INCREASE_POINTER = 'TASK_INCREASE_POINTER'

export function taskIncreasePointer() {
  return { type: TASK_INCREASE_POINTER }
}


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
