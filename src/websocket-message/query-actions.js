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
