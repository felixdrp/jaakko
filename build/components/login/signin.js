'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _buttonLoginWithTwitter = require('./buttonLoginWithTwitter');

var _buttonLoginWithTwitter2 = _interopRequireDefault(_buttonLoginWithTwitter);

var _buttonLoginWithFacebook = require('./buttonLoginWithFacebook');

var _buttonLoginWithFacebook2 = _interopRequireDefault(_buttonLoginWithFacebook);

var _buttonLoginWithLinkedin = require('./buttonLoginWithLinkedin');

var _buttonLoginWithLinkedin2 = _interopRequireDefault(_buttonLoginWithLinkedin);

var _httpClient = require('../../../httpClient/http-client');

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var httpClient = new _httpClient2.default();
// import ReactMixin from 'react-mixin';
// import Auth from '../services/AuthService'


var LoginSignIn = function (_React$Component) {
  (0, _inherits3.default)(LoginSignIn, _React$Component);

  function LoginSignIn() {
    (0, _classCallCheck3.default)(this, LoginSignIn);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(LoginSignIn).call(this));

    _this.state = {
      userError: '',
      emailError: '',
      passwordError: ''
    };

    // Used to store references.
    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(LoginSignIn, [{
    key: 'linkState',
    value: function linkState(data) {}
  }, {
    key: 'login',
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
                  path: '/api/auth/local/login',
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

      function login(_x) {
        return _ref.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var textColor = this.context.muiTheme.palette.textColor;

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
      var buttonLoginBranded = {
        width: 180
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
          title: 'Login:'
          // title="Login to Your Account"
          , titleStyle: {
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
          _react2.default.createElement(
            'form',
            {
              role: 'form',
              style: {
                marginLeft: 30
              }
              // action="http://mirtest.dcs.gla.ac.uk/api/auth/local/login"
              , action: 'http://marakei.dcs.gla.ac.uk/api/auth/local/login',
              method: 'POST'
            },
            _react2.default.createElement(_TextField2.default, (0, _extends3.default)({ spellCheck: "false" }, {
              hintText: 'Email',
              floatingLabelText: 'Email',
              floatingLabelFocusStyle: style.input1.floatingLabelFocus,
              errorText: this.state.emailError,
              ref: function ref(c) {
                return input.email = c;
              },
              onBlur: function onBlur() {
                return _this2.setState({ emailError: !input.email.getValue() ? 'Email empty' : '' });
              }
            })),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_TextField2.default, {
              hintText: 'Password',
              floatingLabelText: 'Password',
              type: 'password',
              errorText: this.state.passwordError,
              ref: function ref(c) {
                return input.password = c;
              },
              onBlur: function onBlur() {
                return _this2.setState({ passwordError: !input.password.getValue() ? 'Password empty' : '' });
              }
            }),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _FlatButton2.default,
              {
                style: style.button1,
                type: 'submit',
                onClick: this.login.bind(this)
              },
              'Submit'
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _FlatButton2.default,
              {
                style: style.button1,
                onClick: this.login.bind(this)
              },
              'Forgot your password?'
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _reactRouter.Link,
              {
                to: '/login/signup',
                tabindex: '0'
              },
              _react2.default.createElement(
                _FlatButton2.default,
                {
                  style: style.button2,
                  rippleColor: '#C8E6C9'
                },
                'Create an account'
              )
            )
          ),
          _react2.default.createElement(
            'h3',
            {
              style: {
                marginTop: spaceInterElements + 30,
                marginBottom: 30,
                color: textColor
              }
            },
            'Login with:'
          ),
          _react2.default.createElement(
            'div',
            {
              style: {
                // textAlign: 'center',
                marginLeft: 30
              }
            },
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'a',
              { href: '/login/twitter' },
              _react2.default.createElement(_buttonLoginWithTwitter2.default, { width: buttonLoginBranded.width })
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'a',
              { href: '/login/facebook' },
              _react2.default.createElement(_buttonLoginWithFacebook2.default, { width: buttonLoginBranded.width })
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'a',
              { href: '/login/linkedin' },
              _react2.default.createElement(_buttonLoginWithLinkedin2.default, { width: buttonLoginBranded.width })
            )
          )
        )
      );
    }
  }]);
  return LoginSignIn;
}(_react2.default.Component);

LoginSignIn.contextTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired
};
exports.default = LoginSignIn;
//# sourceMappingURL=signin.js.map
