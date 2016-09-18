'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _class = require('material-ui/svg-icons/action/class');

var _class2 = _interopRequireDefault(_class);

var _language = require('material-ui/svg-icons/action/language');

var _language2 = _interopRequireDefault(_language);

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

var _generalInfoContainer = require('./general-info-container');

var _generalInfoContainer2 = _interopRequireDefault(_generalInfoContainer);

var _sessionTrackerContainer = require('./session-tracker-container');

var _sessionTrackerContainer2 = _interopRequireDefault(_sessionTrackerContainer);

var _serverActions = require('../../../websocket-message/server-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// groups
var SessionManager = function (_Component) {
  (0, _inherits3.default)(SessionManager, _Component);

  function SessionManager() {
    (0, _classCallCheck3.default)(this, SessionManager);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SessionManager.__proto__ || (0, _getPrototypeOf2.default)(SessionManager)).call(this));

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
      // console.log('select an account!!! > ' + accountId)
    };

    _this.unassignAccount = function (accountId) {
      // console.log('unassign an account!!! > ' + accountId)
      // console.log(this.props)
      _this.props.wsSession.send((0, _serverActions.wsUnassignAccount)(accountId));
    };

    _this.unassignSelectedAccounts = function () {
      // console.log('unassign!!!')
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
      // console.log('assign to group !!! > ' + groupId)
    };

    _this.addGroup = function (name) {
      // send WsAddGroup
      _this.props.wsSession.send((0, _serverActions.wsGroupAdd)());
      // console.log('addgroup!!!')
      // console.log(this.props)
    };

    _this.removeGroup = function (groupId) {
      // send WsAddGroup
      _this.props.wsSession.send((0, _serverActions.wsGroupRemove)(groupId));
    };

    _this.automateGroupCreation = function (numberOfGroups) {
      // send WsAddGroup
      _this.props.wsSession.send((0, _serverActions.wsAutomateGroupsCreation)(numberOfGroups));
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


  (0, _createClass3.default)(SessionManager, [{
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
            _react2.default.createElement(_class2.default, null),
            ' Session manager '
          ),
          subtitle: 'Session manager'
        }),
        _react2.default.createElement(_generalInfoContainer2.default, { storeSession: this.props.storeSession }),
        _react2.default.createElement(_Card.CardHeader, {
          title: _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_language2.default, null),
            ' Session Tracker '
          )
        }),
        _react2.default.createElement(_sessionTrackerContainer2.default, { storeSession: this.props.storeSession })
      );
    }
  }]);
  return SessionManager;
}(_react.Component);

// Icons

// import FlatButton from 'material-ui/FlatButton';


SessionManager.propTypes = {
  // groups: PropTypes.object,
  // unassignedAccounts: PropTypes.object,
};
SessionManager.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = SessionManager;
//# sourceMappingURL=session-manager.js.map
