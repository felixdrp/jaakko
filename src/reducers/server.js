
import {
  ACCOUNTS_ADD,
  ACCOUNTS_UPDATE,
  ACCOUNTS_REMOVE,

  GROUPS_ADD,
  GROUPS_REMOVE,
  GROUPS_ADD_ACCOUNT,
  GROUPS_REMOVE_ACCOUNT,

  SESSION_DATA_ADD,
  STORE_SURVEY_INFO,

  TASK_ADD_IDEA,
  TASK_ADD_ALL_SIMILARITIES,
  TASK_INCREASE_POINTER,
} from '../actions/actions'

/*
 * reducers
 */

export function accounts(state = { list: [] }, action) {
  let payload = action.payload || ''
  switch (action.type) {
    case ACCOUNTS_ADD:
      // Check if account is already in list
      if (state[payload.email]) {
        return state
      }
      // Add to the list
      state.list.push(payload.email)
      // state[payload.email] = JSON.parse(JSON.stringify( payload ))
      state[payload.email] = payload
      return state
    case ACCOUNTS_UPDATE:
      // Check if account is already in list
      if (state[payload.email]) {
        state[payload.email] = payload
        return state
      }
      return state
    case ACCOUNTS_REMOVE:
      // Check if account is already in list
      if (state[payload.email]) {
        // Remove from list
        state.list.splice( state.list.indexOf(payload.email), 1 )
        // Remove object
        delete state[payload.email]
        return state
      }
      return state
    default:
      return state
  }
}

export function groups(state = { list: [] }, action) {
  // let payload = !!action && action.payload || ''
  let payload = action.payload || ''

  switch (action.type) {
    case GROUPS_ADD:
      // Check if account is already in list
      if (state[payload.groupId]) {
        return state
      }
      // Add to the list
      state.list.push(payload.groupId)
      state[payload.groupId] = {
        accountList: payload.list || [],
        type: payload.type || 0,
      }
      return state
    case GROUPS_REMOVE:
      // Check if account is already in list
      if (state[payload.groupId]) {
        // Remove from list
        state.list.splice( state.list.indexOf(payload.groupId), 1 )
        // Remove object
        delete state[payload.groupId]
        return state
      }
      return state
    case GROUPS_ADD_ACCOUNT:
      // Check if account is already in list
      // console.log(payload)
      // console.log(state[payload.groupId].indexOf(payload.account))
      if ( state[payload.groupId].accountList.indexOf(payload.account) !== -1 ) {
        return state
      }
      state[payload.groupId].accountList.push(payload.account)
      return state
    case GROUPS_REMOVE_ACCOUNT:
      // Check if account is already in list
      if ( state[payload.groupId].accountList.includes(payload.account) ) {
        // Remove from list
        state[payload.groupId].accountList.splice(
          state[payload.groupId].accountList.indexOf(payload.account),
          1
        )
      }
      return state
    default:
      return state
  }
}

export function session(state = { }, action) {
  let payload = action.payload || ''
  switch (action.type) {
    case SESSION_DATA_ADD:
      state = payload
      return state

    default:
      return state
  }
}

export function results(state = { surveyInfo: [] }, action) {
  let payload = action.payload || ''
  switch (action.type) {
    case STORE_SURVEY_INFO:
      state.surveyInfo.push(payload)
      return state

    default:
      return state
  }
}

export function task(state = { taskPointer: 0, taskList: [ [] ], similarList: [ [] ] }, action) {
  let payload = action.payload || ''
  let temp
  switch (action.type) {
    case TASK_ADD_IDEA:
      state.taskList[ state.taskPointer ].push( payload )
      return state

    case TASK_ADD_ALL_SIMILARITIES:
      temp = { ...state }
      temp.similarList[ state.taskPointer ] = payload
      return temp

    case TASK_INCREASE_POINTER:
      return { ...state, taskPointer: state.taskPointer + 1 }
    default:
      return state
  }
}
