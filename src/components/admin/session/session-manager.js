import React, { PropTypes, Component } from 'react'

// groups
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

import Class from 'material-ui/svg-icons/action/class';
import Language from 'material-ui/svg-icons/action/language';
import Group from 'material-ui/svg-icons/social/group';
import GroupAdd from 'material-ui/svg-icons/social/group-add';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import DeveloperBoard from 'material-ui/svg-icons/hardware/developer-board';

// Icons

import Memory from 'material-ui/svg-icons/hardware/memory';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import GeneralInfoContainer from './general-info-container';
import SessionTrackerContainer from './session-tracker-container';


import {
  wsGroupAdd,
  wsGroupRemove,
  wsAssignSelectedAccountsToGroup,
  wsUnassignSelectedAccounts,
  wsUnassignAccount,
  wsAutomateGroupsCreation,
} from '../../../websocket-message/server-actions'

class SessionManager extends Component {
  static propTypes = {
    // groups: PropTypes.object,
    // unassignedAccounts: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    // wsSession: PropTypes.object,
    // websocket: PropTypes.object,
  };

  constructor() {
    super()
    this.state = {
      accounts: { },
      groups: { },
      selectedAccounts: [],
    };

    // Used to store references.
    this._input = {};
  }

  // Add or remove a selection
  // if maintainPrevSelection == true it will maintain the previus selection
  selectAccount = ( accountId, maintainPrevSelection ) => {
    let prevSelected = this.state.selectedAccounts
    let selected = []
    if (maintainPrevSelection.ctrlKey) {
      // Alredy in the list? then remove
      if (prevSelected.includes(accountId)) {
        selected = prevSelected
        selected.splice( selected.indexOf(accountId), 1 )
      } else {
        selected = this.state.selectedAccounts.concat(accountId)
      }
    } else {
      // If not selected select
      if (!prevSelected.includes(accountId)) {
        selected = [ accountId ]
      }
    }

    this.setState({ selectedAccounts: selected })
    // debugger
    // console.log('select an account!!! > ' + accountId)

  }

  // Free an account from group
  unassignAccount = (accountId) => {
    // console.log('unassign an account!!! > ' + accountId)
    // console.log(this.props)
    this.props.wsSession.send(
      wsUnassignAccount( accountId )
    )
  }

  // Free the selected accounts from groups
  unassignSelectedAccounts = () => {
    // console.log('unassign!!!')
    this.props.wsSession.send(
      wsUnassignSelectedAccounts( this.state.selectedAccounts )
    )
    this.setState({ selectedAccounts: [] })
  }

  // Free the selected accounts from groups
  assignSelectedAccountsToGroup = (event, groupId) => {
    if (event.nativeEvent.defaultPrevented) {
      return
    }

    let selected = this.state.selectedAccounts

    // send selection and groupid to server
    this.props.wsSession.send(
      wsAssignSelectedAccountsToGroup( groupId, selected )
    )

    this.setState({ selectedAccounts: [] })
    // console.log('assign to group !!! > ' + groupId)
  }

  addGroup = (name) => {
    // send WsAddGroup
    this.props.wsSession.send(
      wsGroupAdd()
    )
    // console.log('addgroup!!!')
    // console.log(this.props)

  }

  removeGroup = (groupId) => {
    // send WsAddGroup
    this.props.wsSession.send(
      wsGroupRemove(groupId)
    )
  }

  automateGroupCreation = (numberOfGroups) => {
    // send WsAddGroup
    this.props.wsSession.send(
      wsAutomateGroupsCreation(numberOfGroups)
    )
  }

  render() {
    console.log(this.context)
    const style = {
      gray: {
        color: '#565555'
      }
    }
    return (
      <Card
        style={{
          paddingBottom: 20,
        }}
      >
        <CardHeader
          title={ <span><Class /> Session manager </span> }
          subtitle="Session manager"
        />
        <GeneralInfoContainer storeSession={ this.props.storeSession } />
        <CardHeader
          title={ <span><Language /> Session Tracker </span> }
        />
        <SessionTrackerContainer
          storeSession={ this.props.storeSession }
          wsSession={ this.props.wsSession }
        />
      </Card>
    )
  }
}

export default SessionManager
