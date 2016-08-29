import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

import PersonOutline from 'material-ui/svg-icons/social/person-outline';

const UnassignedView = (props, context) => (
  <div>
    <RaisedButton
      // Unassigned Accounts
      onClick={ props.unassignSelectedAccounts }
      backgroundColor={'#efefef'}
      style={{
        height: 36,
        minWidth: '95%',
        margin: '2.5%',
        marginTop: 15,
        marginBottom: 15,
      }}
    >
      <span>
        <PersonOutline style={{
          color: '#6c6c6c',
          position: 'relative',
          top: 6,
          marginRight: 7,
        }} />
        { props.accounts? props.accounts.list.length : 0 }
        <span
          style={{
            color: '#6c6c6c',
            marginLeft: 15,
          }}
        >
          Unassigned Accounts
        </span>
      </span>
    </RaisedButton>

    <div
      // Unassigned Chips
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: '95%',
        margin: '2.5%',
        marginTop: 0,
        marginBottom: 15,
      }}
    >
    {
      props.accounts.list.map(
        (accountId) => (
          <Chip
            key={accountId}
            backgroundColor={props.accounts[accountId].selected? context.muiTheme.palette.chipSelected : context.muiTheme.palette.chip}
            onTouchTap={ (e) => props.selectionHandler(accountId, e.nativeEvent) }
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
  </div>
);
UnassignedView.contextTypes = {muiTheme: React.PropTypes.object};

export default UnassignedView
