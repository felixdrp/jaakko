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

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _reactRedux = require('react-redux');

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instructions = 'For this task you will be asked to solve simple addition problems correct. For example you could be asked to solve the following “56+73+5+10+11” you would simply answer is “155” and move onto the next question. There will be multiple problems and you will be asked to solve as many as possible in the 5 minutes given. The number of correct answers will then be calculated and showed to you after the task is over. \n Your name will appear on a ranking of the group’s performance and your will be ranked from the best performer (person with the most correct answers) to the worst performer (person with the least amount of correct answers). The exact score of the participant in your group will not be shown. \n In this task your pay will depend on your performance relative to the other members in the group. The pay structure will be as shown below. \n The task will have a series of addition problems like the ones below. You will be asked to solve as many as you can in the 5 minutes. Only correct answers will be counted toward your score.';

var Timer = function (_Component) {
  (0, _inherits3.default)(Timer, _Component);

  function Timer(props) {
    (0, _classCallCheck3.default)(this, Timer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Timer.__proto__ || (0, _getPrototypeOf2.default)(Timer)).call(this, props));

    _this.setTimer = function (totalSeconds) {
      _this.setState({ totalSeconds: totalSeconds });
    };

    _this.startCountDown = function () {

      // componentDidMount is called by react when the component
      // has been rendered on the page. We can set the interval here:
      _this.setState({ startt: new Date(), timer: setInterval(_this.tick, 50) });
    };

    _this.stopCountDown = function () {

      // This method is called immediately before the component is removed
      // from the page and destroyed. We can clear the interval here:
      // this.state.elapsed = new Date() - this.start);
      clearInterval(_this.state.timer);
    };

    _this.tick = function () {

      // This function is called every 50 ms. It updates the
      // elapsed counter. Calling setState causes the component to be re-rendered
      if (_this.state.elapsed / 1000 >= _this.state.totalSeconds) {
        _this.stopCountDown();
        _this.props.timerCallback();
      }
      _this.setState({ elapsed: new Date() - _this.state.startt });
    };

    _this.state = { elapsed: 0, totalSeconds: 420 };
    return _this;
  }

  (0, _createClass3.default)(Timer, [{
    key: 'handleSave',
    value: function handleSave(text) {
      if (text.length !== 0) {
        this.props.addTodo(text);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var elapsed = this.state.elapsed / 1000;
      var left = this.state.totalSeconds - elapsed > 0 ? this.state.totalSeconds - elapsed : 0;
      var minutes = Math.floor(left / 60);
      var seconds = Math.floor(left % 60).toString().length < 2 ? '0' + Math.floor(left % 60).toString() : Math.floor(left % 60).toString();

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: {
              display: 'inline',
              border: '1px solid black',
              backgroundColor: 'white',
              padding: 7,
              position: 'fixed',
              top: 0,
              left: 0,
              fontWeight: 'bolder',
              fontSize: 'large'
            } },
          ' Time Left: ',
          _react2.default.createElement(
            'div',
            { style: { display: 'inline', color: 'red' } },
            minutes,
            ':',
            seconds
          )
        )
      );
    }
  }]);
  return Timer;
}(_react.Component);

Timer.propTypes = {

  // addTodo: PropTypes.func.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    //firstName : state.account.firstName
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Timer);
//# sourceMappingURL=timer.js.map