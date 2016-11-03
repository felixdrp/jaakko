'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactRedux = require('react-redux');

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

var _serverActions = require('../../websocket-message/server-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AccountSignIn = function (_React$Component) {
  (0, _inherits3.default)(AccountSignIn, _React$Component);

  function AccountSignIn() {
    (0, _classCallCheck3.default)(this, AccountSignIn);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AccountSignIn.__proto__ || (0, _getPrototypeOf2.default)(AccountSignIn)).call(this));

    _this.state = {
      email: { error: '', name: 'Email' },
      password: { error: '', name: 'Password' }
    };

    _this._input = {};
    return _this;
  }

  (0, _createClass3.default)(AccountSignIn, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.loginStatus) {
        for (var field in nextProps.loginStatus) {
          this.setState((0, _defineProperty3.default)({}, field, (0, _extends3.default)({}, this.state[field], {
            error: nextProps.loginStatus[field]
          })));
        }
      }
    }
  }, {
    key: 'login',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(e) {
        var input, email, password;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                input = this._input;
                email = input.email.getValue();
                password = input.password.getValue();

                this.context.websocket.send((0, _serverActions.loginAccount)({
                  email: email,
                  password: password
                }));

              case 5:
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
              , method: 'POST'
            },
            _react2.default.createElement(_TextField2.default, (0, _extends3.default)({ spellCheck: "false" }, {
              id: 'email',
              hintText: 'Email',
              floatingLabelText: 'Email',
              floatingLabelFocusStyle: style.input1.floatingLabelFocus,
              errorText: this.state.email.error,
              ref: function ref(c) {
                return input.email = c;
              },
              onBlur: function onBlur() {
                return _this2.setState({ email: { error: !input.email.getValue() ? 'Email empty' : '' } });
              }
            })),
            _react2.default.createElement('br', null),
            _react2.default.createElement(_TextField2.default, {
              id: 'password',
              hintText: 'Password',
              floatingLabelText: 'Password',
              type: 'password',
              errorText: this.state.password.error,
              ref: function ref(c) {
                return input.password = c;
              },
              onBlur: function onBlur() {
                return _this2.setState({ password: { error: !input.password.getValue() ? 'Password empty' : '' } });
              }
            }),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _FlatButton2.default,
              {
                id: 'submitLoginAccount',
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
                to: '/account/signup',
                tabIndex: '0'
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
          )
        )
      );
    }
  }]);
  return AccountSignIn;
}(_react2.default.Component);


AccountSignIn.propTypes = {
  loginStatus: _react2.default.PropTypes.object
};
AccountSignIn.contextTypes = {
  muiTheme: _react2.default.PropTypes.object.isRequired,
  websocket: _react2.default.PropTypes.object
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    loginStatus: state.account.loginStatus
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(AccountSignIn);