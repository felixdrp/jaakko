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
      numberGroups: 0,
    };

    // Used to store references.
    this._input = {};
  }

  createGroups(e) {
    // Send a call to the server to create the groups automatically.
    if (this.state.numberGroups > 0) {
      this.props.automateGroupCreation(this.state.numberGroups)
    }
  }

  removeGroup(e) {
    if (this.state.numberGroups > 0) {
      this.setState({numberGroups: this.state.numberGroups - 1})
    }
  }

  addGroup(e) {
    this.setState({numberGroups: this.state.numberGroups + 1})
  }

  drawGroups(g, a) {
    console.log(a/g);
    console.log(a%g);

    let baseA = Math.floor(a/g)
    let orderedGroupsAndAccounts = []

    for (let i = 0; i < g; i++) {
      orderedGroupsAndAccounts.push(baseA)
    }

    for (let i = 0; i < a%g; i++) {
      orderedGroupsAndAccounts[i] += 1
    }

    return orderedGroupsAndAccounts
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
    let st = this.state
    let unassignedAccounts = {
      list: [],
    }
    let accounts = props.accounts || { list: [] }

    let groupsProto = this.drawGroups(st.numberGroups, accounts.list.length)

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
          <FloatingActionButton
            // Minus button
            mini={true}
            style={{}}
            onClick={(e) => this.removeGroup(e)}
          >
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
            {st.numberGroups}
          </span>
          <FloatingActionButton
            // Plus button
            mini={true}
            style={{}}
            onClick={(e) => this.addGroup(e)}
          >
            <ContentAdd />
          </FloatingActionButton>

          <RaisedButton
            // Group create main button
            onClick={(e) => this.createGroups(e)}
            backgroundColor={'#efefef'}
            style={{
              height: 36,
              marginLeft: 45,
              position: 'relative',
              bottom: 10,
            }}
          >
            <span
              style={{
                paddingLeft: 15,
                paddingRight: 15,
              }}
            >
              Create Groups
            </span>
          </ RaisedButton>
        </div>

        {
          // Add group and accounts icons
          groupsProto.map(
            (groupAccountsLength, index) => (
              <div key={index}>
                <Group style={style.iconGroup} />
                {
                  // Add as many user icons as groupAccountsLength
                  Array(groupAccountsLength).fill('').map(
                    (ignored, index)=> <PersonOutline key={index} style={style.iconAccount} />
                  )
                }
              </div>
            )
          )
        }
      </div>
    )
  }
}

export default GroupAutomatic
