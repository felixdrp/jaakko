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
      iconGroup: {
        // color: '#565555',
        height: 33,
        width: 35,
        marginRight: 10,
      },
      iconAccount: {
        height: 33,
        width: 31,
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
          <span
            style={{
              margin: 25,
              fontSize: '-webkit-xxx-large',
              fontWeight: 400,
              fontFamily: 'monospace',
            }}
          >
            1
          </span>
          <FloatingActionButton mini={true} style={{}}>
            <ContentAdd />
          </FloatingActionButton>

          <RaisedButton
            // Group main button
            // onClick={}
            backgroundColor={'#efefef'}
            style={{
              height: 36,
              marginLeft: 45,
              position: 'relative',
              bottom: 10,
            }}
          >
            Create
          </ RaisedButton>
        </div>
        <div
          style={{
            height: 100,
            border: 10,
            boxSizing: 'border-box',
            boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
            overflowY: 'scroll',
          }}
          onScroll={ (e) => console.log(e.nativeEvent.target.scrollTop) }
        >
          <div
            style={{
              height: 500,
            }}
          >

          </div>
        </div>

        <Group style={style.iconGroup} /> <PersonOutline style={style.iconAccount} /> <PersonOutline style={style.iconAccount} />
      </div>
    )
  }
}

export default GroupAutomatic
