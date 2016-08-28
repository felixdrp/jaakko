import React, { PropTypes, Component } from 'react'

import { UnassignedView } from './';

import Immutable from 'immutable'


class UnassignedContainer extends Component {
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
    console.log(this.context)
    const style = {
      gray: {
        color: '#565555'
      }
    }
    let props = this.props
    let unassignedAccounts = {
      list: [],
    }

    if (props.accounts) {
      // Filter the accounts with groups
      unassignedAccounts.list = props.accounts.list.filter(
        (accountId) => props.accounts[accountId].group == 'unassigned'? true: false
      )
      // Add accounts unassigned
      unassignedAccounts.list.map(
        (accountId) => {
          unassignedAccounts[accountId] = Immutable.fromJS({
            firstName: props.accounts[accountId].firstName,
            email: props.accounts[accountId].email,
            selected: props.selectedAccounts.includes(accountId),
          }).toJS()
        }
      )
    }

    return (
      <div>
        <UnassignedView
          accounts={ unassignedAccounts }
          assignToGroup={ ()=> {} }
          selectionHandler={props.selectionHandler}
          // removeGroup={ () => {} }
        />
      </div>
    )
  }
}

export default UnassignedContainer
