# Server websocket message system

For the communications with the server we will use a system similar to the idea of react actions:

{
  type: 'mutate' || 'query' || 'actions'
  payload
}

The mutate and query are async actions with unknown results. Ideas similar to graphql

The type actions means that the payload is an action ready to be dispatched by redux.

Example:

{
  type: 'mutate',
  action: 'REGISTER_ACCOUNT'
  payload: {
    email: '...',
    password: '...',
  }
}
