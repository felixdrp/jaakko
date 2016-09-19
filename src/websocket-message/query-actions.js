import {
  QUERY
} from './server-actions'

// Queries to the server

// Get the session store state.
export const SESSION_STATE_GET = 'SESSION_STATE_GET'

export function wsSessionStateGet() {
  return {
    type: QUERY,
    action: SESSION_STATE_GET,
  }
}

export const SURVEY_STATE_GET = 'SURVEY_STATE_GET'
// Ask for the survey information.
export function wsSurveyStateGet(accountId) {
  return {
    type: QUERY,
    action: SURVEY_STATE_GET,
    payload: accountId,
  }
}
