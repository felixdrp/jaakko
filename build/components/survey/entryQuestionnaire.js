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

var _reactRedux = require('react-redux');

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

var _svgIcons = require('material-ui/svg-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var v = "MELACO";

var Question = function (_Component) {
  (0, _inherits3.default)(Question, _Component);

  function Question() {
    (0, _classCallCheck3.default)(this, Question);
    return (0, _possibleConstructorReturn3.default)(this, (Question.__proto__ || (0, _getPrototypeOf2.default)(Question)).apply(this, arguments));
  }

  (0, _createClass3.default)(Question, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      console.log(" LO ICE ANNTESS CON H DE PUTA");
    }
  }, {
    key: 'handleSave',
    value: function handleSave(text) {
      if (text.length !== 0) {
        this.props.addTodo(text);
      }
    }
  }, {
    key: 'mlk',
    value: function mlk() {
      return 'm l come';
    }
  }, {
    key: 'render',
    value: function render() {
      // let message = this.props.message? this.props.message : 'Question'
      var message = 'Question';

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          message
        ),
        _react2.default.createElement(_wait2.default, { melacome: 10 }),
        _react2.default.createElement(_svgIcons.ActionStore, null),
        ' ',
        _react2.default.createElement(_svgIcons.ActionShop, null),
        _react2.default.createElement(
          'div',
          null,
          ' ',
          this.props.firstName,
          ' ',
          v,
          ' ',
          this.mlk()
        )
      );
    }
  }]);
  return Question;
}(_react.Component);

Question.propTypes = {}
// addTodo: PropTypes.func.isRequired


//export default Question

;var mapStateToProps = function mapStateToProps(state) {
  return {
    firstName: state.account.firstName
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Question);
//# sourceMappingURL=entryQuestionnaire.js.map
