// WebSocket communications types
// look doc/server-websocket-message-system.md
import Immutable from 'immutable'

import {
  MUTATE,
  QUERY,
  ACTION,

  wsGotoPage,
  swUpdateControlRoom,
} from './server-actions'

import {
  SESSION_STATE_GET,
} from './query-actions'


// Redux server actions
import {
  // Remove the WS from a store state
  storeStateWithoutWebSocket,
  groupsAdd,
  groupsRemove,
  groupsAddAccount,
  groupsRemoveAccount,
  moveAccounFromGroup,
} from '../actions/actions'

// Redux client actions
import {
  // ACCOUNT_REGISTER_ERROR,
  // ACCOUNT_LOGIN_ERROR,
} from '../actions/client-actions'

/**
 * Query will process an asynchronous message from a client send by a websocket
 *
 * @param {Object} An object whose values correspond to:
 *                    action: Async action to process
 *                    payload: The info to process
 *                    ws: websocket that trigger the message.
 * @returns {}
 */

export default async function query({ action, payload, ws, store }) {
  let payloadResponse,
      result,
      account

  switch (action) {
    case SESSION_STATE_GET:
      // update state in components ControlRoom socket action creator
      payloadResponse = storeStateWithoutWebSocket( store.getState() )

      ws.send(
        swUpdateControlRoom(payloadResponse)
      )
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
      break;
  }
}
