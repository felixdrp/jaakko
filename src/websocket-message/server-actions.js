// Send the user to a new page
import { push  } from 'react-router-redux'

// Redux client actions
import {
  // ACCOUNT_REGISTER_ERROR,
  // ACCOUNT_LOGIN_ERROR,
  ACCOUNT_LOG_USER
} from '../actions/client-actions'

import {
  GROUPS_ADD,
  GROUPS_REMOVE,
  GROUPS_ADD_ACCOUNT,
  GROUPS_REMOVE_ACCOUNT,
  GROUPS_SELECTED_ACCOUNTS_TO_GROUP,
  GROUPS_SELECTED_ACCOUNTS_UNASSIGN,
  GROUPS_ACCOUNTS_UNASSIGN,
  GROUPS_AUTOMATE_CREATION,

  SURVEY_STEP_ALL,
} from '../actions/actions'

import {
  SESSION_STATE_GET
} from './query-actions'

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


// Register a group socket action creator
export function wsGroupAdd(obj) {
  let name = (obj && 'name' in obj)? obj.name : '';
  return {
    type: MUTATE,
    action: GROUPS_ADD,
    payload: {
      name,
    }
  }
}

// Remove a group socket action creator
export function wsGroupRemove(groupId) {
  return {
    type: MUTATE,
    action: GROUPS_REMOVE,
    payload: {
      groupId,
    }
  }
}

// Register selected accounts to a group socket action creator
export function wsAssignSelectedAccountsToGroup( groupId, selected = [] ) {
  return {
    type: MUTATE,
    action: GROUPS_SELECTED_ACCOUNTS_TO_GROUP,
    payload: {
      groupId,
      selected,
    }
  }
}

export function wsUnassignSelectedAccounts(selected = [] ) {
  return {
    type: MUTATE,
    action: GROUPS_SELECTED_ACCOUNTS_UNASSIGN,
    payload: {
      selected,
    }
  }
}

export function wsUnassignAccount(accountId) {
  return {
    type: MUTATE,
    action: GROUPS_ACCOUNTS_UNASSIGN,
    payload: {
      accountId,
    }
  }
}

export function wsAutomateGroupsCreation(numberOfGroups) {
  return {
    type: MUTATE,
    action: GROUPS_AUTOMATE_CREATION,
    payload: {
      numberOfGroups,
    }
  }
}

// update state in components ControlRoom socket action creator
export function swUpdateControlRoom(state) {
  return {
    type: ACTION,
    action: SESSION_STATE_GET,
    payload: state,
  }
}

// update state in components ControlRoom socket action creator
export function wsSurveyStepAll(accountList) {
  return {
    type: MUTATE,
    action: SURVEY_STEP_ALL,
    payload: accountList,
  }
}
