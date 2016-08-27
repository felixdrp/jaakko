import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

import PersonOutline from 'material-ui/svg-icons/social/person-outline';

const UnassignedView = (props) => (
  <div>
    <RaisedButton
      // Unassigned Accounts
      label={
        <span>
          <PersonOutline style={{
            color: '#6c6c6c',
            position: 'relative',
            top: 6,
            marginRight: 7,
          }} />
          10
          <span
            style={{
              color: '#6c6c6c',
              marginLeft: 15,
            }}
          >
            Unassigned Accounts
          </span>
        </span>
      }
      onClick={ () => console.log('onclik!!!!') }
      backgroundColor={'#efefef'}
      style={{
        minWidth: '95%',
        margin: '2.5%',
      }}
    />
    <div
      // Unassigned Chips
      style={{
        minWidth: '95%',
        margin: '2.5%',
        marginTop: 0,
      }}
    >
      <Chip
        backgroundColor={'#d6d6d6'}
        // onRequestDelete={ () => console.log('onclik!!!!') }
        onTouchTap={ () => console.log('onclik!!!!') }
        style={{
          margin: 3,
        }}
      >
        Colored Chip
      </Chip>
    </div>
  </div>
);

export default UnassignedView
