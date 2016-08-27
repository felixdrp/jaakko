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

import { GroupContainer, UnassignedContainer } from './';

import {
  wsGroupAdd,
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
      selection: [],
    };

    // Used to store references.
    this._input = {};
  }

  // Add or remove a selection
  // if maintainPrevSelection == true it will maintain the previus selection
  selectAccount( accountId, maintainPrevSelection ) {
    console.log('select an account!!! > ' + accountId)

  }

  // Free an account from group
  unassignAccount(accountId) {
    console.log('unassign an account!!! > ' + accountId)
    console.log(this.props)
  }

  // Free the selected accounts from groups
  unassignSelectedAccounts() {
    console.log('unassign!!!')
  }

  // Free the selected accounts from groups
  assignSelectedAccountsToGroup(groupId) {
    console.log('assign to group !!! > ' + groupId)

  }

  addGroup = (name) => {
    // send WsAddGroup
    this.props.wsSession.send(
      wsGroupAdd()
    )
    console.log('addgroup!!!')
    console.log(this.props)

  }

  removeGroup(groupId) {
    console.log('addgroup!!!')
    console.log(this.props)
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
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
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

        <UnassignedContainer accounts={this.props.accounts} unassingButton={ this.unassignSelectedAccounts } selectionHandler={ this.selectAccount } />

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
            label={
              <span>
                <GroupAdd style={{
                  position: 'relative',
                  top: 6,
                  marginRight: 7,
                }}/>
                Add group
              </span>
            }
            onClick={ this.addGroup }
            backgroundColor={'#ddffb1'}
            style={{
              // minWidth: '95%',
              marginBottom: 20,
            }}
          />

        <GroupContainer groups={this.props.groups}/>
        </div>
      </Card>
    )
  }
}

export default GroupManager
