// WebSocket communications types
// look doc/server-websocket-message-system.md
import Immutable from 'immutable'

import {
  MUTATE,
  QUERY,
  ACTION,

  wsGotoPage,
  swUpdateControlRoom,
  swSetSurveyInitials,
} from './server-actions'

import {
  SESSION_STATE_GET,
  SURVEY_STATE_GET,
} from './query-actions'

import {
  AWAIT,
  QUESTION,
  INSTRUCTIONS,
  MATH_CHALLENGE,
  ALT_OBJECT_TASK,
  SIMILARITIES,
  FAVOURITES,
  MATH_RESULTS,
  RESULTS,
} from '../components/survey/survey-types'

// Redux server actions
import {
  // Remove the WS from a store state
  storeStateWithoutWebSocket,
  // groupsAdd,
  // groupsRemove,
  // groupsAddAccount,
  // groupsRemoveAccount,
  // moveAccounFromGroup,
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
      account,
      temp = {}

  switch (action) {
    case SESSION_STATE_GET:
      // update state in components ControlRoom socket action creator
      payloadResponse = storeStateWithoutWebSocket( store.getState() )

      ws.send(
        swUpdateControlRoom(payloadResponse)
      )
      return true

    case SURVEY_STATE_GET:
      // Send initial values to the surveys if needed
      result = store.getState()
      account = payload

      if ( !result.accounts.list.includes(account) ) {
        console.log( SURVEY_STATE_GET + ': Account not found' )
        return false
      }
      temp.account = result.accounts[account]
      temp.type = result.session.surveyPath[
        temp.account.surveyPointer
      ].type

      switch (temp.type) {
        case SIMILARITIES:
          if ( result.groups.list.indexOf(temp.account.group) + 1 >= result.groups.list.length ) {
            temp.payload = {
              group: result.groups.list[0],
              groupType: result.groups[ result.groups.list[0] ].type,
              ideas: result.task.tasks[ result.task.taskPointer ].filter(
                element => result.groups.list[0] == element.group
              ),
            }
          } else {
            temp.selectedGroup = result.groups.list[ result.groups.list.indexOf(temp.account.group) + 1 ]
            temp.payload = {
              group: temp.selectedGroup,
              groupType: result.groups[ temp.selectedGroup ].type,
              ideas: result.task.tasks[ result.task.taskPointer ].filter(
                element => temp.selectedGroup == element.group
              ),
            }
          }

          ws.send(
            swSetSurveyInitials( temp.payload )
          )

          return

        case FAVOURITES:
          if ( result.groups.list.indexOf(temp.account.group) - 1 < 0 ) {
            temp.selectedGroup = result.groups.list[ result.groups.list.length - 1 ]
            temp.payload = {
              group: temp.selectedGroup,
              groupType: result.groups[ temp.selectedGroup ].type,
              ideas: result.task.tasks[ result.task.taskPointer ].filter(
                element => temp.selectedGroup == element.group
              ),
            }
          } else {
            temp.selectedGroup = result.groups.list[ result.groups.list.indexOf(temp.account.group) - 1 ]
            temp.payload = {
              group: temp.selectedGroup,
              groupType: result.groups[ temp.selectedGroup ].type,
              ideas: result.task.tasks[ result.task.taskPointer ].filter(
                element => temp.selectedGroup == element.group
              ),
            }
          }

          ws.send(
            swSetSurveyInitials( temp.payload )
          )

          return

        case RESULTS:
          ws.send(
            swSetSurveyInitials( temp.payload )
          )

          return

        default:

      }

      console.log('SESSION_STATE_GET return!!!')
      return
  }
}
