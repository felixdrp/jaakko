import {
  LOGIN_ACCOUNT,
  REGISTER_ACCOUNT,
} from './server-actions'
// Default Input fields type and options
import { fieldsOptions } from '../config'

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
  switch (action) {
    case REGISTER_ACCOUNT:
      // Register an Account
      let result = await createAccount(
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
      }
      // User registered!!
      // To give websocket.accountCode the account email
      ws.accountCode = payload.email
      // Register the user in the server store.

      // Ready to asign to a group
      return true
      break;
    case LOGIN_ACCOUNT:
      // Send email error
      ws.send(
        JSON.stringify(
          {
            type: 'ACTION',
            action: 'LOGIN_ERROR_BAD_EMAIL',
            payload: null,
          }
        )
      )
      // console.log('send error login')
      // console.log(ws.name +' '+ message.type + ' ' + message.payload.email)
      return true
      break;
  }
}
