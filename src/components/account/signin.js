import React from 'react';
import { connect } from 'react-redux'

import { Link } from 'react-router'
// import ReactMixin from 'react-mixin';
// import Auth from '../services/AuthService'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ButtonLoginWithTwitter from './buttonLoginWithTwitter';
import ButtonLoginWithFacebook from './buttonLoginWithFacebook';
import ButtonLoginWithLinkedin from './buttonLoginWithLinkedin';

import {
  loginAccount,
} from '../../websocket-message/server-actions'

class AccountSignIn extends React.Component {
  static propTypes = {
    loginStatus: React.PropTypes.object,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    websocket: React.PropTypes.object,
  };

  constructor() {
    super()
    this.state = {
      email: { error: '', name: 'Email' },
      password: { error: '', name: 'Password' },
      // userError: '',
      // emailError: '',
      // passwordError: '',
    };

    // Used to store references.
    this._input = {};
  }

  componentWillReceiveProps(nextProps) {
    // Check if it was an error.
    // Then pass the error from props to state.
    if (nextProps.loginStatus) {
      for (let field in nextProps.loginStatus) {
        this.setState({
          [field]: {
            ...this.state[field],
            error: nextProps.loginStatus[field]
          }
        })
      }
    }
  }

  async login(e) {
    e.preventDefault();
    const input = this._input;
    const email = input.email.getValue();
    const password = input.password.getValue();
    // debugger
    this.context.websocket.send(
      loginAccount({
        email,
        password,
      })
    )
  }

  render() {
    const { textColor } = this.context.muiTheme.palette;
    const spaceInterElements = 25;
    const style = {
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
    const buttonLoginBranded = {
      width: 180,
    }
    const input = this._input;

    return (
      <Card
        style={{
          padding: 30,
        }}
      >
        <CardHeader
          title="Login:"
          // title="Login to Your Account"
          titleStyle={{
            fontSize: 24,
            color: textColor,
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
            // action="https://localhost"
            method="POST"
          >
            <TextField
              {...{spellCheck:"false"}}
              id="email"
              hintText="Email"
              floatingLabelText="Email"
              floatingLabelFocusStyle={style.input1.floatingLabelFocus}
              errorText={this.state.email.error}
              ref={(c) => input.email = c}
              onBlur={ () => this.setState({ email: { error: !input.email.getValue()? 'Email empty': ''} }) }
            />
            <br />
            <TextField
              id="password"
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              errorText={this.state.password.error}
              ref={(c) => input.password = c}
              onBlur={ () => this.setState({ password: { error: !input.password.getValue()? 'Password empty': ''} }) }
            />
            <br />
            <br />
            <FlatButton
              id="submitLoginAccount"
              style={style.button1}
              type="submit"
              onClick={this.login.bind(this)}
            >
              Submit
            </FlatButton>
            <br />
            <br />
            <FlatButton
              style={style.button1}
              onClick={this.login.bind(this)}
            >
              Forgot your password?
            </FlatButton>
            <br />
            <br />
            <Link
              to="/account/signup"
              tabIndex="0"
            >
              <FlatButton
                style={style.button2}
                rippleColor='#C8E6C9'
              >
                Create an account
              </FlatButton>
            </Link>
          </form>
        </CardText>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loginStatus: state.account.loginStatus
  }
}

export default connect(mapStateToProps)(AccountSignIn)
