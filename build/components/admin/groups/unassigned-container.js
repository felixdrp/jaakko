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

var _ = require('./');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UnassignedContainer = function (_Component) {
  (0, _inherits3.default)(UnassignedContainer, _Component);

  function UnassignedContainer() {
    (0, _classCallCheck3.default)(this, UnassignedContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(UnassignedContainer).call(this));

    _this.state = {
      accounts: {},
      groups: {},
      selection: []
    };

    // Used to store references.
    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(UnassignedContainer, [{
    key: 'render',
    value: function render() {
      console.log(this.context);
      var style = {
        gray: {
          color: '#565555'
        }
      };
      var props = this.props;
      var unassignedAccounts = {
        list: []
      };

      if (props.accounts) {
        // Filter the accounts with groups
        unassignedAccounts.list = props.accounts.list.filter(function (accountId) {
          return props.accounts[accountId].group == 'unassigned' ? true : false;
        });
        // Add accounts unassigned
        unassignedAccounts.list.map(function (accountId) {
          unassignedAccounts[accountId] = _immutable2.default.fromJS({
            firstName: props.accounts[accountId].firstName,
            email: props.accounts[accountId].email,
            selected: props.selectedAccounts.includes(accountId)
          }).toJS();
        });
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_.UnassignedView, {
          accounts: unassignedAccounts,
          assignToGroup: function assignToGroup() {},
          selectionHandler: props.selectionHandler
          // removeGroup={ () => {} }
        })
      );
    }
  }]);
  return UnassignedContainer;
}(_react.Component);

UnassignedContainer.propTypes = {
  groups: _react.PropTypes.object,
  unassignedAccounts: _react.PropTypes.object
};
UnassignedContainer.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = UnassignedContainer;
//# sourceMappingURL=unassigned-container.js.map
