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

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _IconMenu = require('material-ui/IconMenu');

var _IconMenu2 = _interopRequireDefault(_IconMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _memory = require('material-ui/svg-icons/hardware/memory');

var _memory2 = _interopRequireDefault(_memory);

var _modeEdit = require('material-ui/svg-icons/editor/mode-edit');

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _close = require('material-ui/svg-icons/navigation/close');

var _close2 = _interopRequireDefault(_close);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Icons

var AccountSignIn = function (_React$Component) {
  (0, _inherits3.default)(AccountSignIn, _React$Component);

  function AccountSignIn() {
    (0, _classCallCheck3.default)(this, AccountSignIn);
    return (0, _possibleConstructorReturn3.default)(this, (AccountSignIn.__proto__ || (0, _getPrototypeOf2.default)(AccountSignIn)).apply(this, arguments));
  }

  (0, _createClass3.default)(AccountSignIn, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_AppBar2.default, {
          title: 'Study Admin',
          iconElementLeft: _react2.default.createElement(
            _IconButton2.default,
            null,
            _react2.default.createElement(_memory2.default, null)
          ),
          iconElementRight: _react2.default.createElement(
            _IconMenu2.default,
            {
              iconButtonElement: _react2.default.createElement(
                _IconButton2.default,
                null,
                _react2.default.createElement(_moreVert2.default, null)
              ),
              targetOrigin: { horizontal: 'right', vertical: 'top' },
              anchorOrigin: { horizontal: 'right', vertical: 'top' }
            },
            _react2.default.createElement(_MenuItem2.default, { primaryText: 'Refresh' }),
            _react2.default.createElement(_MenuItem2.default, { primaryText: 'Help' }),
            _react2.default.createElement(_MenuItem2.default, { primaryText: 'Sign out' })
          )
        })
      );
    }
  }]);
  return AccountSignIn;
}(_react2.default.Component);

exports.default = AppBarExampleIconMenu;
//# sourceMappingURL=control-room.js.map
