import React from 'react';
// import ReactMixin from 'react-mixin';
// import Auth from '../services/AuthService'
import { Link } from 'react-router'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class AccountSignUp extends React.Component {

  constructor() {
    super()
    this.state = {
      firstNameError: '',
      surenameError: '',

      userError: '',
      emailError: '',
      passwordError: '',
      reEnterPasswordError: '',
    };

    // Used to store references.
    this._input = {};
  }

  async registerUser(e) {
    e.preventDefault();
    const input = this._input;
    const username = input.email.getValue();
    const password = input.password.getValue();

    // Auth.login(this.state.user, this.state.password)
    //   .catch(function(err) {
    //     alert("There's an error logging in");
    //     console.log("Error logging in", err);
    //   });
    const options = {
      // host: location.hostname,
      // port: location.port,
      method: 'POST',
      path: '/api/auth/local/register',
      headers: { Authorization: "Basic " + btoa(username + ":" + password)}
    }
    var body = JSON.stringify({
      foo: "bar"
    })

    await httpClient.getData(options, body);

  }

  ifNotEmptyCleanAskInfo(input, stateError, e) {
    if (this._input[input].getValue().length > 0 && this.state[stateError].length > 0) {
      this.setState({ [stateError] : ''});
    }
  }

  ifEmptyAskInfo(input, stateError, errorMsg, e) {
    if (this._input[input].getValue().length === 0) {
      this.setState({ [stateError] : errorMsg});
    }
  }

  render() {
    const state = this.state;
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
            action="http://marakei.dcs.gla.ac.uk//api/auth/local/register"
            method="POST"
          >
            <TextField
              hintText="First name"
              floatingLabelText="First name"
              floatingLabelFocusStyle={style.input1.floatingLabelFocus}
              errorText={this.state.firstNameError}
              ref={(c) => input.firstName = c}
              onChange={ this.ifNotEmptyCleanAskInfo.bind(this, 'firstName', 'firstNameError') }
              onBlur={ this.ifEmptyAskInfo.bind(this, 'firstName', 'firstNameError', 'First name empty') }
            />
            <br />
            <TextField
              hintText="Surename"
              floatingLabelText="Surename"
              floatingLabelFocusStyle={style.input1.floatingLabelFocus}
              errorText={this.state.surenameError}
              ref={(c) => input.surename = c}
              onChange={ this.ifNotEmptyCleanAskInfo.bind(this, 'surename', 'surenameError') }
              onBlur={ this.ifEmptyAskInfo.bind(this, 'surename', 'surenameError', 'Surename empty') }
            />
            <br />
            <br />
            <br />
            <TextField
              hintText="Email address"
              floatingLabelText="Email address"
              floatingLabelFocusStyle={style.input1.floatingLabelFocus}
              errorText={this.state.emailError}
              ref={(c) => input.email = c}
              onChange={ this.ifNotEmptyCleanAskInfo.bind(this, 'email', 'emailError') }
              onBlur={ this.ifEmptyAskInfo.bind(this, 'email', 'emailError', 'Email empty') }
            />
            <br />
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              errorText={this.state.passwordError}
              ref={(c) => input.password = c}
              onChange={ this.ifNotEmptyCleanAskInfo.bind(this, 'password', 'passwordError') }
              onBlur={ this.ifEmptyAskInfo.bind(this, 'password', 'passwordError', 'Password empty') }
            />
            <br />
            <TextField
              hintText="Re-enter Password"
              floatingLabelText="Re-enter Password"
              type="password"
              errorText={this.state.reEnterPasswordError}
              ref={(c) => input.reEnterPassword = c}
              onChange={ this.ifNotEmptyCleanAskInfo.bind(this, 'reEnterPassword', 'reEnterPasswordError') }
              onBlur={ this.ifEmptyAskInfo.bind(this, 'reEnterPassword', 'reEnterPasswordError', 'Password empty') }
            />
            <br />
            <br />
            <br />
            <FlatButton
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
