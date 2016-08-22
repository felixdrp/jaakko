// Facade object to use websocket
// Check that we will send a string every time
export default class WebSocketSimple {
  constructor(initialWebsocket) {
    this.ws = initialWebsocket
    // console.log('Initiated ')
  }

  send(data) {
    let message
    if ( typeof data === 'object' ) {
      message = JSON.stringify(data)
    }
    this.ws.send(message)
  }

  set accountCode(code) {
    this.ws.accountCode = code
  }

  get accountCode() {
    return this.ws.accountCode
  }
}
