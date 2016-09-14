'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Star = function (_Component) {
  (0, _inherits3.default)(Star, _Component);

  function Star() {
    (0, _classCallCheck3.default)(this, Star);
    return (0, _possibleConstructorReturn3.default)(this, (Star.__proto__ || (0, _getPrototypeOf2.default)(Star)).apply(this, arguments));
  }

  (0, _createClass3.default)(Star, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var nameMap = {
        isDisabled: 'is-disabled',
        isActive: 'is-active',
        willBeActive: 'will-be-active'
      };
      var className = (0, _keys2.default)(nameMap).filter(function (prop) {
        return _this2.props[prop];
      }).map(function (prop) {
        return nameMap[prop];
      }).join(' ');
      return _react2.default.createElement(
        'a',
        { className: className },
        '★'
      );
    }
  }]);
  return Star;
}(_react.Component);

exports.default = Star;


Star.defaultProps = {
  willBeActive: false,
  isActive: false,
  isDisabled: false
};

Star.propTypes = {
  isActive: _react.PropTypes.bool,
  willBeActive: _react.PropTypes.bool,
  isDisabled: _react.PropTypes.bool
};
//# sourceMappingURL=star.js.map
