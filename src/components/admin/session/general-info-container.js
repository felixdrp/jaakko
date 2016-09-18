import React, { PropTypes, Component } from 'react'

import GeneralInfoView from './general-info-view'


class GeneralInfoContainer extends Component {
  static propTypes = {
    // groups: PropTypes.object,
    // accounts: PropTypes.object,
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
    let storeSession = props.storeSession
    let groupList = {list:[]},
        accounts = '',
        groups = ''

    if ( typeof storeSession == 'object' && 'groups' in storeSession ) {
      groups = storeSession.groups

      if (typeof groups == 'object' && 'list' in groups) {
        groupList = storeSession.groups
      }

      accounts = groups.list.reduce(
        (prev, groupID) => {
          return prev + groups[groupID].accountList.length
        },
        0
      )

      groups = groups.list.length
    }

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <GeneralInfoView
          accounts={accounts}
          groups={groups}
          groupList={groupList}
          // accountsNumber={props.groups[groupId].accountList.length}
          // groupType={props.groups[groupId].type}
          // assignToGroup={ (event) => props.assignSelectedAccountsToGroup( event, groupId ) }
          // removeGroup={ () => {props.removeGroup(groupId)} }
          // selectionHandler={props.selectionHandler}
          // unassignAccount={props.unassignAccount}
        />
      </div>
    )
  }
}

export default GeneralInfoContainer
