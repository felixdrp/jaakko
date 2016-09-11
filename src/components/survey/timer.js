import React, { PropTypes, Component } from 'react'


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



import { connect } from 'react-redux'

import Wait from './wait'


class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {elapsed:0, totalSeconds: 5 };
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  setTimer = (totalSeconds) => {
    this.setState({totalSeconds : totalSeconds})

  }

  componentDidMount() {
      this.startCountDown();
  }

  startCountDown = () => {

      // componentDidMount is called by react when the component
      // has been rendered on the page. We can set the interval here:
      this.setState({ startt: new Date(), timer : setInterval(this.tick, 50)});
  }

  stopCountDown = () => {

      // This method is called immediately before the component is removed
      // from the page and destroyed. We can clear the interval here:
      // this.state.elapsed = new Date() - this.start);
      clearInterval(this.state.timer);
  }

  tick = () => {

        // This function is called every 50 ms. It updates the
        // elapsed counter. Calling setState causes the component to be re-rendered
        if ((this.state.elapsed/1000) >= this.state.totalSeconds){
          this.stopCountDown();
          this.props.timerCallback();
        }
        this.setState({elapsed : new Date() - this.state.startt});
  }

  render() {
    let elapsed = this.state.elapsed / 1000
    let left = (this.state.totalSeconds-elapsed) > 0 ? (this.state.totalSeconds-elapsed) : 0;
    let minutes = Math.floor(left/60)
    let seconds = Math.floor(left%60).toString().length < 2 ? '0'+(Math.floor(left%60).toString()) : Math.floor(left%60).toString();


    return (

        <div style={{
          display: 'inline',
          border: '1px solid black',
          backgroundColor: 'white',
          padding: 7,
          position: 'fixed',
          top:4,
          left:4,
          fontWeight:'bolder',
          fontSize:'large',
        }}> Time Left: <div style={{  display: 'inline', color:'red',}}>{minutes}:{seconds}</div></div>

    )
  }
}

Timer.propTypes = {

  // addTodo: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    //firstName : state.account.firstName
  }
}

export default connect(mapStateToProps)(Timer)
