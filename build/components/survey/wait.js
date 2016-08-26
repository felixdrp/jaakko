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

var _Card = require('material-ui/Card');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Wait = function (_Component) {
  (0, _inherits3.default)(Wait, _Component);

  function Wait() {
    (0, _classCallCheck3.default)(this, Wait);
    return (0, _possibleConstructorReturn3.default)(this, (Wait.__proto__ || (0, _getPrototypeOf2.default)(Wait)).apply(this, arguments));
  }

  (0, _createClass3.default)(Wait, [{
    key: 'routerWillLeave',
    value: function routerWillLeave(location, callback) {
      console.log('mlk');
      // if callback then go fordward
      callback();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.context.router.listenBefore(this.routerWillLeave);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // this.context.router.unregisterTransitionHook(this.routerWillLeave);
    }
  }, {
    key: 'handleSave',
    value: function handleSave(text) {
      if (text.length !== 0) {
        this.props.addTodo(text);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var message = this.props.message ? this.props.message : 'Please, wait a moment...';
      var textColor = this.context.muiTheme.palette.textColor;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Card.Card,
          {
            style: {
              padding: 30
            }
          },
          _react2.default.createElement(_Card.CardHeader, {
            title: message,
            titleStyle: {
              fontSize: 24,
              color: textColor
            }
          }),
          _react2.default.createElement(_Card.CardText, {
            style: {
              paddingTop: 0
            }
          }),
          _react2.default.createElement(
            'div',
            null,
            'puta puta puta ',
            this.props.melacome,
            ' '
          )
        )
      );
    }
  }]);
  return Wait;
}(_react.Component);

Wait.propTypes = {
  // loginStatus: React.PropTypes.object,
};
Wait.contextTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired,
  router: _react2.default.PropTypes.object.isRequired,
  websocket: _react2.default.PropTypes.object
};
exports.default = Wait;
//# sourceMappingURL=wait.js.map
