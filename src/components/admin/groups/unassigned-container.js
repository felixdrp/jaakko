import React, { PropTypes, Component } from 'react'

import { UnassignedView } from './';

import filterAccountsByGroup from './filter-accounts-by-group'


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
      unassignedAccounts = filterAccountsByGroup('unassigned', props.accounts, props.selectedAccounts)
    }

    return (
      <div>
        <UnassignedView
          accounts={ unassignedAccounts }
          unassignSelectedAccounts={ props.unassignSelectedAccounts }
          selectionHandler={props.selectionHandler}
        />
      </div>
    )
  }
}

export default UnassignedContainer
