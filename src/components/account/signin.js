import React from 'react';
import { Link } from 'react-router'
// import ReactMixin from 'react-mixin';
// import Auth from '../services/AuthService'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ButtonLoginWithTwitter from './buttonLoginWithTwitter';
import ButtonLoginWithFacebook from './buttonLoginWithFacebook';
import ButtonLoginWithLinkedin from './buttonLoginWithLinkedin';

// import HttpClient from '../../../httpClient/http-client';

// var httpClient = new HttpClient();

export default class AccountSignIn extends React.Component {

  constructor() {
    super()
    this.state = {
      userError: '',
      emailError: '',
      passwordError: '',
    };

    // Used to store references.
    this._input = {};
  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    websocket: React.PropTypes.object,
  };

  linkState(data) {

  }

  async login(e) {
    e.preventDefault();
    const input = this._input;
    const email = input.email.getValue();
    const password = input.password.getValue();
    // debugger
    this.context.websocket.send(
      JSON.stringify(
        {
          type: 'MUTATE',
          action: 'LOGIN_ACCOUNT',
          payload: {
            email,
            password
          }
        }
      )
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
              hintText="Email"
              floatingLabelText="Email"
              floatingLabelFocusStyle={style.input1.floatingLabelFocus}
              errorText={this.state.emailError}
              ref={(c) => input.email = c}
              onBlur={ () => this.setState({emailError: !input.email.getValue()? 'Email empty': ''}) }
            />
            <br />
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              errorText={this.state.passwordError}
              ref={(c) => input.password = c}
              onBlur={ () => this.setState({passwordError: !input.password.getValue()? 'Password empty': ''}) }
            />
            <br />
            <br />
            <FlatButton
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
