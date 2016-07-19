'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _reactRouter = require('react-router');

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ReactMixin from 'react-mixin';
// import Auth from '../services/AuthService'

var LoginSignUp = function (_React$Component) {
  (0, _inherits3.default)(LoginSignUp, _React$Component);

  function LoginSignUp() {
    (0, _classCallCheck3.default)(this, LoginSignUp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(LoginSignUp).call(this));

    _this.state = {
      firstNameError: '',
      surenameError: '',

      userError: '',
      emailError: '',
      passwordError: '',
      reEnterPasswordError: ''
    };

    // Used to store references.
    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(LoginSignUp, [{
    key: 'registerUser',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(e) {
        var input, username, password, options, body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                input = this._input;
                username = input.email.getValue();
                password = input.password.getValue();

                // Auth.login(this.state.user, this.state.password)
                //   .catch(function(err) {
                //     alert("There's an error logging in");
                //     console.log("Error logging in", err);
                //   });

                options = {
                  // host: location.hostname,
                  // port: location.port,
                  method: 'POST',
                  path: '/api/auth/local/register',
                  headers: { Authorization: "Basic " + btoa(username + ":" + password) }
                };
                body = (0, _stringify2.default)({
                  foo: "bar"
                });
                _context.next = 8;
                return httpClient.getData(options, body);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function registerUser(_x) {
        return _ref.apply(this, arguments);
      }

      return registerUser;
    }()
  }, {
    key: 'ifNotEmptyCleanAskInfo',
    value: function ifNotEmptyCleanAskInfo(input, stateError, e) {
      if (this._input[input].getValue().length > 0 && this.state[stateError].length > 0) {
        this.setState((0, _defineProperty3.default)({}, stateError, ''));
      }
    }
  }, {
    key: 'ifEmptyAskInfo',
    value: function ifEmptyAskInfo(input, stateError, errorMsg, e) {
      if (this._input[input].getValue().length === 0) {
        this.setState((0, _defineProperty3.default)({}, stateError, errorMsg));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var state = this.state;
      var spaceInterElements = 25;
      var style = {
        input1: {
          hintStyle: {
            color: '#3F51B5'
          },
          floatingLabelFocus: {
            color: '#3F51B5'
          },
          underline: {
            borderColor: 'red'
          }
        },
        button1: {
          color: 'white',
          backgroundColor: '#3F51B5',
          width: 180
        },
        button2: {
          color: 'white',
          backgroundColor: '#4CAF50',
          width: 180
        }
      };
      var input = this._input;

      return _react2.default.createElement(
        _Card.Card,
        {
          style: {
            padding: 30
          }
        },
        _react2.default.createElement(_Card.CardHeader, {
          title: 'Register a new account:'
          // title="Login to Your Account"
          , titleStyle: {
            fontSize: 24
          }
        }),
        _react2.default.createElement(
          _Card.CardText,
          {
            style: {
              paddingTop: 0
            }
          },
          _react2.default.createElement(
            'form',
            {
              role: 'form',
              style: {
                marginLeft: 30
              }
              // action="http://mirtest.dcs.gla.ac.uk/api/auth/local/register"
              , action: 'http://marakei.dcs.gla.ac.uk//api/auth/local/register',
              method: 'POST'
            },
            _react2.default.createElement(_TextField2.default, {
              hintText: 'First name',
              floatingLabelText: 'First name',
              floatingLabelFocusStyle: style.input1.floatingLabelFocus,
              errorText: this.state.firstNameError,
              ref: function ref(c) {
                return input.firstName = c;
              },
              onChange: this.ifNotEmptyCleanAskInfo.bind(this, 'firstName', 'firstNameError'),
              onBlur: this.ifEmptyAskInfo.bind(this, 'firstName', 'firstNameError', 'First name empty')
            }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_TextField2.default, {
              hintText: 'Surename',
              floatingLabelText: 'Surename',
              floatingLabelFocusStyle: style.input1.floatingLabelFocus,
              errorText: this.state.surenameError,
              ref: function ref(c) {
                return input.surename = c;
              },
              onChange: this.ifNotEmptyCleanAskInfo.bind(this, 'surename', 'surenameError'),
              onBlur: this.ifEmptyAskInfo.bind(this, 'surename', 'surenameError', 'Surename empty')
            }),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_TextField2.default, {
              hintText: 'Email address',
              floatingLabelText: 'Email address',
              floatingLabelFocusStyle: style.input1.floatingLabelFocus,
              errorText: this.state.emailError,
              ref: function ref(c) {
                return input.email = c;
              },
              onChange: this.ifNotEmptyCleanAskInfo.bind(this, 'email', 'emailError'),
              onBlur: this.ifEmptyAskInfo.bind(this, 'email', 'emailError', 'Email empty')
            }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_TextField2.default, {
              hintText: 'Password',
              floatingLabelText: 'Password',
              type: 'password',
              errorText: this.state.passwordError,
              ref: function ref(c) {
                return input.password = c;
              },
              onChange: this.ifNotEmptyCleanAskInfo.bind(this, 'password', 'passwordError'),
              onBlur: this.ifEmptyAskInfo.bind(this, 'password', 'passwordError', 'Password empty')
            }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_TextField2.default, {
              hintText: 'Re-enter Password',
              floatingLabelText: 'Re-enter Password',
              type: 'password',
              errorText: this.state.reEnterPasswordError,
              ref: function ref(c) {
                return input.reEnterPassword = c;
              },
              onChange: this.ifNotEmptyCleanAskInfo.bind(this, 'reEnterPassword', 'reEnterPasswordError'),
              onBlur: this.ifEmptyAskInfo.bind(this, 'reEnterPassword', 'reEnterPasswordError', 'Password empty')
            }),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _FlatButton2.default,
              {
                style: style.button1,
                type: 'submit',
                onClick: this.registerUser.bind(this)
              },
              'Submit'
            )
          )
        )
      );
    }
  }]);
  return LoginSignUp;
}(_react2.default.Component);

exports.default = LoginSignUp;
//# sourceMappingURL=signup.js.map
