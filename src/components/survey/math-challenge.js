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
      var number = Math.round((Math.random()*15)+1);
      sum += number;
      numbers.push(number);
    }
    results.push({numbers : numbers , sum : sum, solution: undefined, timeSubmitted: undefined });
  }
  return results;
}

function formatNumbers(numberArray){
  var result = '';
  for( var n in numberArray){
    result += numberArray[n]+" + ";
  }
  return result.slice(0,result.length-2)+'= ';
}

var instructions = 'Solve as many math problems as you can in 7 minutes';

class MathChallenge extends Component {

  constructor(props) {
    super(props);
    this.state = { numbers: getNumbers(30,5),
     };

  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    websocket: React.PropTypes.object,
  };



  handleSave(text) {favourites
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  componentDidMount(){

      // componentDidMount is called by react when the component
      // has been rendered on the page. We can set the interval here:

  }

  componentWillUnmount(){

      // This method is called immediately before the component is removed
      // from the page and destroyed. We can clear the interval here:
      // this.state.elapsed = new Date() - this.start);
      clearInterval(this.state.timer);
  }

  handleChange(event, index, value, id) {
    var numbers = this.state.numbers.slice();
    var index = id.split("_")[1];
    numbers[index].solution = value;
    numbers[index].timeSubmitted = Date.now();
    this.setState({numbers})
  }



  gatherData = () => {
    //console.log( JSON.stringify(this.state) );
    this.setState({isSubmitted : true});
    // debugger
    this.props.submit(this.state);
  }

  render() {
    let props = this.props;

    let title = this.props.message ? this.props.message : 'Math Challenge'
    let elapsed = Math.round(this.state.elapsed / 100)
    let seconds = (elapsed / 10).toFixed(1)

    const { textColor } = this.context.muiTheme.palette;

    if ( this.state.isSubmitted ) {

      return ( <Wait/>)

    }

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
            instructions.split('\n').map( (item,i) => <div key={i} style={{marginBottom:20}}>{item}</div>)
          }
          <br />
          <Timer
            limitTime={20}
            timerCallback={ () => this.gatherData() }
          ></Timer>
            <div>
            {
                this.state.numbers.map( (q,i) => <div key={i}>{formatNumbers(q.numbers)}
                                          <TextField id={'math_'+i} style={{
                                              paddingLeft: 10,
                                              marginRight: 20,
                                              }}
                                              onChange={ (event, index, value) => this.handleChange(event, value, index, 'math_'+i)}
                                              />
                                      </div> )
            }
            </div>
          <br />


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
