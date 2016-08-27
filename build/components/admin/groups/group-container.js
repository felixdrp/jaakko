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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupContainer = function (_Component) {
  (0, _inherits3.default)(GroupContainer, _Component);

  function GroupContainer() {
    (0, _classCallCheck3.default)(this, GroupContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GroupContainer).call(this));

    _this.state = {
      accounts: {},
      groups: {},
      selection: []
    };

    // Used to store references.
    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(GroupContainer, [{
    key: 'render',
    value: function render() {
      console.log(this.context);
      var style = {
        gray: {
          color: '#565555'
        }
      };
      var props = this.props;
      var groupList = '';
      if (props.groups) {
        groupList = this.props.groups.list.map(function (group, index) {
          return _react2.default.createElement(_.GroupView, { key: index, assignToGroup: function assignToGroup() {}, removeGroup: function removeGroup() {} });
        });
      }

      return _react2.default.createElement(
        'div',
        null,
        groupList
      );
    }
  }]);
  return GroupContainer;
}(_react.Component);

GroupContainer.propTypes = {
  groups: _react.PropTypes.object,
  unassignedAccounts: _react.PropTypes.object
};
GroupContainer.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = GroupContainer;
//# sourceMappingURL=group-container.js.map
