import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import {
  wsSurveyStateGet,
} from '../../websocket-message/query-actions'

class SurveyContainer extends Component {
  static propTypes = {
    // groups: PropTypes.object,
    // accounts: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    websocket: PropTypes.object,
  };

  constructor() {
    super()
    this.state = {
      accounts: { },
      groups: { },
      selection: [],
      payload: 'some info',
    };

    // Used to store references.
    this._input = {};
  }

  componentDidMount() {
    // Load the study information
    // Ask for the information to the server
    this.context.websocket.send( wsSurveyStateGet(this.props.account.email) )
    setTimeout(() => {console.log('didMount> ' + this.state.payload);this.setState({payload: 'some more info!!'});}, 4000)
  }

  render() {
    let props = this.props

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
      {
        this.props.children &&
        React.cloneElement(
          this.props.children,
          {
            payload: this.state.payload,
            submit: (infoToSubmit) => console.log(infoToSubmit),
          }
        )
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account
  }
}

export default connect(mapStateToProps)(SurveyContainer)
