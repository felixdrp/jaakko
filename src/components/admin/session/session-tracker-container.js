import React, { PropTypes, Component } from 'react'

import sessionData from '../../../session-data'
// import GeneralInfoView from './general-info-view'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';

class SessionTrackerContainer extends Component {
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
          flexDirection: 'column',
          paddingLeft: 40,
        }}
      >
      {
        sessionData.surveyPath.map(
          (step, index) => {
            return (
              <div key={index}>
                <PlayArrow />{step.type}
              </div>
            )
          }
        )
      }
      </div>
    )
  }
}

export default SessionTrackerContainer
