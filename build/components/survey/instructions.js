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

var instructionsData = {

  alternativeObject: {
    title: 'Instructions for Alternative Objects Task',
    text: 'The task is to come up with as many alternative objects for a given object. \n\n For example:' + '\nIf the object given is a paper clip then here is how you would complete the task.' + '\n1. First you would enter the name of the object in the “object name” field, for example, the alternative object could be a “reset button pressing tool”. ' + '\n2. Then a description must be filled in to give more information, this is especially important if the object is uncommon. Using the example above the “description” could be, for example, A tool that can be used to press reset buttons which can be pressed with your fingers.' + '\n3. When you are finished you can press the “submit button” to submit the entry. ' + '\n4. Your name will be shown next to your entries and so each entry will have an author. ' + '\n\nThe previous example would look like this…'
  },
  similarities: {
    title: 'Instructions for Similarity rounds',
    text: 'How you judge another groups entries to be similar will not affect your pay or the way others judge your entries. This round is completely anonymous.' + '\nPlease look through the group’s answers and judge if any 2 answers are similar. If two people deem the same two entries to be similar to an already existing entry then the entry that was given after the original entry will not be taken into account in the favouriting round. This means that if the entry is disqualified from the favouriting round it cannot be favourited and so will not count toward your earnings.  That is to say that if an answer is deemed to be similar to another existing answer, by two or more people, then the answer that was given after the original will not appear in the favourites round  and so not be taken into account when determining payoffs. Thus no money can be made on ideas which have been seen similar to existing ideas by two or more people. The maximum number of similar ideas to be submitted is 3, so if there are more than 3 ideas which you view as similar ideas then you are asked to prioritise which ideas are more similar than the others.' + '\nSome guidelines for what might be “similar” ' + '\n1. If the entry is not original and is largely expressed in an existing entry.' + '\n2. If the entry is an exact copy of an existing entry ' + '\n\nRemember that the answers are from another group and will not affect your performance in the task. If two entries are flagged similar then the later entry will be eliminated from the favouriting round.	' + '\n\nThe following shows an example of how the different entries will show in the interface. Each row represents each of the entries. On each row, from left to right, each entry has a number, a title and description, and the numbers of the questions it is similar to.'
  },
  favourites: {
    title: 'Instructions for Favourites rounds',
    text: 'You will be asked to name your 5 favourites entries from the list of entries that are presented to you and the entries will be from another group than yours. How you individually favourite the entries will not be known by the members of the group you are favouriting or even the members of your group. Thus you will be completely anonymous when favouriting.' + '\nEvery groups entries will be favorited and based on the total amount of favourites an individual receives it will determine where they rank within their group and so how much they will be paid. ' + '\nYou are asked to rank the 5 favourite entries by giving your favourite 5 stars, second favourite 4 starts, etc. thus..' + '\n1. First place = 5 Stars' + '\n2. Second place = 4 Stars' + '\n3. Third place = 3 Stars' + '\n4. Fourth place = 2 Stars' + '\n5. Fifth place = 1 Star' + '\n\nOnly your 5 favourites will receive stars, you cannot give any other entry a star. No half stars can be given; they can only be given as shown above.' + '\n\nThe previous example would look like this…'
  },
  math: {
    title: 'Instructions for Math task',
    text: 'For this task you will be asked to solve simple addition problems correct. For example you could be asked to solve the following “56+73+5+10+11” you would simply type “155” and move onto the next question.' + 'There will be multiple problems and you will be asked to solve as many as possible in the 5 minutes given. The number of correct answers will then be calculated and showed to you after the task is over.' + '\n Your name will appear on a ranking of the group’s performance and your will be ranked from the best performer (person with the most correct answers) to the worst performer (person with the least amount of correct answers).' + 'The exact score of the participant in your group will not be shown.' + '\n In this task your pay will depend on your performance relative to the other members in the group. The pay structure will be as shown below.' + '\n The task will have a series of addition problems like the ones below. You will be asked to solve as many as you can in the 5 minutes. Only correct answers will be counted toward your score.' + '\n\n The aforementioned example would look like this…'
  }
};

var Instructions = function (_Component) {
  (0, _inherits3.default)(Instructions, _Component);

  function Instructions(props) {
    (0, _classCallCheck3.default)(this, Instructions);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Instructions.__proto__ || (0, _getPrototypeOf2.default)(Instructions)).call(this, props));

    _this.getTaskExample = function (tasktype) {
      switch (tasktype) {
        case 'alternativeObject':
          return _react2.default.createElement(
            'div',
            { style: { marginTop: 20 } },
            _react2.default.createElement(
              _Card.Card,
              null,
              _react2.default.createElement(
                _Card.CardText,
                null,
                'Title: ',
                _react2.default.createElement(_TextField2.default, { id: 'dummy', value: 'Reset button pressing tool', style: { marginLeft: 10
                  } }),
                _react2.default.createElement('br', null),
                'Description: ',
                _react2.default.createElement(_TextField2.default, {
                  id: 'dummy2',
                  multiLine: true,
                  rows: 1,
                  rowsMax: 10,
                  value: 'A tool that can be used to press reset buttons which cannot be pressed with your fingers.',
                  style: { marginLeft: 20, width: '80%'
                  } })
              )
            )
          );
        case 'similarities':
          return _react2.default.createElement(
            'div',
            null,
            ' ',
            _react2.default.createElement(
              'div',
              { style: { padding: 5, display: 'flex' } },
              _react2.default.createElement(
                _Card.Card,
                { style: { paddingTop: '0%', fontWeight: 800 } },
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  '0.'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardHeader,
                  { style: { padding: 8 } },
                  'Reset button pressing tool'
                ),
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  'A tool that can be used to press reset buttons which cannot be pressed with your fingers'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8, paddingTop: 28, fontWeight: 800 } },
                  'Similar to:'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  _react2.default.createElement(
                    _SelectField2.default,
                    { value: -1, onChange: function onChange() {
                        alert('This will set the selected entries as similar');
                      }, style: { width: 30 } },
                    _react2.default.createElement(_MenuItem2.default, { value: 0, primaryText: 0 }),
                    _react2.default.createElement(_MenuItem2.default, { value: 1, primaryText: 1 }),
                    _react2.default.createElement(_MenuItem2.default, { value: 2, primaryText: 2 })
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { style: { padding: 5, display: 'flex' } },
              _react2.default.createElement(
                _Card.Card,
                { style: { paddingTop: '0%', fontWeight: 800 } },
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  '1.'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardHeader,
                  { style: { padding: 8 } },
                  'Reset button pressing tool'
                ),
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  'A tool that can be used to press reset buttons which cannot be pressed with your fingers'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8, paddingTop: 28, fontWeight: 800 } },
                  'Similar to:'
                )
              ),
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  { style: { padding: 8 } },
                  _react2.default.createElement(
                    _SelectField2.default,
                    { value: -1, onChange: function onChange() {
                        alert('This will set the selected entries as similar');
                      }, style: { width: 30 } },
                    _react2.default.createElement(_MenuItem2.default, { value: 0, primaryText: 0 }),
                    _react2.default.createElement(_MenuItem2.default, { value: 1, primaryText: 1 }),
                    _react2.default.createElement(_MenuItem2.default, { value: 2, primaryText: 2 })
                  )
                )
              )
            )
          );
        case 'favourites':
          return _react2.default.createElement(
            'div',
            { style: { marginTop: 20 } },
            _react2.default.createElement(
              _Card.Card,
              null,
              _react2.default.createElement(
                _Card.CardText,
                null,
                'Title: ',
                _react2.default.createElement(_TextField2.default, { id: 'dummy', value: 'Reset button pressing tool', style: { marginLeft: 10
                  } }),
                _react2.default.createElement('br', null),
                'Description: ',
                _react2.default.createElement(_TextField2.default, {
                  id: 'dummy2',
                  multiLine: true,
                  rows: 1,
                  rowsMax: 10,
                  value: 'A tool that can be used to press reset buttons which cannot be pressed with your fingers.',
                  style: { marginLeft: 20, width: '80%'
                  } })
              )
            )
          );
        case 'math':
          return _react2.default.createElement(
            'div',
            { style: { marginTop: 20 } },
            _react2.default.createElement(
              _Card.Card,
              null,
              _react2.default.createElement(
                _Card.CardText,
                null,
                _react2.default.createElement(
                  'div',
                  null,
                  '56+73+5+10+11 =',
                  _react2.default.createElement(_TextField2.default, {
                    id: 'dummy',
                    style: {
                      paddingLeft: 10,
                      marginRight: 20
                    },
                    value: 155
                  })
                )
              )
            )
          );
        default:
          return _react2.default.createElement('div', null);

      }
    };

    _this.state = {};
    console.log("INSTRUCTIONS: " + props.payload);
    return _this;
  }

  (0, _createClass3.default)(Instructions, [{
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
    key: 'render',


    //'_marker'
    value: function render() {
      if (!this.props.payload) {
        return _react2.default.createElement('span', null);
      }

      var textColor = this.context.muiTheme.palette.textColor;

      var tasktype = 'math';
      var title = instructionsData[tasktype].title;
      var text = instructionsData[tasktype].text;
      var example = this.getTaskExample(tasktype);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Card.Card,
          {
            style: {
              padding: 30,
              margin: '2% 15% 15%',
              minWidth: 900,
              maxWidth: 1200
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
            text.split('\n').map(function (item, i) {
              return _react2.default.createElement(
                'div',
                { key: i, style: { marginBottom: 10 } },
                item
              );
            }),
            example,
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _FlatButton2.default,
              {
                id: 'ready',
                backgroundColor: 'green',
                style: { color: 'white' }
              },
              'I\'m ready'
            )
          )
        )
      );
    }
  }]);
  return Instructions;
}(_react.Component);

Instructions.contextTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired,
  router: _react2.default.PropTypes.object.isRequired,
  websocket: _react2.default.PropTypes.object
};


Instructions.propTypes = {}
// addTodo: PropTypes.func.isRequired


//export default Question

;var mapStateToProps = function mapStateToProps(state) {
  return {
    firstName: state.account.firstName
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Instructions);
//# sourceMappingURL=instructions.js.map
