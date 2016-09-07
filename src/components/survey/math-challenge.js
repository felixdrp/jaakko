import React, { PropTypes, Component } from 'react'


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Timer from './timer'


import { connect } from 'react-redux'

import Wait from './wait'

/**
* N number of math questions with M numbers. (all additions, and solution included)
*
*/
function getNumbers(N,M){
  var results = [];
  for (var i = 0; i < N; i++ ){
    var numbers = [];
    var sum = 0;
    for (var j = 0; j < M; j++ ){
      var number = Math.round((Math.random()*100)+1);
      sum += number;
      numbers.push(number);
    }
    results.push({numbers : numbers , sum : sum });
  }
//  debugger;
  return results;
}

function formatNumbers(numberArray){
  var result = '';
  for( var n in numberArray){
    result += numberArray[n]+" + ";
  }
  return result.slice(0,result.length-2)+'= ';
}

var instructions = 'For this task you will be asked to solve simple addition problems correct. For example you could be asked to solve the following “56+73+5+10+11” you would simply answer is “155” and move onto the next question. There will be multiple problems and you will be asked to solve as many as possible in the 5 minutes given. The number of correct answers will then be calculated and showed to you after the task is over. \n Your name will appear on a ranking of the group’s performance and your will be ranked from the best performer (person with the most correct answers) to the worst performer (person with the least amount of correct answers). The exact score of the participant in your group will not be shown. \n In this task your pay will depend on your performance relative to the other members in the group. The pay structure will be as shown below. \n The task will have a series of addition problems like the ones below. You will be asked to solve as many as you can in the 5 minutes. Only correct answers will be counted toward your score.';

class MathChallenge extends Component {

  constructor(props) {
    super(props);
    this.state = {elapsed:0, startt: new Date(), numbers: getNumbers(30,5) };

  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    websocket: React.PropTypes.object,
  };

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  componentDidMount(){

      // componentDidMount is called by react when the component
      // has been rendered on the page. We can set the interval here:
      this.setState({timer : setInterval(this.tick, 50)});
  }

  componentWillUnmount(){

      // This method is called immediately before the component is removed
      // from the page and destroyed. We can clear the interval here:
      // this.state.elapsed = new Date() - this.start);
      clearInterval(this.state.timer);
  }

  tick = () => {

        // This function is called every 50 ms. It updates the
        // elapsed counter. Calling setState causes the component to be re-rendered

        this.setState({elapsed : new Date() - this.state.startt});
  }

  render() {
    let title = this.props.message ? this.props.message : 'Math Challenge'
    let elapsed = Math.round(this.state.elapsed / 100)
    let seconds = (elapsed / 10).toFixed(1)

    const { textColor } = this.context.muiTheme.palette;

    return (
      <div>
      <Card
        style={{
          padding: 30,
          margin: '2% 10% 10%',
          minWidth: 700,
        }}
      >
        <CardHeader
          title={title}
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
          {
            instructions.split('\n').map( (item) => <div key={item} style={{marginBottom:20}}>{item}</div>)
          }
          <br />
            <Timer></Timer>
            <div>
            {
                this.state.numbers.map( (q,i) => <div key={i}>{formatNumbers(q.numbers)}
                                          <TextField id={'math_'+i} style={{
                                              paddingLeft: 10,
                                              marginRight: 20,
                                              }} />
                                      </div> )
            }
            </div>
          <br />

          <RaisedButton
            id="submitAnswers"
            style={{backgroundColor: 'grey',}}
            type="submit"

          >
            Submit
          </RaisedButton>

        </CardText>

      </Card>

      </div>
    )
  }
}

MathChallenge.propTypes = {

  // addTodo: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    firstName : state.account.firstName
  }
}

export default connect(mapStateToProps)(MathChallenge)
