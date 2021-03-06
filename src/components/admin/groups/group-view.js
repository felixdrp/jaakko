import React, { PropTypes, Component } from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import Group from 'material-ui/svg-icons/social/group';
import GroupAdd from 'material-ui/svg-icons/social/group-add';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';

import {
  NavigationCancel,
} from 'material-ui/svg-icons'

class GroupView extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    let props = this.props
    let context = this.context
    let palette = context.muiTheme.palette
    let style = {
      centerIcon: {
          color: '#6c6c6c',
          position: 'relative',
          top: 6,
          marginLeft: 7,
          marginRight: 7,
      },
    }
    let buttonLabel = (
      <span>
        <span
          style={{
            float: 'left',
            paddingLeft: 15,
          }}
        >
          <Group
            style={{
              ...style.centerIcon,
              marginLeft: 0,
            }}
          />
          Group {props.groupId}

          <PersonOutline
            style={{
              ...style.centerIcon
            }}
          />
            {props.accountsNumber}
          <span
            style={{
              color: '#6c6c6c',
              marginLeft: 10,
            }}
          >
            Accounts
          </span>
          <span
            style={{
              marginLeft: 5,
            }}
          >
            Type {props.groupType}
          </span>
        </span>

        <NavigationCancel
          onClick={ (e) => { e.nativeEvent.preventDefault(); props.removeGroup(props.groupId); } }
          style={{
            ...style.centerIcon,
            float: 'right',
          }}
        />
      </span>
    )
    // console.log(context)
    return (
    <Card
      style={{
        width: 460,
        paddingBottom: 15,
        margin: 10,
      }}
    >
      <RaisedButton
        // Group main button
        onClick={ props.assignToGroup }
        backgroundColor={'#f59999'}
        style={{
          height: 36,
          minWidth: '95%',
          margin: '2.5%',
        }}
      >
        {buttonLabel}
      </ RaisedButton>
      Group {props.groupId}
      <div
        // Group 1 Chips
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          minWidth: '95%',
          margin: '2.5%',
        }}
      >
      {
        props.accounts.list.map(
          (accountId) => (
            <Chip
              key={accountId}
              backgroundColor={props.accounts[accountId].selected? palette.chipSelected : palette.chip}
              onTouchTap={ (e) => props.selectionHandler(accountId, e.nativeEvent) }
              onRequestDelete={ (e) => props.unassignAccount(accountId) }
              style={{
                margin: 3,
              }}
            >
              <span
                style={{
                  fontWeight: 500,
                  marginRight: 8,
                  fontFamily: 'monospace',
                }}
              >
                { props.accounts[accountId].firstName }
              </span>
              { props.accounts[accountId].email }
            </Chip>
          )
        )
      }
      </div>
    </Card>
  )};
}

export default GroupView
