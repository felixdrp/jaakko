import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import sessionData from '../../session-data'

import {
  wsSurveyStateGet,
} from '../../websocket-message/query-actions'

import {
  wsSubmitSurveyInfo,
} from '../../websocket-message/server-actions'



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
    this.getSurveyInfo()
  }

  componentWillReceiveProps() {
    this.getSurveyInfo()
  }

  getSurveyInfo() {
    console.log('mooooontttttooooooooooo!!!!!!!!!')
    // Load the study information
    // Ask for the information to the server
    let getInfo = () => {
      // console.log('this.context.websocket.ws.readyState')
      // console.log(this.context.websocket.ws.readyState)
      this.context.websocket.send( wsSurveyStateGet(this.props.account.email || 'unassigned') )
    }

    if (this.context.websocket.ws.readyState == 0) {
      setTimeout( getInfo, 180 )
    } else {
      getInfo()
    }

    // Take the payload directly from the session-data file.
    // setTimeout(() => {console.log('didMount> ' + this.state.payload);this.setState({payload: 'some more info!!'});}, 4000)
    // setTimeout(() => {console.log('didMount> ' + this.state.payload);this.submitInfo({payload: 'some more info!!'});}, 4000)
    this.setState({start: Date.now()});
  }

  submitInfo( infoObject ) {
    let props = this.props
    this.context.websocket.send(
      wsSubmitSurveyInfo(
        {
          accountId: 'account' in props? props.account.email || 'unassigned': '',
          startTimestamp: this.state.start,
          endTimestamp: Date.now(),
          surveyData: infoObject,
        }
      )
    )
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
            payload: { ...this.state.payload, parentProps: this.props },
            submit: ( infoToSubmit ) => this.submitInfo( infoToSubmit ),
          }
        )
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  }
}

export default connect(mapStateToProps)(SurveyContainer)
