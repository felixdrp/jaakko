'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accounts = accounts;
exports.groups = groups;

var _actions = require('../actions/actions');

/*
 * reducers
 */

function accounts() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? { list: [] } : arguments[0];
  var action = arguments[1];

  var payload = action.payload || '';
  switch (action.type) {
    case _actions.ACCOUNTS_ADD:
      // Check if account is already in list
      if (state[payload.email]) {
        return state;
      }
      // Add to the list
      state.list.push(payload.email);
      // state[payload.email] = JSON.parse(JSON.stringify( payload ))
      state[payload.email] = payload;
      return state;
    case _actions.ACCOUNTS_UPDATE:
      // Check if account is already in list
      if (state[payload.email]) {
        state[payload.email] = payload;
        return state;
      }
      return state;
    case _actions.ACCOUNTS_REMOVE:
      // Check if account is already in list
      if (state[payload.email]) {
        // Remove from list
        state.list.splice(state.list.indexOf(payload.email), 1);
        // Remove object
        delete state[payload.email];
        return state;
      }
      return state;
    default:
      return state;
  }
}

function groups() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? { list: [] } : arguments[0];
  var action = arguments[1];

  // let payload = !!action && action.payload || ''
  var payload = action.payload || '';

  switch (action.type) {
    case _actions.GROUPS_ADD:
      // Check if account is already in list
      if (state[payload.groupId]) {
        return state;
      }
      // Add to the list
      state.list.push(payload.groupId);
      state[payload.groupId] = {
        accountList: payload.list || [],
        type: payload.type || 0
      };
      return state;
    case _actions.GROUPS_REMOVE:
      // Check if account is already in list
      if (state[payload.groupId]) {
        // Remove from list
        state.list.splice(state.list.indexOf(payload.groupId), 1);
        // Remove object
        delete state[payload.groupId];
        return state;
      }
      return state;
    case _actions.GROUPS_ADD_ACCOUNT:
      // Check if account is already in list
      // console.log(payload)
      // console.log(state[payload.groupId].indexOf(payload.account))
      if (state[payload.groupId].accountList.indexOf(payload.account) !== -1) {
        return state;
      }
      state[payload.groupId].accountList.push(payload.account);
      return state;
    case _actions.GROUPS_REMOVE_ACCOUNT:
      // Check if account is already in list
      if (state[payload.groupId].accountList.includes(payload.account)) {
        // Remove from list
        state[payload.groupId].accountList.splice(state[payload.groupId].accountList.indexOf(payload.account), 1);
      }
      return state;
    default:
      return state;
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
//# sourceMappingURL=server.js.map
