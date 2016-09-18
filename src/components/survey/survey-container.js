import React, { PropTypes, Component } from 'react'

// import GeneralInfoView from './general-info-view'


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

export default SurveyContainer
