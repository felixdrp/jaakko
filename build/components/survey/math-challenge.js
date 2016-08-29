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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MathChallenge = function (_Component) {
  (0, _inherits3.default)(MathChallenge, _Component);

  function MathChallenge() {
    (0, _classCallCheck3.default)(this, MathChallenge);
    return (0, _possibleConstructorReturn3.default)(this, (MathChallenge.__proto__ || (0, _getPrototypeOf2.default)(MathChallenge)).apply(this, arguments));
  }

  (0, _createClass3.default)(MathChallenge, [{
    key: 'handleSave',
    value: function handleSave(text) {
      if (text.length !== 0) {
        this.props.addTodo(text);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var message = this.props.message ? this.props.message : 'Math Challenge';

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          message
        )
      );
    }
  }]);
  return MathChallenge;
}(_react.Component);

MathChallenge.propTypes = {
  // addTodo: PropTypes.func.isRequired
};

exports.default = MathChallenge;
//# sourceMappingURL=math-challenge.js.map
