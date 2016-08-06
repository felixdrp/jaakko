import { REGISTER_ACCOUNT } from '../actions/actions'

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    case REGISTER_ACCOUNT:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        },
        ...state
      ]

    default:
      return state
  }
}

/*
 * reducers
 */

export function account(state = [], action) {
  switch (action.type) {
  case REGISTER_ACCOUNT:
    return action.register
  case LOGIN_ACCOUNT:
    return action.filter
  default:
    return state
  }
}
