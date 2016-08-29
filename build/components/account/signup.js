'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _checkField = require('../../modules/check-field');

var _checkField2 = _interopRequireDefault(_checkField);

var _config = require('../../config');

var _zxcvbn = require('zxcvbn');

var _zxcvbn2 = _interopRequireDefault(_zxcvbn);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _serverActions = require('../../websocket-message/server-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginSignUp = function (_React$Component) {
  (0, _inherits3.default)(LoginSignUp, _React$Component);

  function LoginSignUp() {
    (0, _classCallCheck3.default)(this, LoginSignUp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LoginSignUp.__proto__ || (0, _getPrototypeOf2.default)(LoginSignUp)).call(this));

    _this.state = {
      // Input fields
      firstName: { error: '', name: 'First name' },
      surename: { error: '', name: 'Surename' },

      // userError: { error: '', name: 'First name' },
      email: { error: '', name: 'Email' },
      password: { error: '', name: 'Password' },
      reEnterPassword: { error: '', name: 'Re-enter Password' },

      passwordStrength: ''
    };

    _this.style = {
      input1: {
        hintStyle: {
          color: '#3F51B5'
        },
        floatingLabelFocus: {
          color: '#3F51B5'
        },
        underline: {
          borderColor: 'red'
        },
        password: {
          invalid: {
            color: 'grey'
          },
          bad: {
            color: 'red'
          },
          weak: {
            color: 'orange'
          },
          good: {
            color: 'blue'
          },
          strong: {
            color: 'green'
          }
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

    // Used to store inputs references.
    _this._input = {};
    return _this;
  }

  // To Speak with the server


  (0, _createClass3.default)(LoginSignUp, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Check if it was an error.
      // Then pass the error from props to state.
      if (nextProps.registerStatus) {
        for (var _field in nextProps.registerStatus) {
          this.setState((0, _defineProperty3.default)({}, _field, (0, _extends3.default)({}, this.state[_field], {
            error: nextProps.registerStatus[_field]
          })));
        }
      }
    }
  }, {
    key: 'registerUser',
    value: function registerUser(e) {
      e.preventDefault();
      var input = this._input;
      // const username = input.email.getValue(),
      //       username = input.username.getValue(),
      //       password = input.password.getValue();
      var firstName = input.firstName.getValue() || '',
          surename = input.surename.getValue() || '',
          email = input.email.getValue() || '',
          password = input.password.getValue() || '',
          reEnterPassword = input.reEnterPassword.getValue() || '';

      var fields = {
        firstName: firstName,
        surename: surename,
        email: email,
        password: password,
        reEnterPassword: reEnterPassword
      };

      var result = '',
          foundEmpty = false,
          field = void 0;

      // Check all fields are not empty
      for (field in fields) {
        if (fields[field] === '') {
          this.setState((0, _defineProperty3.default)({}, field, (0, _extends3.default)({}, this.state[field], { error: 'Please fill field' })));
          foundEmpty = true;
        }
      }

      if (foundEmpty) {
        return 'Found some empty value';
      }

      // Check Password and reEnterPassword are equal
      if (fields['password'] !== fields['reEnterPassword']) {
        return this.setState((0, _defineProperty3.default)({}, 'reEnterPassword', (0, _extends3.default)({}, this.state[reEnterPassword], { error: 'Password is not equal to Re-enter Password' })));
      }

      try {
        // debugger
        console.log(this.context.websocket);
        result = this.context.websocket.send((0, _serverActions.registerAccount)({
          firstName: firstName,
          surename: surename,
          email: email,
          password: password,
          reEnterPassword: reEnterPassword
        }));
        // The response will come from websocket
        // with a redux action.
        // Even if it is an error.
        // actions:
        // Ok: setToken + setAccount info
        // ERROR: setError
      } catch (error) {
        console.error(error);
      }
    }
  }, {
    key: 'ifNotEmptyCleanAskInfo',
    value: function ifNotEmptyCleanAskInfo(e) {
      var input = e.target.id;
      if (this._input[input].getValue().length > 0 && this.state[input].error.length > 0) {
        this.setState((0, _defineProperty3.default)({}, input, (0, _extends3.default)({}, this.state[input], { error: '' })));
      }
    }
  }, {
    key: 'ifEmptyAskInfo',
    value: function ifEmptyAskInfo(e) {
      var input = e.target.id;
      // console.log(e.target.id)
      // console.log(JSON.stringify(this.state))
      //
      if (this._input[input].getValue().length === 0) {
        this.setState((0, _defineProperty3.default)({}, input, (0, _extends3.default)({}, this.state[input], { error: this.state[input].name + ' is empty' })));
      }
    }
  }, {
    key: 'passwordStrengthCheck',
    value: function passwordStrengthCheck(e) {
      this.setState({ passwordStrength: (0, _zxcvbn2.default)(this._input.password.getValue() || '').score });
    }
  }, {
    key: 'checkReEnterPassword',
    value: function checkReEnterPassword(e) {
      var input = e.target.id;
      if (this._input[input].getValue().length === 0) {
        return this.setState((0, _defineProperty3.default)({}, input, (0, _extends3.default)({}, this.state[input], { error: this.state[input].name + ' is empty' })));
      }
      if (this._input[input].getValue() !== this._input.password.getValue()) {
        return this.setState((0, _defineProperty3.default)({}, input, (0, _extends3.default)({}, this.state[input], { error: 'Password is not equal to Re-enter Password' })));
      }
    }
  }, {
    key: 'onChangeHandle',
    value: function onChangeHandle(e) {
      if (e.target.id == 'password') {
        this.passwordStrengthCheck(e);
      }
      this.ifNotEmptyCleanAskInfo(e);
    }
  }, {
    key: 'textField',
    value: function textField(field, options) {
      var _this2 = this;

      var onBlur = field !== 'reEnterPassword' ? this.ifEmptyAskInfo.bind(this) : this.checkReEnterPassword.bind(this),
          type = options && 'type' in options ? options.type : '',
          element = this.state[field],
          name = element.name,
          errorText = element.error;

      var _ref = function () {
        var underlineStyle = _this2.style.input1.password,
            ps = 'Password security ';

        switch (_this2.state.passwordStrength) {
          case 0:
            return ['minimum 4 characters', underlineStyle.invalid];
          case 1:
            return [ps + 'poor', underlineStyle.bad];
          case 2:
            return [ps + 'weak', underlineStyle.weak];
          case 3:
            return [ps + 'good', underlineStyle.good];
          case 4:
            return [ps + 'strong', underlineStyle.strong];
        }
        return [];
      }();

      var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

      var errorStrengthText = _ref2[0];
      var underlineColor = _ref2[1];


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_TextField2.default, {
          id: field,
          type: type,
          hintText: name,
          floatingLabelText: name,
          floatingLabelFocusStyle: this.style.input1.floatingLabelFocus,
          errorText: field == 'password' ? errorText || errorStrengthText : errorText,
          errorStyle: field == 'password' && errorText.length == 0 ? underlineColor : undefined,
          ref: function ref(c) {
            return _this2._input[field] = c;
          },
          onFocus: field == 'password' ? this.passwordStrengthCheck.bind(this) : undefined,
          onChange: this.onChangeHandle.bind(this),
          onBlur: onBlur
        }),
        _react2.default.createElement('br', null)
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var state = this.state;
      var spaceInterElements = 25;
      var style = this.style;
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
              , action: 'https://marakei.dcs.gla.ac.uk//api/auth/local/register',
              method: 'POST'
            },
            this.textField('firstName'),
            this.textField('surename'),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            this.textField('email'),
            this.textField('password', { type: 'password' }),
            this.textField('reEnterPassword', { type: 'password' }),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _FlatButton2.default,
              {
                id: 'submitRegisterAccount',
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
// Check password strength


// import { registerAccountClient } from '../../../data-handler-http/register-account-client'


// import ReactMixin from 'react-mixin';
// import Auth from '../services/AuthService'


LoginSignUp.propTypes = {
  registerStatus: _react2.default.PropTypes.object

};
LoginSignUp.defaultProps = {};
LoginSignUp.contextTypes = {
  websocket: _react2.default.PropTypes.object
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    registerStatus: state.account.registerStatus
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(LoginSignUp);
//# sourceMappingURL=signup.js.map
