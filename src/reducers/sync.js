import { WAIT, CONTINUE } from '../actions/actions'


export default function synchronize(state = { wait: true }, action) {
  switch (action.type) {
  case WAIT:
    return { wait: true }
  case CONTINUE:
    return { wait: false }
  default:
    return state
  }
}
