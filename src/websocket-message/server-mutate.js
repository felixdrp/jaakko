// WebSocket communications types
// look doc/server-websocket-message-system.md
import {
  MUTATE,
  QUERY,
  ACTION,

  LOGIN_ACCOUNT,
  REGISTER_ACCOUNT,
  wsLogAccount,
  wsGotoPage,
} from './server-actions'

// Redux server actions
import {
  accountsAdd,
  accountsUpdate,
  accountsRemove,

  GROUPS_ADD,
  GROUPS_REMOVE,
  GROUPS_ADD_ACCOUNT,
  GROUPS_REMOVE_ACCOUNT,
  GROUPS_SELECTED_ACCOUNTS_TO_GROUP,
  GROUPS_SELECTED_ACCOUNTS_UNASSIGN,
  GROUPS_ACCOUNTS_UNASSIGN,

  groupsAdd,
  groupsRemove,
  groupsAddAccount,
  groupsRemoveAccount,
  moveAccounFromGroup,
} from '../actions/actions'

// Redux client actions
import {
  ACCOUNT_REGISTER_ERROR,
  ACCOUNT_LOGIN_ERROR,
} from '../actions/client-actions'

// Default Input fields type and options
import { fieldsOptions } from '../config'

import { createAccount } from '../modules/account/create-account'
import { loginAccount } from '../modules/account/login-account'

/**
 * Mutate will process an asynchronous message from a client send by a websocket
 *
 * @param {Object} An object whose values correspond to:
 *                    action: Async action to process
 *                    payload: The info to process
 *                    ws: websocket that trigger the message.
 * @returns {}
 */

export default async function mutate({ action, payload, ws, store }) {
  let payloadResponse,
      result,
      account

  function reduxStoreServerAndClientRegisterAccountAndGoToWait(account) {
    let tempAccount
    // Register the user in the server store.
    store.dispatch( accountsAdd({...account, group: 'unassigned'}) )
    console.log('>>>>>state')

    // Log the account in the Client
    tempAccount = {...account, ws: undefined}
    delete tempAccount.ws
    ws.send(  wsLogAccount(account) )
    console.log('>>>>>state')

    // Go to WaitSync to start session
    ws.send(
      wsGotoPage({ url: '/survey/waitSync', options: {} })
    )
    console.log('>>>>>state')

  }

  switch (action) {
    case REGISTER_ACCOUNT:
      // Register an Account
      result = await createAccount(
        {
          firstName: payload.firstName,
          surename: payload.surename,
          email: payload.email,
          password: payload.password,
          reEnterPassword: payload.password,
        },
        fieldsOptions
      )
      if ('message' in result) {
        // Error try register again.
        // Send message of error to the client.
        console.error(result.message)
        if (
          result.message === 'The input field email not valid' ||
          result.message === 'The input field email is not a valid email'
        ) {
          payloadResponse = { email: 'The email is not valid' }
        } else if (
          result.message === 'The input field password not valid'
        ) {
          payloadResponse = { password: 'The password is not valid' }
        } else if (
          result.message === 'Email already used.'
        ) {
          payloadResponse = { email: 'Please, choose another email.' }
        }
        // Send email error
        ws.send(
          {
            type: ACTION,
            action: ACCOUNT_REGISTER_ERROR,
            payload: payloadResponse,
          }
        )
        return
      }
      // User registered!!
      //
      // To give websocket.accountCode the account email
      // Register the websocket 'ws.accountCode' with the email.
      // So we can identify the ws with the account email.
      ws.accountCode = payload.email

      account = {
        email: payload.email,
        firstName: payload.firstName,
        surename: payload.surename,
        token: result,
        ws,
      }
      reduxStoreServerAndClientRegisterAccountAndGoToWait(account)
      // Ready to asign to a group
      return true

    case LOGIN_ACCOUNT:
      // Login an Account
      result = await loginAccount({
        email: payload.email,
        password: payload.password,
      })
      console.log(result)

      if ('message' in result) {
        // Error try login.
        // Send message of error to the client.
        console.error(result.message)
        if (
          result.message === 'The input field email not valid' ||
          result.message === 'The input field email is not a valid email'
        ) {
          payloadResponse = { email: 'The email is not valid' }
        } else if (
          result.message === 'Password not valid.'
        ) {
          payloadResponse = { password: 'The password is not valid' }
        } else if (
          result.message === 'Account Email not found.'
        ) {
          payloadResponse = { email: 'Please, check email and password.' }
        }
        // Send email error
        ws.send(
          {
            type: ACTION,
            action: ACCOUNT_LOGIN_ERROR,
            payload: payloadResponse,
          }
        )
        return
      }
      // Register the websocket 'ws.accountCode' with the email.
      // So we can identify the ws with the account email.
      ws.accountCode = payload.email

      account = {
        email: payload.email,
        firstName: result.firstName,
        surename: result.surename,
        token: result.token,
        ws: ws,
      }

      console.log('>>>>>state')
      reduxStoreServerAndClientRegisterAccountAndGoToWait(account)
      console.log('>>>>>state')
      console.log(store.getState())
      // console.log('send error login')
      // console.log(ws.name +' '+ message.type + ' ' + message.payload.email)
      return true

    case GROUPS_ADD:
      store.dispatch( groupsAdd( payload.name || Date.now() ) )
      return true

    case GROUPS_REMOVE:
      result = store.getState()
      console.log('>>>>> ' + GROUPS_REMOVE)
      console.log(payload)
      console.log(store.getState())
      console.log('result.accounts[accountId]> ')
      // console.log(result.accounts[accountId])
      // Free all the accounts from group
      result.groups[payload.groupId].map(
        (accountId) => store.dispatch( accountsUpdate({ ...result.accounts[accountId], group: 'unassigned' }) )
      )
      store.dispatch( groupsRemove( payload.groupId ) )
      return true

    case GROUPS_ADD_ACCOUNT:
      return true

    case GROUPS_REMOVE_ACCOUNT:
      return true

    case GROUPS_SELECTED_ACCOUNTS_TO_GROUP:
      result = store.getState()
      payload.selected.map(
        (accountId) => {
          if ( result.accounts[accountId].group == 'unassigned' ) {
            store.dispatch( groupsAddAccount( payload.groupId, accountId ) )
            store.dispatch( accountsUpdate({ ...result.accounts[accountId], group: payload.groupId }) )
          } else {
            store.dispatch( moveAccounFromGroup( accountId, payload.groupId ) )
          }
        }
      )
      return true

    case GROUPS_SELECTED_ACCOUNTS_UNASSIGN:
      result = store.getState()
      payload.selected.map(
        (accountId) => {
          // remove account from group
          store.dispatch( groupsRemoveAccount(result.accounts[accountId].group, accountId) )
          // account to 'unassigned'
          store.dispatch( accountsUpdate({ ...result.accounts[accountId], group: 'unassigned' }) )
        }
      )
      return true

    case GROUPS_ACCOUNTS_UNASSIGN:
      result = store.getState()
      if (result.accounts[payload.accountId]) {
        // remove account from group
        store.dispatch( groupsRemoveAccount(result.accounts[payload.accountId].group, payload.accountId) )
        // account to 'unassigned'
        store.dispatch( accountsUpdate({ ...result.accounts[payload.accountId], group: 'unassigned' }) )
      }
      return true

  }
}
