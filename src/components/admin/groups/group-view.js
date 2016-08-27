import React from 'react'

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

const GroupView = (props, context) => {
  let style = {
    centerIcon: {
        color: '#6c6c6c',
        position: 'relative',
        top: 6,
        marginLeft: 7,
        marginRight: 7,
    },
    position1: {

    }
  }
  // console.log(context)
  return (
  <Card
    style={{
      width: 460,
      paddingBottom: 15,
    }}
  >
    <RaisedButton
      // Group main button
      label={
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
            Group 1

            <PersonOutline
              style={{
                ...style.centerIcon
              }}
            />
            10
            <span
              style={{
                color: '#6c6c6c',
                marginLeft: 10,
              }}
            >
              Accounts
            </span>
          </span>

          <NavigationCancel
            onClick={ props.removeGroup }
            style={{
              ...style.centerIcon,
              float: 'right',
            }}
          />
        </span>
      }
      onClick={ props.assignToGroup }
      backgroundColor={'#f59999'}
      style={{
        minWidth: '95%',
        margin: '2.5%',
      }}
    />
    <div
      // Group 1 Chips
      style={{
        minWidth: '95%',
        margin: '2.5%',
      }}
    >
      <Chip
        backgroundColor={context.muiTheme.palette.selectionBackground}
        onRequestDelete={ () => console.log('onclik!!!!') }
        onTouchTap={ () => console.log('onclik!!!!') }
        style={{
          margin: 4,
        }}
      >
        Colored Chip
      </Chip>
    </div>
  </Card>
)};

GroupView.contextTypes = {muiTheme: React.PropTypes.object};

export default GroupView
