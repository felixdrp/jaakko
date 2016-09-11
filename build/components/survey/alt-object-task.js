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

var _Card = require('material-ui/Card');

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Slider = require('material-ui/Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _RadioButton = require('material-ui/RadioButton');

var _timer = require('./timer');

var _timer2 = _interopRequireDefault(_timer);

var _reactRedux = require('react-redux');

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

var _svgIcons = require('material-ui/svg-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AltObjectTask = function (_Component) {
  (0, _inherits3.default)(AltObjectTask, _Component);

  function AltObjectTask(props) {
    (0, _classCallCheck3.default)(this, AltObjectTask);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AltObjectTask.__proto__ || (0, _getPrototypeOf2.default)(AltObjectTask)).call(this, props));

    _this.addEntry = function () {
      var entries = _this.state.entries.slice();
      entries.push({ name: 'entry' + entries.length, title: '', description: '' });
      _this.setState({ entries: entries });
    };

    _this.addGroupEntry = function (entry) {
      var entries = _this.state.groupEntries.slice();
      entries.push({ name: 'groupEntry' + entries.length, title: entry.title, description: entry.description });
      _this.setState({ groupEntries: entries });
    };

    _this.state = { entries: [], groupEntries: [] };

    return _this;
  }

  (0, _createClass3.default)(AltObjectTask, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.addEntry();
      this.addGroupEntry({ title: 'Super paper clip', description: 'the super super paperclip that will rule them all' });
    }

    //   handleSave(text) {
    //     if (text.length !== 0) {
    //       this.props.addTodo(text)
    //     }
    //   }
    //
    //   handleChange(event, index, value, name) {
    //     //debugger;
    //     this.setState({[name] : value})
    //   };
    //
    //   handleSliderChange(event, value, name) {
    // //    debugger;
    //     this.setState({[name] : value})
    //   };
    //
    //   handleRadioChange(event, value, name) {
    //
    //     this.setState({[name] : value})
    //   };

  }, {
    key: 'render',


    //'_marker'
    value: function render() {
      var textColor = this.context.muiTheme.palette.textColor;


      var title = 'Alternative Objects Task';
      var text = 'Come up with as many alternative objects for a stapler as possible. \n	You will have 5 minutes to complete the task. \n \n You can add a new entry by clicking on the new entry button';

      return _react2.default.createElement(
        'div',
        { style: { display: 'flex' } },
        _react2.default.createElement(
          _Card.Card,
          {
            style: {
              padding: 30,
              margin: '2% 3% 0%',
              maxWidth: 900,
              minWidth: 750
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
                { key: i, style: { marginBottom: 20 } },
                item
              );
            }),
            _react2.default.createElement(_timer2.default, null),
            this.state.entries.map(function (entry, i) {

              return _react2.default.createElement(
                'div',
                { key: i, style: { marginTop: 20 } },
                _react2.default.createElement(
                  _Card.Card,
                  null,
                  _react2.default.createElement(
                    _Card.CardText,
                    null,
                    'Title: ',
                    _react2.default.createElement(_TextField2.default, { id: entry.name + "_title", style: { marginLeft: 10
                      } }),
                    _react2.default.createElement('br', null),
                    'Description: ',
                    _react2.default.createElement(_TextField2.default, {
                      multiLine: true,
                      rows: 1,
                      rowsMax: 10,
                      id: entry.name + "_description", style: { marginLeft: 10, width: '80%'
                      } })
                  )
                )
              );
            }),
            _react2.default.createElement(
              _RaisedButton2.default,
              {
                id: 'newEntry',
                onClick: this.addEntry,
                type: 'button',
                backgroundColor: 'rgb(124, 210, 118)',
                style: { marginTop: 20 }
              },
              'New Entry'
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'div',
              {
                style: { marginLeft: '90%' }
              },
              _react2.default.createElement(
                _RaisedButton2.default,
                (0, _defineProperty3.default)({
                  id: 'submitAnswers',
                  style: { color: 'white' },
                  type: 'submit'
                }, 'style', { marginTop: 20 }),
                'Submit'
              )
            )
          )
        ),
        _react2.default.createElement(
          _Card.Card,
          { style: {

              margin: '2% 0% 5%',
              minWidth: 400

            }
          },
          _react2.default.createElement(_Card.CardHeader, {
            title: 'Group entries',
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
            this.state.groupEntries.map(function (entry, i) {

              return _react2.default.createElement(
                'div',
                { key: i, style: { padding: 5 } },
                _react2.default.createElement(
                  _Card.Card,
                  null,
                  _react2.default.createElement(
                    _Card.CardHeader,
                    { style: { padding: 8 } },
                    entry.title
                  ),
                  _react2.default.createElement(
                    _Card.CardText,
                    { style: { padding: 8 } },
                    entry.description
                  )
                )
              );
            })
          )
        )
      );
    }
  }]);
  return AltObjectTask;
}(_react.Component);

AltObjectTask.contextTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired,
  router: _react2.default.PropTypes.object.isRequired,
  websocket: _react2.default.PropTypes.object
};


AltObjectTask.propTypes = {}
// addTodo: PropTypes.func.isRequired


//export default Question

;var mapStateToProps = function mapStateToProps(state) {
  return {
    firstName: state.account.firstName
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(AltObjectTask);
//# sourceMappingURL=alt-object-task.js.map
