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
      temp = {}
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
        case INSTRUCTIONS:
          temp.payload = result.session.surveyPath[
            temp.account.surveyPointer
          ].payload

          ws.send(
            swSetSurveyInitials( temp.payload )
          )

          return
        case SIMILARITIES:
          // debugger
          if ( result.groups.list.indexOf(temp.account.group) + 1 >= result.groups.list.length ) {
            temp.payload = {
              group: result.groups.list[0],
              groupType: result.groups[ result.groups.list[0] ].type,
              ideas: result.task.taskList[ result.task.taskPointer ].filter(
                element => result.groups.list[0] == element.group
              ),
            }
          } else {
            temp.selectedGroup = result.groups.list[ result.groups.list.indexOf(temp.account.group) + 1 ]
            temp.payload = {
              group: temp.selectedGroup,
              groupType: result.groups[ temp.selectedGroup ].type,
              ideas: result.task.taskList[ result.task.taskPointer ].filter(
                element => temp.selectedGroup == element.group
              ),
            }
          }

          console.log('SIMILARITIES SIMILARITIES SIMILARITIES SIMILARITIES SIMILARITIES SIMILARITIES')
          console.log(temp.payload)

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
              ideas: result.task.similarList[ result.task.taskPointer ].filter(
                element => temp.selectedGroup == element.group
              ),
            }
          } else {
            temp.selectedGroup = result.groups.list[ result.groups.list.indexOf(temp.account.group) - 1 ]
            temp.payload = {
              group: temp.selectedGroup,
              groupType: result.groups[ temp.selectedGroup ].type,
              ideas: result.task.similarList[ result.task.taskPointer ].filter(
                element => temp.selectedGroup == element.group
              ),
            }
          }

          console.log('FAVOURITES FAVOURITES FAVOURITES FAVOURITES FAVOURITES FAVOURITES')
          console.log(temp.payload)

          ws.send(
            swSetSurveyInitials( temp.payload )
          )
          return

        case RESULTS:
          try {

            console.log('PRE PRE RESULTS RESULTS RESULTS RESULTS RESULTS RESULTS')
            result = storeStateWithoutWebSocket( result )
            temp.payload = {
              group: temp.account.group,
              groupType: result.groups[ temp.account.group ].type,
              accounts: result.accounts,
              ideas: result.task.favouritList[ result.task.taskPointer ].filter(
                element => temp.account.group == element.group
              ),
            }

            console.log('RESULTS RESULTS RESULTS RESULTS RESULTS RESULTS')
            console.log(temp.payload)

            ws.send(
              swSetSurveyInitials( temp.payload )
            )
            return

          } catch (e ) {
            console.log("CAGADA: "+e)
          }
          return

        case MATH_RESULTS:
          try {
            console.log('PRE PRE MATH_MATH_RESULTS MATH_MATH_RESULTS MATH_MATH_RESULTS MATH_MATH_RESULTS MATH_MATH_RESULTS MATH_MATH_RESULTS')
            result = storeStateWithoutWebSocket( result )
            temp.mathPointer = result.session.surveyPath.findIndex(
              element => element.type == MATH_CHALLENGE
            )

            temp.payload = {
              group: temp.account.group,
              groupType: result.groups[ temp.account.group ].type,
              accounts: result.accounts,
              mathResults: result.results.surveyInfo.filter(
                element => (temp.mathPointer == element.surveyId) && (temp.account.group == element.groupId)
              ),
            }

            console.log('MATH_RESULTS MATH_RESULTS MATH_RESULTS MATH_RESULTS MATH_RESULTS MATH_RESULTS')
            console.log(temp.payload)

            ws.send(
              swSetSurveyInitials( temp.payload )
            )
            return

          } catch (e ) {
            console.log("CAGADA: "+e)
          }
          return
        default:

      }

      console.log('SESSION_STATE_GET return!!!')
      return
  }
}
