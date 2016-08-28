import React, { PropTypes, Component } from 'react'

import { GroupView } from './';

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
    console.log(this.context)
    const style = {
      gray: {
        color: '#565555'
      }
    }
    let props = this.props
    let groupList = ''
    if  (props.groups) {
      groupList = props.groups.list.map(
        (groupId, index) => (
          <GroupView
            key={index}
            groupId={groupId}
            accountsNumber={props.groups[groupId].length}
            assignToGroup={ ()=> {} }
            removeGroup={ () => {props.removeGroup(groupId)} }
          />
        )
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
