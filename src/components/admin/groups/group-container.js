import React, { PropTypes, Component } from 'react'

import { GroupView } from './';

import filterAccountsByGroup from './filter-accounts-by-group'


class GroupContainer extends Component {
  static propTypes = {
    groups: PropTypes.object,
    accounts: PropTypes.object,
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

  render() {
    let props = this.props
    let groupList = ''
    if  (props.groups) {
      groupList = props.groups.list.map(
        (groupId, index) => {
          let accounts = filterAccountsByGroup(groupId, props.accounts, props.selectedAccounts)

          return (
            <GroupView
              key={index}
              groupId={groupId}
              accounts={accounts}
              accountsNumber={props.groups[groupId].accountList.length}
              groupType={props.groups[groupId].type}
              assignToGroup={ (event) => props.assignSelectedAccountsToGroup( event, groupId ) }
              removeGroup={ () => {props.removeGroup(groupId)} }
              selectionHandler={props.selectionHandler}
              unassignAccount={props.unassignAccount}
            />
          )
        }
      )
    }

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {groupList}
      </div>
    )
  }
}

export default GroupContainer
