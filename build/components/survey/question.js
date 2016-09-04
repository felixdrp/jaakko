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

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('material-ui/Card');

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Slider = require('material-ui/Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _RadioButton = require('material-ui/RadioButton');

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
var SLIDER_FIELD_TYPE = 'sliderField';
var COMMENT_TYPE = 'commentType';
var RADIO_FIELD_TYPE = 'radioFieldType';
var ARRAY_TEXT_FIELD_TYPE = 'arrayTextFieldType';
var ARRAY_LIST_FIELD_TYPE = 'arrayListFieldType';
var ARRAY_SLIDER_FIELD_TYPE = 'arraySliderFieldType';

function likertScaleIntro(text) {

  return _react2.default.createElement(
    'div',
    { style: {
        minWidth: 800,
        width: '85%',
        marginTop: 40,
        borderLeftWidth: 15,
        borderLeftStyle: 'solid',
        borderColor: 'grey',
        paddingLeft: 5
      }
    },
    text,
    'Please use the following scale to answer the given questions.',
    _react2.default.createElement(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 20

        }
      },
      (0, _from2.default)(Array(11).keys()).map(function (i) {
        return _react2.default.createElement(
          'span',
          { key: i },
          i * 10
        );
      })
    ),
    _react2.default.createElement(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'space-between'
        }
      },
      ['Cannot do at all', 'Moderately	can do', 'Highly certain can do'].map(function (t, i) {
        return _react2.default.createElement(
          'span',
          { key: i },
          t
        );
      })
    ),
    _react2.default.createElement(
      'div',
      { style: {
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 20
        } },
      _react2.default.createElement(
        'span',
        null,
        'Confidence (0-100)'
      )
    )
  );
}

function fillGapIntro(text) {

  return _react2.default.createElement(
    'div',
    { style: {
        minWidth: 800,
        width: '85%',
        marginTop: 40,
        borderLeftWidth: 15,
        borderLeftStyle: 'solid',
        borderColor: 'grey',
        paddingLeft: 5
      }
    },
    _react2.default.createElement(
      'span',
      null,
      text,
      'Please read each statement. Where there is a blank _____, decide what your normal or usual attitude, feeling, or behaviour would be: '
    ),
    _react2.default.createElement(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'space-between'
        }
      },
      ['(A) Rarely (Less than 10% of the time)', '(B) OCCASIONALY (About 30% of the time)', '(C) SOMETIMES (About half the time)', '(D) FREQUENTLY (About 70% of the time)', '(E) USUALLY (More than 90% of the time)'].map(function (t, i) {
        return _react2.default.createElement(
          'span',
          { key: i, style: { paddingRight: 20, paddingTop: 20 } },
          t
        );
      })
    ),
    _react2.default.createElement('br', null),
    _react2.default.createElement(
      'span',
      null,
      'Of course, there are always unusual situations in which this would not be the case, but think of what you would do or feel in most normal situations. Click on the empty space and select the option that describes your usual attitude or behaviour. '
    )
  );
}

function getTextPart(t, p) {
  var bits = t.split(/[_]+/);
  if (bits[p]) return bits[p];
}

var questionnaire;

var entryQuestionnarie = {
  introTitle: 'Entry Survey',
  introText: 'The following questionnaire will take approximately 10 minutes, all questions are optional and can be skipped if they are seen to be intrusive, however it would be appreciated if all questions were answered as it will allow the results to be analysed with more accuracy. The participation in this experiment and questionnaire is optional and the subject can withdraw at any point, no questions asked. All information will be kept confidential and is strictly for research purposes. ',

  questions: [{
    name: 'age',
    text: '1. Age',
    type: TEXT_FIELD_TYPE,
    typeVars: {}
  }, {
    name: 'gender',
    text: '2. Gender Identification',
    type: LIST_FIELD_TYPE,
    typeVars: { opts: ['male', 'female', 'other'] }
  }, {
    name: 'degree',
    text: '3. Degree',
    type: TEXT_FIELD_TYPE,
    typeVars: {}
  }, {
    name: 'degree_year',
    text: '4. Year of Degree (As a number Please)',
    type: TEXT_FIELD_TYPE,
    typeVars: {}
  }, {
    name: 'hobbies',
    text: '5. What are your hobbies (For example a club or clubs you belong to)?',
    type: TEXT_FIELD_TYPE,
    typeVars: {}
  }, {
    name: '',
    text: likertScaleIntro('6. '),
    type: COMMENT_TYPE,
    typeVars: {}
  }, {
    name: 'jobConfidence',
    text: ['I’m confident that I can do an excellent job on my math tests.', 'I’m Certain I can understand the most difficult material presented in math texts', 'I am confident I can do an excellent job on my math assignments.', 'I am certain I can master the skills being taught in my math class.', 'I’m confident I can understand the most difficult material presented by my math teacher.'],
    type: ARRAY_SLIDER_FIELD_TYPE,
    typeVars: {}
  }, {
    name: '',
    text: likertScaleIntro('7. '),
    type: COMMENT_TYPE,
    typeVars: {}
  }, {
    name: 'jobNovelty',
    text: ['I feel that I am good at generating novel ideas.', 'I have confidence in my ability to solve problems.', 'I Have a knack for further developing the ideas of others.', 'I am good at Finding creative ways to solve problems'],
    type: ARRAY_SLIDER_FIELD_TYPE,
    typeVars: {}
  }, {
    name: '',
    text: fillGapIntro('8. '),
    type: COMMENT_TYPE,
    typeVars: {}
  }, {
    name: 'probemSolvingSkills',
    text: ['1. When faced with a problem I ______ try to forget it.', '2. I _____ need frequent encouragement from others for me to keep working at a difficult task.', '3. I _____ like jobs where I can make decisions and be responsible for my own work', '4. I _____ Change my opinion when someone I admire disagrees with me', '5. If I want something I ____ work hard to get it.', '6. I ____ prefer to learn the facts about something from someone else rather than have to dig them out for myself.', '7. I will ____ accept jobs that require me to supervise others.', '8. I ____ Have a hard time saying “no” when someone tries to sell me something I don’t want.', '9. I ____ like to have a say in any decision made by any group I’m in.', '10. I ____ consider the different sides of an issue before making any decisions.', '11. What other people think _____ has a great influence on my behaviour.', '12. Whenever something good happens to me I _____ feel it is because I’ve earned it.', '13. I ____ enjoy being in a position of leadership.', '14. I ____ need someone else to praise my work before I am satisfied with what I’ve done.', '15. I am ____ sure enough of my opinions to try and influence others.', '16. When something is going to affect me I ____ learn as much about it as I can.', '17. I ____ decide to do things on the spur of the moment.', '18. For me, knowing I’ve done something well is ____ more important that being praised by someone else.', '19. I ____ let other peoples’ demands keep me from doing things I want to do.', '20. I ____ stick to my opinions when someone disagrees with me.', '21. I ____ do what I feel like doing not what other people think I ought to do.', '22. I ____ get discouraged when doing something that takes a long time to achieve results.', '23. When part of a group I ____ prefer to let other people make all the decisions.', '24. When I have a problem I ____ follow the advice of friends or relatives.', '25. I ____ enjoy trying to do difficult tasks more than I enjoy trying to do easy tasks.', '26. I ____ prefer situations where I can depend on someone else’s ability rather than just my own. ', '27. Having someone important tell me I did a good job is ____ more important to me than feeling I’ve done a good job.', '28. When I’m involved in something I ____ try to find out all I can about what is going on even when someone else in in charge.'],
    type: ARRAY_LIST_FIELD_TYPE,
    typeVars: { opts: ['RARELY', 'OCCASIONALY', 'SOMETIMES', 'FREQUENTLY', 'USUALLY'] }
  }]
};

var exitQuestionnaire = {
  introTitle: 'Exit Survey',
  introText: 'The following questionnaire will take approximately 5 minutes, all questions are optional and can be skipped if they are seen to be intrusive, however it would be appreciated if all questioned were answered as it will allow the results to be analysed with more accuracy. The participation in this experiment and questionnaire is optional and the subject can withdraw at any point, no questions asked. All information will be kept anonymous, confidential, and is strictly for research purposes. ',

  questions: [{
    name: 'creativeFamily',
    text: '1. Do you have any siblings or close family members working in the creative industries (movies, tv, writer etc.)?',
    type: TEXT_FIELD_TYPE,
    typeVars: {}
  }, {
    name: 'creativePreviousSchool',
    text: '2. Have you been to an art school before the institution you attend now?',
    type: TEXT_FIELD_TYPE,
    typeVars: {}
  }, {
    name: 'creativePreviousSchool',
    text: '3. Have you gone to a Steiner School or a Waldorf school? ',
    type: TEXT_FIELD_TYPE,
    typeVars: {}
  }, {
    name: 'experimentSatisfaction',
    text: '4. How satisfied are you with your overall performance in the experiment?',
    type: LIST_FIELD_TYPE,
    typeVars: { opts: ['a. Very satisfied', 'b. Satisfied', 'c. Quite satisfied', 'd. Quite unsatisfied', 'e. Unsatisfied', 'f. Very unsatisfied'] }
  }, {
    name: 'countryGrowUp',
    text: '5. What country and city did you grow up in until you were 18? (please indicate country or countries along with the relevant postcode)',
    type: TEXT_FIELD_TYPE,
    typeVars: {}
  }, {
    name: 'preferredPayment',
    text: '6. Assuming you gain £200 would you prefer to… (circle the preferred answer)',
    type: RADIO_FIELD_TYPE,
    typeVars: { opts: ['a. Stay at £200', 'b. Have a 50% chance of receiving £300 and a 50% chance of receiving £100', 'c. Have a 50% chance of receiving £400 and a 50% chance of receiving £0', 'd. Have a 10% chance of receiving £1500 and a 90% chance of receiving £0'] }
  }, {
    name: 'howMuchRisk',
    text: '7. Assuming you could risk up to 100£ but the probability of winning would be unknown, how much of the £100 would you be willing to risk?',
    type: TEXT_FIELD_TYPE,
    typeVars: {}
  }, {
    name: 'preferredPayment2',
    text: '8. Which would you prefer?',
    type: RADIO_FIELD_TYPE,
    typeVars: { opts: ['a. Receive £180 with a 100% probability', 'b. Have a 50% of winning £400 and a 50% of receiving £0'] }
  }, {
    name: 'howMuchFun',
    text: '9. How much fun did you have or enjoy the experiment from a scale of 1-10 using only whole numbers?',
    type: SLIDER_FIELD_TYPE,
    typeVars: { min: 0, max: 10, step: 1 }
  }, {
    name: 'handedness',
    text: '10. Are you right handed, left handed, or ambidextrous? ',
    type: LIST_FIELD_TYPE,
    typeVars: { opts: ['a. Right Handed', 'b. Left Handed', 'c. Ambidextrous'] }
  }, {
    name: 'preferredPayment3',
    text: '11. Assume you have £200 and had the chance to risk £5 to have a 50% to win £10, would you either…',
    type: RADIO_FIELD_TYPE,
    typeVars: { opts: ['a. Stay at £200', 'b. 50% chance of gaining £5 (to have a total of £205) and a 50% of losing £5 (To have a total of £195)'] }
  }, {
    name: 'experimentRewardFairness',
    text: '12. How fair did you find the rewards in the experiment?',
    type: LIST_FIELD_TYPE,
    typeVars: { opts: ['a. Highly unfair', 'b. Unfair', 'c. Quite unfair', 'd. Quite fair', 'e. Fair', 'f. Very fair'] }
  }]
};

questionnaire = entryQuestionnarie;
// '0	10	20	30	40	50	60	70	80	90	100','Cannot			Moderately				highly certain 	   ','do at all			Can do					can do']

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
      //debugger;
      this.setState((0, _defineProperty3.default)({}, name, value));
    }
  }, {
    key: 'handleSliderChange',
    value: function handleSliderChange(event, value, name) {
      //    debugger;
      this.setState((0, _defineProperty3.default)({}, name, value));
    }
  }, {
    key: 'handleRadioChange',
    value: function handleRadioChange(event, value, name) {

      this.setState((0, _defineProperty3.default)({}, name, value));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // let message = this.props.message? this.props.message : 'Question'
      var message = 'Question';

      var textColor = this.context.muiTheme.palette.textColor;


      var title = questionnaire.introTitle;
      var text = questionnaire.introText;

      var qs = questionnaire.questions.map(function (q, i) {
        switch (q.type) {
          case TEXT_FIELD_TYPE:
            return _react2.default.createElement(
              'div',
              { key: i },
              q.text,
              _react2.default.createElement(_TextField2.default, { id: q.name, style: {
                  paddingLeft: 10,
                  marginTop: 20
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
          case SLIDER_FIELD_TYPE:
            return _react2.default.createElement(
              'div',
              { key: i,
                style: {
                  position: 'relative',
                  marginTop: 20
                }
              },
              _react2.default.createElement(
                'span',
                {
                  style: {
                    marginRight: 20
                  } },
                q.text
              ),
              _react2.default.createElement(_Slider2.default, {
                style: {
                  display: 'inline',
                  margin: 1,
                  padding: 1,
                  width: 200,
                  top: -24,
                  position: 'absolute'
                },
                id: q.name,
                min: q.typeVars.min ? q.typeVars.min : 0,
                max: q.typeVars.max ? q.typeVars.max : 100,
                step: q.typeVars.step ? q.typeVars.step : 10,
                defaultValue: q.typeVars.max ? q.typeVars.max / 2 : 50,
                value: _this2.state[q.name],
                onChange: function onChange(event, value) {
                  return _this2.handleSliderChange(event, value, q.name);
                }
              }),
              _react2.default.createElement(
                'div',
                {
                  style: {
                    display: 'inline',
                    margin: 1,
                    paddingLeft: 93,
                    width: 200,
                    top: -15,
                    fontWeight: 'bold',
                    position: 'absolute'
                  } },
                ' ',
                _this2.state[q.name],
                ' '
              )
            );
          case COMMENT_TYPE:
            return _react2.default.createElement(
              'div',
              { key: i },
              q.text
            );

          case ARRAY_TEXT_FIELD_TYPE:
            return _react2.default.createElement(
              'div',
              { key: i },
              q.text.map(function (k, j) {
                return _react2.default.createElement(
                  'div',
                  { key: j },
                  getTextPart(k, 0),
                  _react2.default.createElement(_TextField2.default, { id: q.name + j, style: {
                      paddingLeft: 10,
                      marginRight: 20
                    } }),
                  getTextPart(k, 1),
                  _react2.default.createElement('br', null)
                );
              })
            );
          case ARRAY_LIST_FIELD_TYPE:
            return _react2.default.createElement(
              'div',
              { key: i },
              q.text.map(function (k, j) {
                return _react2.default.createElement(
                  'div',
                  { key: j },
                  getTextPart(k, 0),
                  _react2.default.createElement(
                    _SelectField2.default,
                    {
                      style: {
                        paddingLeft: 10,
                        marginRight: 20

                      },

                      autoWidth: true,

                      id: q.name + j,
                      value: _this2.state[q.name + j],
                      onChange: function onChange(event, index, value) {
                        return _this2.handleChange(event, index, value, q.name + j);
                      }
                    },
                    q.typeVars.opts.map(function (q, i) {
                      return _react2.default.createElement(_MenuItem2.default, { key: i, value: q, primaryText: q });
                    })
                  ),
                  getTextPart(k, 1),
                  _react2.default.createElement('br', null)
                );
              })
            );
          case RADIO_FIELD_TYPE:
            return _react2.default.createElement(
              'div',
              { key: i, style: { paddingTop: 20 } },
              q.text,
              _react2.default.createElement(
                _RadioButton.RadioButtonGroup,
                {
                  style: { paddingLeft: 30, marginTop: 15 },
                  id: q.name,
                  name: q.name,
                  defaultSelected: _this2.state[q.name],
                  onChange: function onChange(event, index, value) {
                    return _this2.handleChange(event, index, value, q.name);
                  }
                },
                q.typeVars.opts.map(function (q, i) {
                  return _react2.default.createElement(_RadioButton.RadioButton, { style: { paddingTop: 10 }, key: i, value: q, label: q });
                })
              ),
              _react2.default.createElement('br', null)
            );
          case ARRAY_SLIDER_FIELD_TYPE:
            return _react2.default.createElement(
              'div',
              { key: i

              },
              q.text.map(function (k, j) {
                return _react2.default.createElement(
                  'div',
                  { key: j,
                    style: {
                      position: 'relative',
                      marginTop: 20
                    }
                  },
                  _react2.default.createElement(
                    'span',
                    {
                      style: {
                        marginRight: 20
                      } },
                    k
                  ),
                  _react2.default.createElement(_Slider2.default, {
                    style: {
                      display: 'inline',
                      margin: 1,
                      padding: 1,
                      width: 200,
                      top: -24,
                      position: 'absolute'
                    },
                    id: q.name + j,
                    min: 0,
                    max: 100,
                    step: 10,
                    defaultValue: 50,
                    value: _this2.state[q.name + j],
                    onChange: function onChange(event, value) {
                      return _this2.handleSliderChange(event, value, q.name + j);
                    }
                  }),
                  _react2.default.createElement(
                    'div',
                    {
                      style: {
                        display: 'inline',
                        margin: 1,
                        paddingLeft: 93,
                        width: 200,
                        top: -15,
                        fontWeight: 'bold',
                        position: 'absolute'
                      } },
                    ' ',
                    _this2.state[q.name + j],
                    ' '
                  )
                );
              })
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
              padding: 30,
              margin: '2% 15% 15%',
              minWidth: 900
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
