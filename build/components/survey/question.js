'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _reactRedux = require('react-redux');

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

var _svgIcons = require('material-ui/svg-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// var entryQuestionnarie = {
//   introText : "",
//
//   questions : [
//     {
//       name : "",
//       text : "",
//       type : "",
//       typeVars : {}
//     },
//   ],
// };
var TEXT_FIELD_TYPE = 'textField';
var LIST_FIELD_TYPE = 'listField';

var entryQuestionnarie = {
  introTitle: 'Entry Survey',
  introText: 'The following questionnaire will take approximately 10 minutes, all questions are optional and can be skipped if they are seen to be intrusive, however it would be appreciated if all questions were answered as it will allow the results to be analysed with more accuracy. The participation in this experiment and questionnaire is optional and the subject can withdraw at any point, no questions asked. All information will be kept confidential and is strictly for research purposes. ',

  questions: [{
    name: 'age',
    text: 'Age',
    type: TEXT_FIELD_TYPE,
    typeVars: {}
  }, {
    name: 'gender',
    text: 'Gender',
    type: LIST_FIELD_TYPE,
    typeVars: { opts: ['male', 'female'] }
  }]
};

var Question = function (_Component) {
  (0, _inherits3.default)(Question, _Component);

  function Question(props) {
    (0, _classCallCheck3.default)(this, Question);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Question.__proto__ || (0, _getPrototypeOf2.default)(Question)).call(this, props));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Question, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'handleSave',
    value: function handleSave(text) {
      if (text.length !== 0) {
        this.props.addTodo(text);
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event, index, value, name) {
      //  debugger;
      this.setState((0, _defineProperty3.default)({}, name, value));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // let message = this.props.message? this.props.message : 'Question'
      var message = 'Question';

      var textColor = this.context.muiTheme.palette.textColor;


      var title = entryQuestionnarie.introTitle;
      var text = entryQuestionnarie.introText;

      var qs = entryQuestionnarie.questions.map(function (q, i) {
        switch (q.type) {
          case TEXT_FIELD_TYPE:
            return _react2.default.createElement(
              'div',
              { key: i },
              q.text,
              _react2.default.createElement(_TextField2.default, { id: q.name, style: {
                  paddingLeft: 10
                } }),
              _react2.default.createElement('br', null)
            );

          case LIST_FIELD_TYPE:
            return _react2.default.createElement(
              'div',
              { key: i },
              q.text,
              _react2.default.createElement(
                _SelectField2.default,
                {
                  style: { paddingLeft: 10 },
                  id: q.name,
                  value: _this2.state[q.name],
                  onChange: function onChange(event, index, value) {
                    return _this2.handleChange(event, index, value, q.name);
                  }
                },
                q.typeVars.opts.map(function (q, i) {
                  return _react2.default.createElement(_MenuItem2.default, { key: i, value: q, primaryText: q });
                })
              ),
              _react2.default.createElement('br', null)
            );

          default:

        }
      });

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
            text,
            _react2.default.createElement('br', null),
            qs,
            _react2.default.createElement(
              _FlatButton2.default,
              {
                id: 'submitAnswers',
                style: { color: 'white' },
                type: 'submit'
              },
              'Submit'
            )
          )
        )
      );
    }
  }]);
  return Question;
}(_react.Component);

Question.contextTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired,
  router: _react2.default.PropTypes.object.isRequired,
  websocket: _react2.default.PropTypes.object
};


Question.propTypes = {}
// addTodo: PropTypes.func.isRequired


//export default Question

;var mapStateToProps = function mapStateToProps(state) {
  return {
    firstName: state.account.firstName
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Question);
//# sourceMappingURL=question.js.map
