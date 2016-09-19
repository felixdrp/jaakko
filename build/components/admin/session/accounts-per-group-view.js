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

var _Menu = require('material-ui/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Popover = require('material-ui/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _personOutline = require('material-ui/svg-icons/social/person-outline');

var _personOutline2 = _interopRequireDefault(_personOutline);

var _group = require('material-ui/svg-icons/social/group');

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AccountsPerGroupView = function (_Component) {
  (0, _inherits3.default)(AccountsPerGroupView, _Component);

  function AccountsPerGroupView() {
    (0, _classCallCheck3.default)(this, AccountsPerGroupView);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AccountsPerGroupView.__proto__ || (0, _getPrototypeOf2.default)(AccountsPerGroupView)).call(this));

    _this.handleTouchTap = function (event) {
      // This prevents ghost click.
      event.preventDefault();
      var openMenus = _this.state.openMenus.slice();
      var anchorEl = _this.state.anchorEl.slice();
      var index = Number(event.currentTarget.attributes.getNamedItem('name').value);

      openMenus[index] = true;
      anchorEl[index] = event.currentTarget;

      _this.setState({
        openMenus: openMenus,
        anchorEl: anchorEl
      });
    };

    _this.handleRequestClose = function (index) {
      var openMenus = _this.state.openMenus.slice();

      openMenus[index] = false;
      _this.setState({
        openMenus: openMenus
      });
    };

    _this.state = {
      openMenus: [],
      anchorEl: []
    };
    return _this;
  }

  (0, _createClass3.default)(AccountsPerGroupView, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var context = this.context;
      var index = props.groupName;

      return _react2.default.createElement(
        'span',
        {
          style: {
            marginLeft: 40
          }
        },
        _react2.default.createElement(
          'span',
          {
            style: {
              color: '#6c6c6c',
              fontSize: 13
            }
          },
          _react2.default.createElement(_group2.default, { style: {
              color: '#6c6c6c',
              position: 'relative',
              top: 6,
              marginRight: 7,
              height: 21
            } }),
          props.groupName,
          _react2.default.createElement(
            'span',
            { style: { marginLeft: 7 } },
            'Type ',
            props.groupType
          )
        ),
        _react2.default.createElement(
          'span',
          {
            name: index,
            style: {
              color: '#6c6c6c',
              marginLeft: 10
            },
            onTouchTap: this.handleTouchTap
          },
          _react2.default.createElement(_personOutline2.default, { style: {
              color: '#6c6c6c',
              position: 'relative',
              top: 6,
              height: 21
            } }),
          'x',
          props.groupAccounts.length
        ),
        _react2.default.createElement(
          _Popover2.default,
          {
            name: index,
            open: this.state.openMenus[index] || false,
            anchorEl: this.state.anchorEl[index],
            anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
            targetOrigin: { horizontal: 'left', vertical: 'top' },
            onRequestClose: function onRequestClose() {
              return _this2.handleRequestClose(index);
            }
          },
          _react2.default.createElement(
            _Menu2.default,
            null,
            props.groupAccounts.map(function (account) {
              return _react2.default.createElement(_MenuItem2.default, { key: account, primaryText: account });
            })
          )
        )
      );
    }
  }]);
  return AccountsPerGroupView;
}(_react.Component);

AccountsPerGroupView.propTypes = {};
AccountsPerGroupView.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = AccountsPerGroupView;
//# sourceMappingURL=accounts-per-group-view.js.map
