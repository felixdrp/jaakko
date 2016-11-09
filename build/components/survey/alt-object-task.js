'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _serverActions = require('../../websocket-message/server-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AltObjectTask = function (_Component) {
  (0, _inherits3.default)(AltObjectTask, _Component);

  function AltObjectTask(props) {
    (0, _classCallCheck3.default)(this, AltObjectTask);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AltObjectTask.__proto__ || (0, _getPrototypeOf2.default)(AltObjectTask)).call(this, props));

    _initialiseProps.call(_this);

    var accountId = _this.props.account.email || 'unassigned';
    _this.state = {
      entries: [],
      username: _this.props.account.firstname,
      currentEntry: {
        id: btoa(accountId.slice(0, 2) + Date.now() / 1000),
        title: '',
        description: '',
        creator: accountId,
        rating: [],
        timeSubmitted: null,
        similarTo: [],
        similarityHide: false
      }
    };

    _this.taskType = null;
    return _this;
  }




  (0, _createClass3.default)(AltObjectTask, [{
    key: 'handleEntryChange',
    value: function handleEntryChange(event, index, value, id) {
      var entryField = id.split(" ")[1];
      var currentEntry = this.state.currentEntry;
      currentEntry[entryField] = value;

      this.setState(currentEntry);

    }



  }, {
    key: 'render',


    value: function render() {
      var _this2 = this;

      var textColor = this.context.muiTheme.palette.textColor;


      if (this.state.isSubmitted) {

        return _react2.default.createElement(_wait2.default, null);
      }

      if ((0, _stringify2.default)(this.props.type) == "{}" || this.props.type == null && !this.taskType) {
        return _react2.default.createElement('span', null);
      }

      var tasktype = this.props.type || this.taskType;
      this.taskType = tasktype;

      var title = tasktype == 'alternativeObjectFigural' ? 'Alternative Objects Figural Task' : 'Alternative Objects Task';
      var text = (tasktype == 'alternativeObjectFigural' ? 'Come up with as many alternative objects for the figure below as possible.' : 'Come up with as many alternative objects for a stapler as possible.') + ' \n	You will have 7 minutes to complete the task. \n \n You can add a new entry by clicking on the new entry button';
      var currentEntry = this.state.currentEntry;

      var groupTasks = this.props.tasks;

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
            tasktype == 'alternativeObjectFigural' ? _react2.default.createElement('img', {
              style: {
                maxWidth: 300,
                minWidth: 250
              },
              src: 'http://bbsimg.ngfiles.com/1/2111000/ngbbs40837c1fadb3f.jpg'
            }) : _react2.default.createElement('div', null),
            _react2.default.createElement(_timer2.default, {
              limitTime: 20,
              timerCallback: function timerCallback() {
                return _this2.gatherData();
              }
            }),
            _react2.default.createElement(
              'div',
              { style: { marginTop: 20 } },
              _react2.default.createElement(
                _Card.Card,
                null,
                _react2.default.createElement(
                  _Card.CardText,
                  null,
                  'Title: ',
                  _react2.default.createElement(_TextField2.default, { id: currentEntry.id + " title",
                    style: { marginLeft: 10 },
                    value: this.state.currentEntry.title,
                    onChange: function onChange(event, index, value) {
                      return _this2.handleEntryChange(event, value, index, currentEntry.id + ' title');
                    }
                  }),
                  _react2.default.createElement('br', null),
                  'Description: ',
                  _react2.default.createElement(_TextField2.default, {
                    multiLine: true,
                    rows: 1,
                    rowsMax: 10,
                    id: currentEntry.id + " description",
                    style: { marginLeft: 10, width: '80%' },
                    value: this.state.currentEntry.description,
                    onChange: function onChange(event, index, value) {
                      return _this2.handleEntryChange(event, value, index, currentEntry.id + ' description');
                    }
                  })
                )
              )
            ),
            _react2.default.createElement(
              _RaisedButton2.default,
              {
                id: 'newEntry',
                onClick: function onClick(e) {
                  return _this2.addEntry(e);
                },
                type: 'button',
                backgroundColor: 'rgb(124, 210, 118)',
                style: { marginTop: 20 }
              },
              'New Entry'
            )
          )
        ),
        _react2.default.createElement(
          _Card.Card,
          {
            style: {
              margin: '2% 0% 5%',
              minWidth: 400,
              backgroundColor: 'rgb(234, 233, 233)'
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
            groupTasks.sort(function (a, b) {
              return b.timeSubmitted - a.timeSubmitted;
            }).map(function (entry, i) {
              return _react2.default.createElement(
                'div',
                { key: i, style: { padding: 5 } },
                _react2.default.createElement(
                  _Card.Card,
                  null,
                  _react2.default.createElement(
                    _Card.CardHeader,
                    { style: { padding: 8 } },
                    [1, 3].includes(entry.groupType) ? 'Author: ' + entry.firstName + ' ' + entry.surname + ' > ' : '',
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

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.addEntry = function (e) {


    if (_this3.state.currentEntry.title == '' || _this3.state.currentEntry.description == '') {
      return;
    }

    var accountId = _this3.props.account.email || 'unassigned';
    var o2 = JSON.parse((0, _stringify2.default)(_this3.state.currentEntry));
    o2.timeSubmitted = Date.now();

    _this3.context.websocket.send((0, _serverActions.swTaskIdeaAdd)(o2));



    var newEntry = {
      id: btoa(accountId.slice(0, 2) + Date.now() / 1000),
      title: '',
      description: '',
      creator: accountId,
      rating: [],
      timeSubmitted: null,
      similarTo: [],
      similarityHide: false
    };

    _this3.setState({ currentEntry: newEntry });
  };

  this.alerthing = function () {
    alert('boom');
  };

  this.gatherData = function () {
    console.log((0, _stringify2.default)(_this3.state));
    _this3.setState({ isSubmitted: true });
    _this3.props.submit();
  };
};

AltObjectTask.propTypes = {}



;var mapStateToProps = function mapStateToProps(state) {
  var ownProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return {
    firstName: state.account.firstName,
    account: state.account,
    tasks: state.task.tasks || [],
    taskLength: state.task.tasks ? state.task.tasks.length : 0,
    type: state.task.payload != undefined ? state.task.payload.taskType : null
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(AltObjectTask);