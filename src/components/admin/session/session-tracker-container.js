import React, { PropTypes, Component } from 'react'

import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Done from 'material-ui/svg-icons/action/done';

import AccountsPerGroupView from './accounts-per-group-view'

import sessionData from '../../../session-data'


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

    let accountsPerSurvey = []
    let sessionTrack = []

    let filterAccountByGroup = null

    if ( typeof storeSession == 'object' && 'groups' in storeSession ) {
      groups = storeSession.groups

      if (typeof groups == 'object' && 'list' in groups) {
        groupList = storeSession.groups
      }
      // Number of accounts
      accounts = groups.list.reduce(
        (prev, groupID) => {
          return prev + groups[groupID].accountList.length
        },
        0
      )

      // Link survey to account
      storeSession.accounts.list.forEach( account => {
        let acc = storeSession.accounts[ account ]
        if ( accountsPerSurvey[acc.surveyPointer] == undefined ) {
          accountsPerSurvey[acc.surveyPointer] = []
        }

        accountsPerSurvey[acc.surveyPointer].push( acc.email )
      })

      // Add type to the finished surveys.
      for ( let survey of accountsPerSurvey ) {
        if ( survey == 'undefined' ) {
          if ( filterAccountByGroup == null ) {
            sessionTrack.push(<Done style={{fill: 'green'}} />)
          }
        } else {
          filterAccountByGroup = survey.reduce(
            (prev, actual) => {
              let group = storeSession.accounts[ actual ].group
              if ( prev.list.includes( group ) ) {
                prev[group].push( actual )
              } else {
                prev.list.push( group )
                prev[ group ] = [ actual ]
              }
              return prev
            },
            { list: [] }
          )

          sessionTrack.push(
            <span>
            {
              filterAccountByGroup.list.map(
                (groupId) => (
                  <AccountsPerGroupView
                    key={groupId}
                    groupName={groupId}
                    groupType={ groupId == 'unassigned'? 'unassigned': storeSession.groups[ groupId ].type }
                    groupAccounts={ filterAccountByGroup[groupId] }
                  />
              ))
            }
            </span>
          )
        }
      }

      console.log(accountsPerSurvey)
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
                <PlayArrow />
                <span> {step.type} </span>
                { sessionTrack[index]? sessionTrack[index]: '' }
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
