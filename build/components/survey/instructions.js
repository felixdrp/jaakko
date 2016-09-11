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

var Instructions = function (_Component) {
  (0, _inherits3.default)(Instructions, _Component);

  function Instructions(props) {
    (0, _classCallCheck3.default)(this, Instructions);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Instructions.__proto__ || (0, _getPrototypeOf2.default)(Instructions)).call(this, props));

    _this.state = {};
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

    //'_marker'

  }, {
    key: 'render',
    value: function render() {
      var textColor = this.context.muiTheme.palette.textColor;


      var title = 'Example of Alternative Objects Task';
      var text = 'The task is to come up with as many alternative objects for a given object. \n\n For example:' + '\nIf the object given is a paper clip then here is how you would complete the task.' + '\n1. First you would enter the name of the object in the “object name” field, for example, the alternative object could be a “reset button pressing tool”. ' + '\n2. Then a description must be filled in to give more information, this is especially important if the object is uncommon. Using the example above the “description” could be, for example, A tool that can be used to press reset buttons which can be pressed with your fingers.' + '\n3. When you are finished you can press the “submit button” to submit the entry. ' + '\n4. Your name will be shown next to your entries and so each entry will have an author. ' + '\n\nThe previous example would look like this…';

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
            text.split('\n').map(function (item, i) {
              return _react2.default.createElement(
                'div',
                { key: i, style: { marginBottom: 10 } },
                item
              );
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
            ),
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
