import React, { PropTypes, Component } from 'react'


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



import { connect } from 'react-redux'

import Wait from './wait'


var instructions = 'For this task you will be asked to solve simple addition problems correct. For example you could be asked to solve the following “56+73+5+10+11” you would simply answer is “155” and move onto the next question. There will be multiple problems and you will be asked to solve as many as possible in the 5 minutes given. The number of correct answers will then be calculated and showed to you after the task is over. \n Your name will appear on a ranking of the group’s performance and your will be ranked from the best performer (person with the most correct answers) to the worst performer (person with the least amount of correct answers). The exact score of the participant in your group will not be shown. \n In this task your pay will depend on your performance relative to the other members in the group. The pay structure will be as shown below. \n The task will have a series of addition problems like the ones below. You will be asked to solve as many as you can in the 5 minutes. Only correct answers will be counted toward your score.';

class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {elapsed:0, totalSeconds: 420 };
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  setTimer = (totalSeconds) => {
    this.setState({totalSeconds : totalSeconds})

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
        <div>
        {
        // <RaisedButton
        //   id="startTimer"
        //   style={{ fontWeight:'bolder',
        //             fontSize:'large',}}
        //   onClick={ this.startCountDown }
        // >
        //   Start
        // </RaisedButton>
        }
        <div style={{
          display: 'inline',
          border: '1px solid black',
          backgroundColor: 'white',
          padding: 7,
          position: 'fixed',
          top:0,
          left:0,
          fontWeight:'bolder',
          fontSize:'large',
        }}> Time Left: <div style={{  display: 'inline', color:'red',}}>{minutes}:{seconds}</div></div></div>

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
