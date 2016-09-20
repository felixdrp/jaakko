import React, { PropTypes, Component } from 'react'

import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';

import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Done from 'material-ui/svg-icons/action/done';

import AccountsPerGroupView from './accounts-per-group-view'

import sessionData from '../../../session-data'

import {
  AWAIT,
  // QUESTION,
  // INSTRUCTIONS,
} from '../../survey/survey-types'

import {
  wsSurveyStepAll,
} from '../../../websocket-message/server-actions'



class SessionTrackerContainer extends Component {
  static propTypes = {
    // groups: PropTypes.object,
    // accounts: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    // wsSession: PropTypes.object,
  };

  constructor() {
    super()
    this.state = {
      // accounts: { },
      // groups: { },
      selection: [],

      openMenus: [],
      anchorEl: [],
    };

    // Used to store references.
    this._input = {};
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    let openMenus = this.state.openMenus.slice()
    let anchorEl = this.state.anchorEl.slice()
    let index = Number( event.currentTarget.attributes.getNamedItem('name').value )

    openMenus[index] = true
    anchorEl[index] = event.currentTarget

    this.setState({
      openMenus,
      anchorEl,
    });
  };

  handleRequestClose = (index) => {
    let openMenus = this.state.openMenus.slice()

    openMenus[index] = false
    this.setState({
      openMenus,
    });
  };

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
        if ( survey == undefined || survey == 'undefined' ) {
          if ( filterAccountByGroup == null ) {
            sessionTrack.push(<Done style={{fill: 'green'}} />)
          } else {
            sessionTrack.push(<span />)
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

      // console.log(accountsPerSurvey)
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
                { step.type == AWAIT?
                  <span>
                    <span
                      name={index}
                      style={{
                        color: '#6c6c6c',
                        cursor: 'pointer',
                      }}
                      onTouchTap={this.handleTouchTap}
                    >
                      <span> {step.type} </span>
                    </span>
                    <Popover
                      name={index}
                      open={this.state.openMenus[index] || false}
                      anchorEl={this.state.anchorEl[index]}
                      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                      targetOrigin={{horizontal: 'left', vertical: 'top'}}
                      onRequestClose={ () => this.handleRequestClose(index) }
                    >
                      <Menu>
                        <MenuItem
                          onClick={
                            ()=> {
                              console.log('mlkkkk' + index);
                              if (accountsPerSurvey[index] != undefined) {
                                this.props.wsSession.send(
                                  wsSurveyStepAll( accountsPerSurvey[index] )
                                )
                                console.log(accountsPerSurvey[index]);
                              }
                              this.handleRequestClose(index);
                            }
                          }
                        >
                          <PlayArrow />
                          Continue
                        </MenuItem>
                      </Menu>
                    </Popover>
                  </span>
                  :

                  <span> {step.type} </span>
                }


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
