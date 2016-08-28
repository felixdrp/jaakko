import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import Memory from 'material-ui/svg-icons/hardware/memory';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { GroupManager } from './groups';
// import GroupManager from './groups/group-manager';

import WebSocketSimple from '../../websocket-message/websocket-simple'

import {
  SESSION_STATE_GET,
} from '../../websocket-message/query-actions'

import {
  wsSessionStateGet,
} from '../../websocket-message/query-actions'

import {
  // Remove the WS from a store state
  storeStateWithoutWebSocket,
} from '../../actions/actions'

import Perf from 'react-addons-perf'
window.Perf = Perf

class ControlRoom extends React.Component {
  // static childContextTypes = {
  //   wsSession: React.PropTypes.object
  // }
  //
  // async getChildContext() {
  //   return { wsSession: this.state.wsSession };
  // }

  constructor() {
    super()
    this.state = {
      // WebSocket Session, used to create an admin connection.
      wsSession: {},
      // storeSession. Estore the server session store.
      storeSession: {},
    };
  }

  componentWillMount() {
    console.log('testing storeStateWithoutWebSocket' + storeStateWithoutWebSocket( {mlk: 'supermlk'} ))
    // Connection example: "wss://localhost:8008"
    let ws = new WebSocket( 'wss://' + location.hostname + ':' + (parseInt(location.port) + 1) )

    ws.onmessage = (event) => {
      // Check the query.
      // Process action.
      let message
      console.log( '>>>' + event.data )
      if ( /^\{.*\}$/.test(event.data) ) {
        message = JSON.parse(event.data)
      } else {
        console.log(event.data)
        return
      }
      console.log( '>>>' + JSON.stringify(event.data) )

      switch ( message.type ) {
        // Process message of type MUTATE
        case 'MUTATE':
          // mutate({
          //   action: message.action,
          //   payload: message.payload,
          //   websocket,
          //   store
          // })
          break
        // Process message of type QUERY
        case 'QUERY':
          // console.log(message.type + ' ' + message.payload.email || '')
          break
        // Process message of type ACTIONS
        default:
          switch ( message.action ) {
            case SESSION_STATE_GET:
              this.setState({ storeSession: message.payload})
              break;
            default:

          }
          // dispatch 'ACTIONS'
          console.log(message.type + ' ' + message.payload || '')
          // store.dispatch( { type: message.action, payload: message.payload } )
      }
    }
    ws.onopen = (e) => {
      // var websocket used to send data.
      let websocket = new WebSocketSimple(ws)
      // Ask for the server state
      websocket.send( wsSessionStateGet() )
      this.setState({ wsSession: websocket })
    }
  }

  async componentWillUnmount() {
    this.state.wsSession.ws.close()
    this.setState({ wsSession: {} })
    // debugger
  }

  render() {

    return (
      <div>
        <AppBar
          title="Study Admin"
          iconElementLeft={<IconButton><Memory /></IconButton>}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
          }
        />

      <GroupManager
        wsSession={ this.state.wsSession }
        accounts={this.state.storeSession.accounts}
        groups={this.state.storeSession.groups}
      />
      </div>
    );
  }
}

export default ControlRoom;
