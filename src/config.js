// Server graphql port (Proxy)
export const port = (typeof window === 'undefined')? 8000 : window.document.location.port

// DataBase, Mongodb configuration
export const mongodbConf = {
  url: 'mongodb://localhost:27017/lifelog',
}

// GraphQL server connection options
export const graphQLServerOptions = {
  port,
  host: (typeof window === 'undefined')? 'localhost' : window.document.location.hostname,
  method: 'POST',
  path: '/graphql',
  headers: {'http-client-custom': 'v1'}
}


// Input Fields Options
const nameAndSurenameOptions = {
  type: 'alphanumeric',
  min: 1,
  max: 50,
  mustHave: true,
}

const passwordOptions = {
  type: 'password',
  min: 4,
  max: 50,
  mustHave: true,
  numbers: 1,
  capitals: 1,
  symbols: 1,
}

export let fieldsOptions = {
  firstName : {...nameAndSurenameOptions},
  surename : {...nameAndSurenameOptions},
  email: {type: 'email', min: 8, max: 50, mustHave: true},
  password: {...passwordOptions},
  reEnterPassword: {...passwordOptions},
  token: {type: 'token', min: 32, max: 32, mustHave: false},
};
