import React, { PropTypes, Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import Group from 'material-ui/svg-icons/social/group';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';


class GroupAutomatic extends Component {
  static propTypes = {
    groups: PropTypes.object,
    unassignedAccounts: PropTypes.object,
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
    const style = {
      gray: {
        color: '#565555'
      }
    }
    let props = this.props
    let unassignedAccounts = {
      list: [],
    }

    return (
      <div
        style={{
          margin: '2.5%',
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <div
          style={{
            margin: '2.5%',
            marginTop: 15,
            marginBottom: 30,
          }}
        >
          <FloatingActionButton mini={true} style={{}}>
            <ContentRemove />
          </FloatingActionButton>
          1
          <FloatingActionButton mini={true} style={{}}>
            <ContentAdd />
          </FloatingActionButton>

          <RaisedButton
            // Group main button
            // onClick={}
            backgroundColor={'#efefef'}
            style={{
              height: 36,
            }}
          >
            Create
          </ RaisedButton>
        </div>
        <Group /> <PersonOutline /> <PersonOutline />
      </div>
    )
  }
}

export default GroupAutomatic
