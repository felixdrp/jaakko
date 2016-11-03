import React, { PropTypes, Component } from 'react'

// groups
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

import Group from 'material-ui/svg-icons/social/group';
import GroupAdd from 'material-ui/svg-icons/social/group-add';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import DeveloperBoard from 'material-ui/svg-icons/hardware/developer-board';

// Icons

import Memory from 'material-ui/svg-icons/hardware/memory';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { GroupContainer, UnassignedContainer, GroupAutomatic } from './';

import {
  wsGroupAdd,
  wsGroupRemove,
  wsAssignSelectedAccountsToGroup,
  wsUnassignSelectedAccounts,
  wsUnassignAccount,
  wsAutomateGroupsCreation,
} from '../../../websocket-message/server-actions'

class GroupManager extends Component {
  static propTypes = {
    groups: PropTypes.object,
    unassignedAccounts: PropTypes.object,
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
    // console.log(this.context)
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
          title={ <span><Group /> Groups manager </span> }
          subtitle="Groups manager"
          // avatar="images/jsa-128.jpg"
        />
        <CardTitle
          title={
            <span>
              <Group style={style.gray} />
              <DeveloperBoard style={{...style.gray, marginRight: 10}} />
              Groups automated
            </span>
          }
          subtitle="Groups creation with AI help"
        />
        <div>
          <GroupAutomatic
            accounts={this.props.accounts}
            automateGroupCreation={this.automateGroupCreation}
          />
        </div>

        <CardTitle
          title={
            <span>
              <Group style={style.gray} />
              <ModeEdit style={{...style.gray, marginRight: 10}} />
              Groups customization
            </span>
          }
          subtitle="Groups manual fine customization"
        />

        <UnassignedContainer
          accounts={this.props.accounts}
          selectedAccounts={this.state.selectedAccounts}
          unassignSelectedAccounts={ this.unassignSelectedAccounts }
          selectionHandler={ this.selectAccount }
        />

        <div
          // Assign Groups
          // Groups Chips
          style={{
            minWidth: '95%',
            margin: '2.5%',
            marginTop: 65,
          }}
        >
          <RaisedButton
            // Add group button
            onClick={ this.addGroup }
            backgroundColor={'#ddffb1'}
            style={{
              height: 36,
              // minWidth: '95%',
              marginBottom: 20,
            }}
          >
            <span
              style={{
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <GroupAdd style={{
                position: 'relative',
                top: 6,
                marginRight: 7,
              }}/>
              Add group
            </span>
          </RaisedButton>

          <GroupContainer
            accounts={this.props.accounts}
            groups={this.props.groups}
            selectedAccounts={this.state.selectedAccounts}
            removeGroup={this.removeGroup}
            unassignAccount={this.unassignAccount}
            assignSelectedAccountsToGroup={this.assignSelectedAccountsToGroup}
            selectionHandler={this.selectAccount}
          />
        </div>
      </Card>
    )
  }
}

export default GroupManager
