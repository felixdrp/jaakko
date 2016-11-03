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

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

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
      var number = Math.round(Math.random() * 15 + 1);
      sum += number;
      numbers.push(number);
    }
    results.push({ numbers: numbers, sum: sum, solution: undefined, timeSubmitted: undefined });
  }
  return results;
}

function formatNumbers(numberArray) {
  var result = '';
  for (var n in numberArray) {
    result += numberArray[n] + " + ";
  }
  return result.slice(0, result.length - 2) + '= ';
}

var instructions = 'Solve as many math problems as you can in 7 minutes';

var MathChallenge = function (_Component) {
  (0, _inherits3.default)(MathChallenge, _Component);

  function MathChallenge(props) {
    (0, _classCallCheck3.default)(this, MathChallenge);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MathChallenge.__proto__ || (0, _getPrototypeOf2.default)(MathChallenge)).call(this, props));

    _this.gatherData = function () {
      //console.log( JSON.stringify(this.state) );
      _this.setState({ isSubmitted: true });
      // debugger
      _this.props.submit(_this.state);
    };

    _this.state = { numbers: getNumbers(30, 5)
    };

    return _this;
  }

  (0, _createClass3.default)(MathChallenge, [{
    key: 'handleSave',
    value: function handleSave(text) {
      favourites;
      if (text.length !== 0) {
        this.props.addTodo(text);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      // componentDidMount is called by react when the component
      // has been rendered on the page. We can set the interval here:

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
    key: 'handleChange',
    value: function handleChange(event, index, value, id) {
      var numbers = this.state.numbers.slice();
      var index = id.split("_")[1];
      numbers[index].solution = value;
      numbers[index].timeSubmitted = Date.now();
      this.setState({ numbers: numbers });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props;

      var title = this.props.message ? this.props.message : 'Math Challenge';
      var elapsed = Math.round(this.state.elapsed / 100);
      var seconds = (elapsed / 10).toFixed(1);

      var textColor = this.context.muiTheme.palette.textColor;


      if (this.state.isSubmitted) {

        return _react2.default.createElement(_wait2.default, null);
      }

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
            instructions.split('\n').map(function (item, i) {
              return _react2.default.createElement(
                'div',
                { key: i, style: { marginBottom: 20 } },
                item
              );
            }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_timer2.default, {
              limitTime: 20,
              timerCallback: function timerCallback() {
                return _this2.gatherData();
              }
            }),
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
                    },
                    onChange: function onChange(event, index, value) {
                      return _this2.handleChange(event, value, index, 'math_' + i);
                    }
                  })
                );
              })
            ),
            _react2.default.createElement('br', null)
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
