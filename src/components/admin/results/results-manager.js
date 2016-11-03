import React, { PropTypes, Component } from 'react'

// groups
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

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

import ShowChart from 'material-ui/svg-icons/editor/show-chart';
import LocalAtm from 'material-ui/svg-icons/maps/local-atm';
import Memory from 'material-ui/svg-icons/hardware/memory';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
//
// import GeneralInfoContainer from './general-info-container';
// import SessionTrackerContainer from './session-tracker-container';


import {

} from '../../../websocket-message/server-actions'

class ResultsManager extends Component {
  static propTypes = {
    // groups: PropTypes.object,
    // unassignedAccounts: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor() {
    super()
    this.state = {

    };

    // Used to store references.
    this._input = {};
  }

  render() {
    let surveyxMonetaryTypeIndex = []
    let surveyxMonetaryTypeIndexType = []
    let accountsMonetary = []
    let accountsMonetaryTable = []

    let columnWidthStyle = '20%'

    if ( this.props.storeSession && 'session' in this.props.storeSession ) {
      surveyxMonetaryTypeIndex = this.props.storeSession.session.surveyPath.reduce(
        (prev, element, index) => {
          // The survey have a monetary value?
          if (element.type == 'RESULTS' || element.type == 'MATH_RESULTS') {
            prev.push( index )
            return prev
          }
          return prev
        },
        []
      )


      surveyxMonetaryTypeIndexType = surveyxMonetaryTypeIndex.map( surveyIndex => this.props.storeSession.session.surveyPath[surveyIndex].type )

      accountsMonetaryTable = this.props.storeSession.accounts.list.reduce(
        ( prev, accountId, index ) => {
          let account = this.props.storeSession.accounts[ accountId ]
          let accountComponent = []
          let moneyData = []
          let taskNumber = 0
          let total = 0

          accountComponent.push(
            <TableRowColumn key={ account.email + 0 } style={{ width: columnWidthStyle }}>
              {account.firstName} {account.surname} Group {account.group}
            </TableRowColumn>
          )

          accountComponent.push(
            <TableRowColumn key={ account.email + 1 } style={{ width: 20 }}>
              {this.props.storeSession.groups[account.group].type}
            </TableRowColumn>
          )


          moneyData = this.props.storeSession.results.surveyInfo.filter(
            (element) => element.accountId == accountId && surveyxMonetaryTypeIndex.includes( element.surveyId )
          )

          moneyData.forEach(
            (current, index2) => {
              let data
              if ( current.surveyType == 'RESULTS' ) {
                data = current.surveyData.data.find( (element) => element.account.email == current.surveyData.currentUserEmail )
                accountComponent.push(
                  <TableRowColumn
                    key={ account.email + index2 + 1 }
                    style={{
                      marginLeft: 10,
                    }}
                    // Task Round {taskNumber}
                  >
                    Rank {data.rank} Score {data.score} Pay {data.pay}
                  </TableRowColumn>
                )
                taskNumber += 1
                total += data.pay
              } else {
                data = current.surveyData.data.find( (element) => element.account.email == current.surveyData.currentUserEmail )
                accountComponent.push(
                  <TableRowColumn
                    key={ account.email + index2 + 1 }
                    style={{
                      marginLeft: 10,
                    }}
                    // Math Round
                  >
                    Rank {data.rank} Score {data.mathScore} Pay {data.pay}
                  </TableRowColumn>
                )
                accountComponent.push(
                  <TableRowColumn
                    key={ account.email + index2 + 2 }
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    {total + data.pay}
                  </TableRowColumn>
                )
              }
            }
          )

          prev.push( <TableRow key={ index }> {accountComponent} </TableRow> )

          return prev
        },
        []
      )

      accountsMonetaryTable = (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={{ width: columnWidthStyle }}>Account Info</TableHeaderColumn>
              <TableHeaderColumn style={{ width: 20 }}>Type</TableHeaderColumn>
              {
                surveyxMonetaryTypeIndexType.map(
                  (type, index) => {
                    if ( type == 'RESULTS' ) {
                      return <TableHeaderColumn key={ 'task' + index }>Task Round { index }</TableHeaderColumn>
                    } else {
                      return <TableHeaderColumn key={ 'math' + index }>Math Round { index }</TableHeaderColumn>
                    }
                  }
                )
              }
              <TableHeaderColumn>Total</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              accountsMonetaryTable
            }
          </TableBody>
        </Table>
      )
    }

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
          title={ <span><ShowChart /> Results manager </span> }
          subtitle="Results manager"
        />
        <CardHeader
          title={ <span><LocalAtm /> Results manager </span> }
        />
        {
          // accountsMonetary
        }
        { accountsMonetaryTable }
      </Card>
    )
  }
}

export default ResultsManager
