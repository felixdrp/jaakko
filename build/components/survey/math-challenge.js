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

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _timer = require('./timer');

var _timer2 = _interopRequireDefault(_timer);

var _reactRedux = require('react-redux');

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* N number of math questions with M numbers. (all additions, and solution included)
*
*/
function getNumbers(N, M) {
  var results = [];
  for (var i = 0; i < N; i++) {
    var numbers = [];
    var sum = 0;
    for (var j = 0; j < M; j++) {
      var number = Math.round(Math.random() * 100 + 1);
      sum += number;
      numbers.push(number);
    }
    results.push({ numbers: numbers, sum: sum });
  }
  //  debugger;
  return results;
}

function formatNumbers(numberArray) {
  var result = '';
  for (var n in numberArray) {
    result += numberArray[n] + " + ";
  }
  return result.slice(0, result.length - 2) + '= ';
}

var instructions = 'For this task you will be asked to solve simple addition problems correct. For example you could be asked to solve the following “56+73+5+10+11” you would simply answer is “155” and move onto the next question. There will be multiple problems and you will be asked to solve as many as possible in the 5 minutes given. The number of correct answers will then be calculated and showed to you after the task is over. \n Your name will appear on a ranking of the group’s performance and your will be ranked from the best performer (person with the most correct answers) to the worst performer (person with the least amount of correct answers). The exact score of the participant in your group will not be shown. \n In this task your pay will depend on your performance relative to the other members in the group. The pay structure will be as shown below. \n The task will have a series of addition problems like the ones below. You will be asked to solve as many as you can in the 5 minutes. Only correct answers will be counted toward your score.';

var MathChallenge = function (_Component) {
  (0, _inherits3.default)(MathChallenge, _Component);

  function MathChallenge(props) {
    (0, _classCallCheck3.default)(this, MathChallenge);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MathChallenge.__proto__ || (0, _getPrototypeOf2.default)(MathChallenge)).call(this, props));

    _this.tick = function () {

      // This function is called every 50 ms. It updates the
      // elapsed counter. Calling setState causes the component to be re-rendered

      _this.setState({ elapsed: new Date() - _this.state.startt });
    };

    _this.state = { elapsed: 0, startt: new Date(), numbers: getNumbers(30, 5) };

    return _this;
  }

  (0, _createClass3.default)(MathChallenge, [{
    key: 'handleSave',
    value: function handleSave(text) {
      if (text.length !== 0) {
        this.props.addTodo(text);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      // componentDidMount is called by react when the component
      // has been rendered on the page. We can set the interval here:
      this.setState({ timer: setInterval(this.tick, 50) });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {

      // This method is called immediately before the component is removed
      // from the page and destroyed. We can clear the interval here:
      // this.state.elapsed = new Date() - this.start);
      clearInterval(this.state.timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var title = this.props.message ? this.props.message : 'Math Challenge';
      var elapsed = Math.round(this.state.elapsed / 100);
      var seconds = (elapsed / 10).toFixed(1);

      var textColor = this.context.muiTheme.palette.textColor;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Card.Card,
          {
            style: {
              padding: 30,
              margin: '2% 10% 10%',
              minWidth: 700
            }
          },
          _react2.default.createElement(_Card.CardHeader, {
            title: title,
            titleStyle: {
              fontSize: 24,
              color: textColor
            }
          }),
          _react2.default.createElement(
            _Card.CardText,
            {
              style: {
                paddingTop: 0
              }
            },
            instructions.split('\n').map(function (item) {
              return _react2.default.createElement(
                'div',
                { key: item, style: { marginBottom: 20 } },
                item
              );
            }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_timer2.default, null),
            _react2.default.createElement(
              'div',
              null,
              this.state.numbers.map(function (q, i) {
                return _react2.default.createElement(
                  'div',
                  { key: i },
                  formatNumbers(q.numbers),
                  _react2.default.createElement(_TextField2.default, { id: 'math_' + i, style: {
                      paddingLeft: 10,
                      marginRight: 20
                    } })
                );
              })
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _FlatButton2.default,
              {
                id: 'submitAnswers',
                style: { backgroundColor: 'grey' },
                type: 'submit'

              },
              'Submit'
            )
          )
        )
      );
    }
  }]);
  return MathChallenge;
}(_react.Component);

MathChallenge.contextTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired,
  router: _react2.default.PropTypes.object.isRequired,
  websocket: _react2.default.PropTypes.object
};


MathChallenge.propTypes = {

  // addTodo: PropTypes.func.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    firstName: state.account.firstName
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MathChallenge);
//# sourceMappingURL=math-challenge.js.map
