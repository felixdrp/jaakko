'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('material-ui/Card');

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _group = require('material-ui/svg-icons/social/group');

var _group2 = _interopRequireDefault(_group);

var _groupAdd = require('material-ui/svg-icons/social/group-add');

var _groupAdd2 = _interopRequireDefault(_groupAdd);

var _personOutline = require('material-ui/svg-icons/social/person-outline');

var _personOutline2 = _interopRequireDefault(_personOutline);

var _developerBoard = require('material-ui/svg-icons/hardware/developer-board');

var _developerBoard2 = _interopRequireDefault(_developerBoard);

var _memory = require('material-ui/svg-icons/hardware/memory');

var _memory2 = _interopRequireDefault(_memory);

var _modeEdit = require('material-ui/svg-icons/editor/mode-edit');

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _close = require('material-ui/svg-icons/navigation/close');

var _close2 = _interopRequireDefault(_close);

var _ = require('./');

var _serverActions = require('../../../websocket-message/server-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Icons

// import FlatButton from 'material-ui/FlatButton';

var GroupManager = function (_Component) {
  (0, _inherits3.default)(GroupManager, _Component);

  function GroupManager() {
    (0, _classCallCheck3.default)(this, GroupManager);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GroupManager).call(this));

    _this.selectAccount = function (accountId, maintainPrevSelection) {
      var prevSelected = _this.state.selectedAccounts;
      var selected = [];
      if (maintainPrevSelection.ctrlKey) {
        // Alredy in the list? then remove
        if (prevSelected.includes(accountId)) {
          selected = prevSelected;
          selected.splice(selected.indexOf(accountId), 1);
        } else {
          selected = _this.state.selectedAccounts.concat(accountId);
        }
      } else {
        // If not selected select
        if (!prevSelected.includes(accountId)) {
          selected = [accountId];
        }
      }

      _this.setState({ selectedAccounts: selected });
      // debugger
      console.log('select an account!!! > ' + accountId);
    };

    _this.unassignAccount = function (accountId) {
      console.log('unassign an account!!! > ' + accountId);
      console.log(_this.props);
      _this.props.wsSession.send((0, _serverActions.wsUnassignAccount)(accountId));
    };

    _this.unassignSelectedAccounts = function () {
      console.log('unassign!!!');
      _this.props.wsSession.send((0, _serverActions.wsUnassignSelectedAccounts)(_this.state.selectedAccounts));
      _this.setState({ selectedAccounts: [] });
    };

    _this.assignSelectedAccountsToGroup = function (event, groupId) {
      if (event.nativeEvent.defaultPrevented) {
        return;
      }

      var selected = _this.state.selectedAccounts;

      // send selection and groupid to server
      _this.props.wsSession.send((0, _serverActions.wsAssignSelectedAccountsToGroup)(groupId, selected));

      _this.setState({ selectedAccounts: [] });
      console.log('assign to group !!! > ' + groupId);
    };

    _this.addGroup = function (name) {
      // send WsAddGroup
      _this.props.wsSession.send((0, _serverActions.wsGroupAdd)());
      console.log('addgroup!!!');
      // console.log(this.props)
    };

    _this.removeGroup = function (groupId) {
      // send WsAddGroup
      _this.props.wsSession.send((0, _serverActions.wsGroupRemove)(groupId));
    };

    _this.state = {
      accounts: {},
      groups: {},
      selectedAccounts: []
    };

    // Used to store references.
    _this._input = {};
    return _this;
  }

  // Add or remove a selection
  // if maintainPrevSelection == true it will maintain the previus selection


  // Free an account from group


  // Free the selected accounts from groups


  // Free the selected accounts from groups


  (0, _createClass3.default)(GroupManager, [{
    key: 'render',
    value: function render() {
      console.log(this.context);
      var style = {
        gray: {
          color: '#565555'
        }
      };
      return _react2.default.createElement(
        _Card.Card,
        {
          style: {
            paddingBottom: 20
          }
        },
        _react2.default.createElement(_Card.CardHeader, {
          title: _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_group2.default, null),
            ' Groups manager '
          ),
          subtitle: 'Groups manager'
          // avatar="images/jsa-128.jpg"
        }),
        _react2.default.createElement(_Card.CardTitle, {
          title: _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_group2.default, { style: style.gray }),
            _react2.default.createElement(_developerBoard2.default, { style: (0, _extends3.default)({}, style.gray, { marginRight: 10 }) }),
            'Groups automated'
          ),
          subtitle: 'Groups creation with AI help'
        }),
        _react2.default.createElement(
          _Card.CardText,
          null,
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.'
        ),
        _react2.default.createElement(_Card.CardTitle, {
          title: _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_group2.default, { style: style.gray }),
            _react2.default.createElement(_modeEdit2.default, { style: (0, _extends3.default)({}, style.gray, { marginRight: 10 }) }),
            'Groups customization'
          ),
          subtitle: 'Groups manual fine customization'
        }),
        _react2.default.createElement(_.UnassignedContainer, {
          accounts: this.props.accounts,
          selectedAccounts: this.state.selectedAccounts,
          unassignSelectedAccounts: this.unassignSelectedAccounts,
          selectionHandler: this.selectAccount
        }),
        _react2.default.createElement(
          'div',
          {
            // Assign Groups
            // Groups Chips
            style: {
              minWidth: '95%',
              margin: '2.5%',
              marginTop: 65
            }
          },
          _react2.default.createElement(
            _RaisedButton2.default
            // Add group button
            ,
            { onClick: this.addGroup,
              backgroundColor: '#ddffb1',
              style: {
                height: 36,
                // minWidth: '95%',
                marginBottom: 20
              }
            },
            _react2.default.createElement(
              'span',
              {
                style: {
                  paddingLeft: 10,
                  paddingRight: 10
                }
              },
              _react2.default.createElement(_groupAdd2.default, { style: {
                  position: 'relative',
                  top: 6,
                  marginRight: 7
                } }),
              'Add group'
            )
          ),
          _react2.default.createElement(_.GroupContainer, {
            accounts: this.props.accounts,
            groups: this.props.groups,
            selectedAccounts: this.state.selectedAccounts,
            removeGroup: this.removeGroup,
            unassignAccount: this.unassignAccount,
            assignSelectedAccountsToGroup: this.assignSelectedAccountsToGroup,
            selectionHandler: this.selectAccount
          })
        )
      );
    }
  }]);
  return GroupManager;
}(_react.Component);

// groups


GroupManager.propTypes = {
  groups: _react.PropTypes.object,
  unassignedAccounts: _react.PropTypes.object
};
GroupManager.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = GroupManager;
//# sourceMappingURL=group-manager.js.map
