import React, { PropTypes, Component } from 'react'

import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';

import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import Group from 'material-ui/svg-icons/social/group';

class AccountsPerGroupView extends Component {
  static propTypes = {
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor() {
    super()
    this.state = {
      openMenus: [],
      anchorEl: [],
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    let openMenus = this.state.openMenus.slice()
    let anchorEl = this.state.anchorEl.slice()
    let index = Number( event.currentTarget.attributes.getNamedItem('name').value )

    openMenus[index] = true
    anchorEl[index] = event.currentTarget

    this.setState({
      openMenus,
      anchorEl,
    });
  };

  handleRequestClose = (index) => {
    let openMenus = this.state.openMenus.slice()

    openMenus[index] = false
    this.setState({
      openMenus,
    });
  };

  render() {
    let props = this.props
    let context = this.context
    let index = props.groupName

    return (
      <span
        style={{
          marginLeft: 40,
        }}
      >
        <span
          style={{
            color: '#6c6c6c',
            fontSize: 13,
          }}
        >
          <Group style={{
            color: '#6c6c6c',
            position: 'relative',
            top: 6,
            marginRight: 7,
            height: 21,
          }} />
          { props.groupName }
          <span style={{ marginLeft: 7, }} >
            Type { props.groupType }
          </span>
        </span>

        <span
          name={index}
          style={{
            color: '#6c6c6c',
            marginLeft: 10,
          }}
          onTouchTap={this.handleTouchTap}
        >
          <PersonOutline style={{
            color: '#6c6c6c',
            position: 'relative',
            top: 6,
            height: 21,
          }} />
          x{ props.groupAccounts.length }
        </span>
        <Popover
          name={index}
          open={this.state.openMenus[index] || false}
          anchorEl={this.state.anchorEl[index]}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={ () => this.handleRequestClose(index) }
        >
          <Menu>
            {
              props.groupAccounts.map(
                (account) => <MenuItem key={account} primaryText={account} />
              )
            }
          </Menu>
        </Popover>
      </span>
    );
  }
}

export default AccountsPerGroupView
