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

  TASK_IDEA_ADD,

} from './server-actions'

// Redux server actions
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
  SUBMIT_SURVEY_INFO,

  accountsAdd,
  accountsUpdate,
  accountsRemove,

  groupsAdd,
  groupsRemove,
  groupsAddAccount,
  groupsRemoveAccount,
  moveAccounFromGroup,

  storeSurveInfo,
  taskIdeaAdd,
  taskAddAllSimilarities,
  taskAddAllFavourites,
  taskIncreasePointer,
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

// Get an url from an survey-type
import {
  resolveSurveyURL,

  SIMILARITIES,
  FAVOURITES,
  RESULTS,
} from '../components/survey/survey-types'

import WebSocketSimple from './websocket-simple'

import processSimilarities from '../modules/similarity'

// import filterAccountsByGroup from '../modules/filter-accounts-by-group'


/**
 * Mutate will process an asynchronous message from a client send by a websocket
 *
 * @param {Object} An object whose values correspond to:
 *                    action: Async action to process
 *                    payload: The info to process
 *                    ws: websocket that trigger the message.
 * @returns {}
 */

export default async function mutate({ action, payload, ws, store }, clientsSocket) {
  let payloadResponse,
      result,
      account,
      temp = {}

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

    // // Go to WaitSync to start session
    // ws.send(
    //   wsGotoPage({ url: '/survey/waitSync', options: {} })
    // )

    nextStep(account.email)
    console.log('>>>>>state')
  }

  function removeGroup(groupId, store) {
    let result = store.getState()
    result.groups[groupId].accountList.map(
      (accountId) => store.dispatch( accountsUpdate({ ...result.accounts[accountId], group: 'unassigned' }) )
    )
    store.dispatch( groupsRemove( groupId ) )
  }

  function removeAccountFromGroup(accountId, store) {
    let result = store.getState()
    // remove account from group
    store.dispatch( groupsRemoveAccount(result.accounts[accountId].group, accountId) )
    // account to 'unassigned'
    store.dispatch( accountsUpdate({ ...result.accounts[accountId], group: 'unassigned' }) )
  }

  function addAccountToGroup(accountId, groupId, store) {
    let result = store.getState()
    if ( result.accounts[accountId].group == 'unassigned' ) {
      store.dispatch( groupsAddAccount( groupId, accountId ) )
      store.dispatch( accountsUpdate({ ...result.accounts[accountId], group: groupId }) )
    } else {
      store.dispatch( moveAccounFromGroup( accountId, groupId ) )
    }
  }

  function nextStep(accountId) {
    let tempWs = ''
    let index = clientsSocket.clients.findIndex( wsElement => wsElement.accountCode == accountId )
    if (index >= 0) {
      // debugger

      tempWs = new WebSocketSimple( clientsSocket.clients[ index ] )
    } else {
      console.log('accountId not found. It looks like not connected > ' + accountId)
      // console.error(Object.keys(mainSockets))
      // throw Error('accountId not found')
      return false
    }
    // Get the session survey
    let result = store.getState()
    let account = result.accounts[accountId]
    let accountSessionPointer = 'surveyPointer' in account? account.surveyPointer + 1:  0
    store.dispatch( accountsUpdate({ ...account, surveyPointer: accountSessionPointer }) )
    // Go to WaitSync to start session
    tempWs.send(
      wsGotoPage({ url: resolveSurveyURL( result.session.surveyPath[ accountSessionPointer ].type ), options: {} })
    )
  }

  switch (action) {
    case REGISTER_ACCOUNT:
      // Register an Account
      result = await createAccount(
        {
          firstName: payload.firstName,
          surname: payload.surname,
          email: payload.email,
          password: payload.password,
          reEnterPassword: payload.password,
        },
        fieldsOptions
      )

      if (typeof result == 'object' && 'message' in result) {
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
        surname: payload.surname,
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

      if (typeof result == 'object' && 'message' in result) {
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
        surname: result.surname,
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
      store.dispatch( groupsAdd({
         groupId: payload.name || Date.now(),
         type: payload.type || 0,
         list: payload.list || [],
      }) )
      return true

    case GROUPS_REMOVE:
      result = store.getState()
      // console.log('>>>>> ' + GROUPS_REMOVE)
      // console.log(payload)
      // console.log(store.getState())
      // console.log('result.accounts[accountId]> ')
      // console.log(result.accounts[accountId])
      // Free all the accounts from group
      removeGroup(payload.groupId, store)
      // result.groups[payload.groupId].map(
      //   (accountId) => store.dispatch( accountsUpdate({ ...result.accounts[accountId], group: 'unassigned' }) )
      // )
      // store.dispatch( groupsRemove( payload.groupId ) )
      return true

    case GROUPS_ADD_ACCOUNT:
      return true

    case GROUPS_REMOVE_ACCOUNT:
      return true

    case GROUPS_SELECTED_ACCOUNTS_TO_GROUP:
      result = store.getState()
      payload.selected.map(
        (accountId) => {
          addAccountToGroup(accountId, payload.groupId, store)
        }
      )
      return true

    case GROUPS_SELECTED_ACCOUNTS_UNASSIGN:
      result = store.getState()
      payload.selected.map(
        (accountId) => {
          removeAccountFromGroup(accountId, store)
        }
      )
      return true

    case GROUPS_ACCOUNTS_UNASSIGN:
      result = store.getState()
      if (result.accounts[payload.accountId]) {
        removeAccountFromGroup(payload.accountId, store)
      }
      return true

    case GROUPS_AUTOMATE_CREATION:
      result = store.getState()

      // Correct the number of groups
      while (payload.numberOfGroups != result.groups.list.length) {
        if (payload.numberOfGroups > result.groups.list.length) {
          // Add group
          store.dispatch( groupsAdd({
            groupId: payload.name || Date.now(),
            // Assign a type from 0 - 3
            type: payload.type || result.groups.list.length % 4,
            list: payload.list || [],
          }) )
        } else {
          // Remove group
          removeGroup(result.groups.list[result.groups.list.length - 1], store)
        }
      }

      // reapeted from class GroupAutomatic
      function drawGroups(g, a) {
        let baseA = Math.floor(a/g)
        let orderedGroupsAndAccounts = []

        for (let i = 0; i < g; i++) {
          orderedGroupsAndAccounts.push(baseA)
        }

        for (let i = 0; i < a%g; i++) {
          orderedGroupsAndAccounts[i] += 1
        }

        return orderedGroupsAndAccounts
      }

      {
        let orderedGroupsAndAccounts = drawGroups(payload.numberOfGroups, result.accounts.list.length)
        let accountId, group, groupId
        // Make the gropus random
        let random = true

        // remove accounts to excess groups
        for (let i = 0; i < payload.numberOfGroups; i++) {
          group = result.groups[ result.groups.list[i] ]
          while (group.accountList.length > orderedGroupsAndAccounts[i]) {
            removeAccountFromGroup(
              // last account of the group
              group.accountList[ group.accountList.length - 1 ],
              store
            )
          }
        }
        // Add accounts to deficit groups
        for (let i = 0; i < payload.numberOfGroups; i++) {
          groupId = result.groups.list[i]
          group = result.groups[ groupId ]
          while (group.accountList.length < orderedGroupsAndAccounts[i]) {
            // Do it random?
            if (random == true) {
              // Find a free accountId
              accountId = []
              for (let acc of result.accounts.list) {
                if (result.accounts[acc].group == 'unassigned') {
                  accountId.push( acc )
                }
              }

              addAccountToGroup(
                accountId[ Math.floor( Math.random() * accountId.length ) ],
                groupId,
                store
              )
            } else {
              // Find a free accountId
              for (let acc of result.accounts.list) {
                if (result.accounts[acc].group == 'unassigned') {
                  accountId = acc
                  break;
                }
              }

              addAccountToGroup(
                accountId,
                groupId,
                store
              )
            }

          }
        }
      }
      return true

    case SURVEY_STEP_ALL:
      if (typeof payload == 'object' && payload.constructor.name == 'Array') {
        payload.forEach( accountId => nextStep( accountId ) )
      }
      return true

    case SUBMIT_SURVEY_INFO:
      // Check payload && payload accountId
      if (typeof payload != 'object' || !payload.accountId || payload.accountId == 'unassigned') {
        console.log('SUBMIT_SURVEY_INFO: No valid accountId')
        return false
      }
      temp = {}
      result = store.getState()
      temp.accountSurveyPointer = result.accounts[ payload.accountId ].surveyPointer
      // Add survey info to the redux store and to the database.
      store.dispatch(
        storeSurveInfo({
          ...payload,
          surveyId: temp.accountSurveyPointer,
          groupId: result.accounts[ payload.accountId ].group,
        })
      )

      // After that move to the next survey step.
      nextStep( payload.accountId )

      result = store.getState()

      temp.numActiveAccounts = result.groups.list.reduce(
        (prev, groupID) => {
          return prev + result.groups[groupID].accountList.length
        },
        0
      )

      temp.numActualSurveysRecived = result.results.surveyInfo.reduce(
        (prev, survey) => {
          if (survey.surveyId == temp.accountSurveyPointer) {
            return prev + 1
          }
          return prev
        },
        0
      )

      // If information need processing after the last account have being submited:
      // EX: SIMILARITIES, FAVOURITES & RESULTS
      if ( temp.numActiveAccounts > 0 && temp.numActiveAccounts == temp.numActualSurveysRecived ) {
        switch (result.session.surveyPath[temp.accountSurveyPointer].type) {
          case SIMILARITIES:
            // Get the all SIMILARITIES survey results.
            temp.dataSimilarities = result.results.surveyInfo.filter(
              element => element.surveyId == temp.accountSurveyPointer
            )
            temp.dataSimilarities = temp.dataSimilarities.reduce(
              (prev, survey) => {
                return prev = [ ...prev, ...survey.surveyData ]
              },
              []
            )
            // Process SIMILARITIES and store in task.similarList
            store.dispatch(
              taskAddAllSimilarities(
                processSimilarities( temp.dataSimilarities )
              )
            )
            break;

          case FAVOURITES:
            // Process the FAVOURITES
            console.log('FAVOURITES PRIMEro ANTES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> processSimilarities <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
            try{
              temp.dataFavourites = result.results.surveyInfo.filter(
                element => element.surveyId == temp.accountSurveyPointer
              )

              temp.dataFavourites = temp.dataFavourites.reduce(
                (prev, survey) => {
                  return prev = [ ...prev, ...survey.surveyData.data ]
                },
                []
              )

              console.log("ESTODEAKI: "+ JSON.stringify(temp.dataFavourites))
              var aggregated = []
              var found;
              var entry;

                for ( var f in temp.dataFavourites){
                found = false;

                  for ( var e in aggregated){
                    if (temp.dataFavourites[f].id == aggregated[e].id){
                      aggregated[e].rating.push(temp.dataFavourites[f].rating)
                      found = true;
                      break;
                    }
                  }

                  if ( !found ) {
                    entry = temp.dataFavourites[f]
                    if ( entry.rating ){
                      if (! (entry.rating instanceof Array) ){
                        entry.rating = [entry.rating]
                      }
                    } else {
                      entry.rating = []
                    }
                    aggregated.push(entry)
                  }

                }
              } catch (e){
                console.log(e)


              }
            console.log('FAVOURITES PRIMEro>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> processSimilarities <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
            console.log("DATOS::::::> "+JSON.stringify(aggregated))
            //console.log( processSimilarities( temp.dataSimilarities ) )
            console.log('FAVOURITES SEGUNDO>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> processSimilarities <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
            store.dispatch(
              taskAddAllFavourites( aggregated )
            )
            break;

          case RESULTS:

            store.dispatch( taskIncreasePointer() )
            break;

          default:

        }
      }

      return true

    case TASK_IDEA_ADD:
      result = store.getState()

      store.dispatch(
        taskIdeaAdd({
          group: result.accounts[payload.creator].group,
          groupType: result.groups[
            result.accounts[payload.creator].group
          ].type,
          ...payload,
        })
      )

      return true


  }
}
