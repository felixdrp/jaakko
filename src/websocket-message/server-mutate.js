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
      result

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

      // Register the user in the server store.

      // Log the account in the Client
      ws.send(
        wsLogAccount({
          email: payload.email,
          firstName: payload.firstName,
          surename: payload.surename,
          token: result,
        })
      )
      // Ready to asign to a group
      return true
      break;

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

      // Log the account in the Client
      ws.send(
        wsLogAccount({
          email: payload.email,
          firstName: result.firstName,
          surename: result.surename,
          token: result.token,
        })
      )

      ws.send(
        wsGotoPage({ url: '/survey/waitSync', options: {} })
      )


      // console.log('send error login')
      // console.log(ws.name +' '+ message.type + ' ' + message.payload.email)
      return true
      break;
  }
}
