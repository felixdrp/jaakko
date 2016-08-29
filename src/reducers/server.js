
import {
  ACCOUNTS_ADD,
  ACCOUNTS_UPDATE,
  ACCOUNTS_REMOVE,

  GROUPS_ADD,
  GROUPS_REMOVE,
  GROUPS_ADD_ACCOUNT,
  GROUPS_REMOVE_ACCOUNT,
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
      state[payload.groupId] = payload.list || []
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
      if ( state[payload.groupId].indexOf(payload.account) !== -1 ) {
        return state
      }
      state[payload.groupId].push(payload.account)
      return state
    case GROUPS_REMOVE_ACCOUNT:
      // Check if account is already in list
      if ( state[payload.groupId].includes(payload.account) ) {
        // Remove from list
        state[payload.groupId].splice( state[payload.groupId].indexOf(payload.account), 1 )
      }
      return state
    default:
      return state
  }
}

//
// const initialState = [
//   {
//     text: 'Use Redux',
//     completed: false,
//     id: 0
//   }
// ]

// export default function todos(state = initialState, action) {
//   switch (action.type) {
//     case REGISTER_ACCOUNT:
//       return [
//         {
//           id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
//           completed: false,
//           text: action.text
//         },
//         ...state
//       ]
//
//     default:
//       return state
//   }
// }
