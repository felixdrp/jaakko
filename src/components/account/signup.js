import React from 'react';
import { connect } from 'react-redux'

// import ReactMixin from 'react-mixin';
// import Auth from '../services/AuthService'
import { Link } from 'react-router'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

// import { registerAccountClient } from '../../../data-handler-http/register-account-client'
import field from '../../modules/check-field'
import { fieldsOptions } from '../../config'
// Check password strength
import zxcvbn from 'zxcvbn';

import crypto from 'crypto'

import {
  registerAccount,
} from '../../websocket-message/server-actions'

class LoginSignUp extends React.Component {
  static propTypes = {
    registerStatus: React.PropTypes.object,

    // Code of example...
    // price: React.PropTypes.number.isRequired,
    // initialQty: React.PropTypes.number
    // todos: PropTypes.arrayOf(PropTypes.shape({
    //   id: PropTypes.number.isRequired,
    //   completed: PropTypes.bool.isRequired,
    //   text: PropTypes.string.isRequired
    // }).isRequired).isRequired,
    // onTodoClick: PropTypes.func.isRequired
  };

  static defaultProps = {
  };

  // To Speak with the server
  static contextTypes = {
    websocket: React.PropTypes.object,
  };

  constructor() {
    super()
    this.state = {
      // Input fields
      firstName: { error: '', name: 'First name' },
      surename: { error: '', name: 'Surename' },

      // userError: { error: '', name: 'First name' },
      email: { error: '', name: 'Email' },
      password: { error: '', name: 'Password' },
      reEnterPassword: { error: '', name: 'Re-enter Password' },

      passwordStrength: '',
    };

    this.style = {
      input1: {
        hintStyle: {
          color: '#3F51B5',
        },
        floatingLabelFocus: {
          color: '#3F51B5',
        },
        underline: {
          borderColor: 'red',
        },
        password: {
          invalid: {
            color: 'grey',
          },
          bad: {
            color: 'red',
          },
          weak: {
            color: 'orange',
          },
          good: {
            color: 'blue',
          },
          strong: {
            color: 'green',
          }
        }
      },
      button1: {
        color: 'white',
        backgroundColor: '#3F51B5',
        width: 180,
      },
      button2: {
        color: 'white',
        backgroundColor: '#4CAF50',
        width: 180,
      },
    };

    // Used to store inputs references.
    this._input = {};
  }

  componentWillReceiveProps(nextProps) {
    // Check if it was an error.
    // Then pass the error from props to state.
    if (nextProps.registerStatus) {
      for (let field in nextProps.registerStatus) {
        this.setState({
          [field]: {
            ...this.state[field],
            error: nextProps.registerStatus[field]
          }
        })
      }
    }
  }

  registerUser(e) {
    e.preventDefault();
    const input = this._input;
    // const username = input.email.getValue(),
    //       username = input.username.getValue(),
    //       password = input.password.getValue();
    const firstName = input.firstName.getValue() || '',
          surename = input.surename.getValue() || '',
          email = input.email.getValue() || '',
          password = input.password.getValue() || '',
          reEnterPassword = input.reEnterPassword.getValue() || '';

    const fields = {
      firstName,
      surename,
      email,
      password,
      reEnterPassword,
    }

    let result = '',
        foundEmpty = false,
        field;

    // Check all fields are not empty
    for (field in fields) {
      if ( fields[field] === '') {
        this.setState({ [field] : { ...this.state[field], error: 'Please fill field' } })
        foundEmpty = true
      }
    }

    if (foundEmpty) {
      return 'Found some empty value'
    }

    // Check Password and reEnterPassword are equal
    if ( fields['password'] !== fields['reEnterPassword']) {
      return this.setState({ ['reEnterPassword'] : { ...this.state[reEnterPassword], error: 'Password is not equal to Re-enter Password' } })
    }

    try {
      // debugger
      console.log(this.context.websocket)
      result = this.context.websocket.send(
        registerAccount({
          firstName,
          surename,
          email,
          password,
          reEnterPassword,
        })
      )
      // The response will come from websocket
      // with a redux action.
      // Even if it is an error.
      // actions:
      // Ok: setToken + setAccount info
      // ERROR: setError
    } catch(error) {
      console.error(error);
    }
  }

  ifNotEmptyCleanAskInfo(e) {
    let input = e.target.id
    if (this._input[input].getValue().length > 0 && this.state[input].error.length > 0) {
      this.setState({ [input] : { ...this.state[input], error: '' } });
    }
  }

  ifEmptyAskInfo(e) {
    let input = e.target.id
    // console.log(e.target.id)
    // console.log(JSON.stringify(this.state))
    //
    if (this._input[input].getValue().length === 0) {
      this.setState({ [input] : { ...this.state[input], error: `${this.state[input].name} is empty` } });
    }
  }

  passwordStrengthCheck(e) {
    this.setState({ passwordStrength : zxcvbn(this._input.password.getValue() || '').score });
  }

  checkReEnterPassword(e) {
    let input = e.target.id
    if (this._input[input].getValue().length === 0) {
      return this.setState({ [input] : { ...this.state[input], error: `${this.state[input].name} is empty` } });
    }
    if ( this._input[input].getValue() !== this._input.password.getValue() ) {
      return this.setState({ [input] : { ...this.state[input], error: 'Password is not equal to Re-enter Password' } });
    }
  }

  onChangeHandle(e) {
    if (e.target.id == 'password') {
      this.passwordStrengthCheck(e)
    }
    this.ifNotEmptyCleanAskInfo(e)
  }

  textField(field, options) {
    let onBlur = field !== 'reEnterPassword'? this.ifEmptyAskInfo.bind(this) : this.checkReEnterPassword.bind(this),
        type = options && 'type' in options? options.type : '',
        element = this.state[field],
        name = element.name,
        errorText = element.error;

    let [errorStrengthText, underlineColor] = (() => {
      let underlineStyle = this.style.input1.password,
          ps = 'Password security ';

      switch (this.state.passwordStrength) {
        case 0:
          return [ 'minimum 4 characters', underlineStyle.invalid ]
        case 1:
          return [ ps + 'poor', underlineStyle.bad ]
        case 2:
          return [ ps + 'weak', underlineStyle.weak ]
        case 3:
          return [ ps + 'good', underlineStyle.good ]
        case 4:
          return [ ps + 'strong', underlineStyle.strong ]
      }
      return []
    })()

    return (
      <div>
        <TextField
          id={field}
          type={type}
          hintText={name}
          floatingLabelText={name}
          floatingLabelFocusStyle={this.style.input1.floatingLabelFocus}
          errorText={field == 'password'? errorText || errorStrengthText : errorText}
          errorStyle={field == 'password' && errorText.length == 0 ? underlineColor : undefined}
          ref={(c) => this._input[field] = c}
          onFocus={ field == 'password'? this.passwordStrengthCheck.bind(this) : undefined }
          onChange={ this.onChangeHandle.bind(this) }
          onBlur={ onBlur }
        />
        <br />
      </div>
    )
  }

  render() {
    const state = this.state;
    const spaceInterElements = 25;
    const style = this.style;
    const input = this._input;

    return (
      <Card
        style={{
          padding: 30,
        }}
      >
        <CardHeader
          title="Register a new account:"
          // title="Login to Your Account"
          titleStyle={{
            fontSize: 24
          }}
        />
        <CardText
          style={{
            paddingTop: 0,
          }}
        >
          <form
            role="form"
            style={{
              marginLeft: 30,
            }}
            // action="http://mirtest.dcs.gla.ac.uk/api/auth/local/register"
            action="https://marakei.dcs.gla.ac.uk//api/auth/local/register"
            method="POST"
          >
            {this.textField( 'firstName' )}
            {this.textField( 'surename' )}
            <br />
            <br />
            {this.textField( 'email' )}
            {this.textField( 'password', {type: 'password'} )}
            {this.textField( 'reEnterPassword', {type: 'password'} )}

            <br />
            <br />
            <br />
            <FlatButton
              id="submitRegisterAccount"
              style={style.button1}
              type="submit"
              onClick={this.registerUser.bind(this)}
            >
              Submit
            </FlatButton>

          </form>
        </CardText>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    registerStatus: state.account.registerStatus
  }
}

export default connect(mapStateToProps)(LoginSignUp)
