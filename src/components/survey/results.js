import React, { PropTypes, Component } from 'react'


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


import { connect } from 'react-redux'

import Wait from './wait'

import {
 ActionShop,
 ActionShoppingBasket,
 ActionSpeakerNotesOff,
 ActionSpeakerNotes,
 ActionSpellcheck,
 ActionStars,
 ActionStore,
 ToggleStar,
 ToggleStarBorder,
} from 'material-ui/svg-icons';


 // need to set the current user email here for the attribution variable. (type 0 and 2)

class Results extends Component {

  constructor(props) {
    super(props);
     this.state = {data : null, groupType: -1, currentUserEmail: '', accounts : {}};
  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    websocket: React.PropTypes.object,
  };


  componentWillReceiveProps(nextProps) {
    console.log("nextProps vienen pa ca")
    console.log(nextProps)
    this.setState({
      groupType: nextProps.groupType,
      currentUserEmail : nextProps.account.email,
      accounts : nextProps.accounts,
      data : this.processIncomingData(nextProps.ideas, nextProps.accounts) || []
    });

  }

  processIncomingData = (data, accounts) =>{


        if( data == null ){
          return
        }

        var results = data.reduce(
          (prev, current) => {
                let account = accounts[current.creator]
                var currentEntry = { account : {email: current.creator, firstname: account.firstName, surname: account.surname }, stars: [0,0,0,0,0], lastTimeSubmitted: current.timeSubmitted }
                var index = (current.rating[0] || 0) -1
                if ( index > -1 )
                    currentEntry.stars[index] = 1;
                    var isThereIndex = prev.findIndex( (element, index, array)=>{ return element.account.email == currentEntry.account.email})
                if ( isThereIndex > -1 ){

                    for ( var i in currentEntry.stars ){
                      prev[isThereIndex].stars[i] = prev[isThereIndex].stars[i] + currentEntry.stars[i]
                    }

                    if ( prev[isThereIndex].lastTimeSubmitted < currentEntry.lastTimeSubmitted ){
                        prev[isThereIndex].lastTimeSubmitted = currentEntry.lastTimeSubmitted;
                    }

                } else {
                  prev.push(currentEntry);
                }
                return prev;
          },
          []
        );

        var data = results;
        this.computeRanking(data);



        data.sort(function(a, b){
          if ( b.score-a.score == 0){
            if ( b.stars[4]-a.stars[4] == 0){
              if ( b.stars[3]-a.stars[3] == 0){
                if ( b.stars[2]-a.stars[2] == 0){
                  if ( b.stars[1]-a.stars[1] == 0){
                    if ( b.stars[0]-a.stars[0] == 0){
                      return a.lastTimeSubmitted - b.lastTimeSubmitted;
                    }else { return b.stars[0]-a.stars[0] }
                  } else { return b.stars[1]-a.stars[1] }
                } else { return b.stars[2]-a.stars[2] }
              } else { return b.stars[3]-a.stars[3] }
            } else { return b.stars[4]-a.stars[4] }
          } else { return b.score-a.score }
        });

        data.map((item,i) => {item.rank = (i+1); item.pay = this.getPay(i+1);});

      return data;
  }

  getPay = (i) => {
    switch (i) {
      case 1:
        return 4;
      case 2:
        return 2;
      case 3:
        return 1;
      case 4:
        return 0.5;
      case 5:
        return 0.5;
      default:
        return 0;
    }
  }

  // Function to compute the ranking of each participant and add to the object.
  computeRanking = (data) =>{
    data.map( (participant) => {participant.score = this.computeStarScore(participant.stars)});


  }

  computeStarScore = (stars) => {
    var totalScore = 0;
    for ( var i = 0; i < stars.length; i++){
      totalScore +=  (i+1)*stars[i];
    }
    return totalScore
  }


  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  getStarIcon = (i) => {
    switch (i) {
      case 1:
          return <div style={{width: 22, height: 36}}>
                    <ToggleStar style={{width:10,height:10, position:'relative', top: 8, left: 5}}/></div>
      case 2:
          return <div style={{width: 22, height: 36}}>
                    <ToggleStar style={{width:10,height:10, position:'relative',top: 3,left:5}}/><br/>
                    <ToggleStar style={{width:10,height:10, position:'relative',left:5,bottom:3}}/>
                  </div>
      case 3:
          return <div style={{width: 22, height: 36}}>
                  <ToggleStar style={{width:10,height:10, position:'relative', top: 3}}/>
                  <ToggleStar style={{width:10,height:10, position:'relative', top: 3}}/><br/>
                  <ToggleStar style={{width:10,height:10, position:'relative',left:5,bottom:3}}/>
                 </div>
      case 4:
          return <div style={{width: 22, height: 36}}>
                  <ToggleStar style={{width:10,height:10,position: 'relative', top: 3}}/>
                  <ToggleStar style={{width:10,height:10,position: 'relative', top: 3}}/><br/>
                  <ToggleStar style={{width:10,height:10,position: 'relative',bottom:3}}/>
                  <ToggleStar style={{width:10,height:10,position: 'relative',bottom:3}}/>
                 </div>
      case 5:
          return <div style={{width: 22, height: 36}}><ToggleStar style={{width:10,height:10}}/><ToggleStar style={{width:10,height:10}}/><br/>
                      <ToggleStar style={{width:10,height:10}}/><ToggleStar style={{width:10,height:10}}/><br/>
                      <ToggleStar style={{width:10,height:10, position:'relative', top: -24, left: 5}}/></div>
      default:
        return <div style={{width: 22, height: 36}}></div>
    }

  }

  getParticipantLine = (participant,i) => {
    var participantLine = <div key={i} style={{display:'flex',}}>
                  <Card style={{minWidth:72, paddingTop: 10,}}><CardText style={{fontSize:'large',textAlign:'center'}}>{participant.rank}</CardText></Card>
                  <Card style={{minWidth:300, paddingTop: 10,}}><CardText style={{fontSize:16}}>{participant.account.firstname +' '+ participant.account.surname} </CardText></Card>
                  <Card style={{paddingTop: 10,}}>
                        <CardText>
                          <div style={{display:'flex'}}>{
                            participant.stars.map( (number,starType) => {
                                return <div key={starType} style={{display:'flex'}}>
                                              {this.getStarIcon(starType+1)}
                                            <div style={{ padding: 5, paddingLeft: 0, fontSize:'large',marginLeft:3, marginRight:4}}>
                                              {number}
                                            </div>
                                       </div>
                            }).reverse()
                          }
                          </div>
                        </CardText></Card>
                  <Card style={{minWidth:77, paddingTop: 10,}}><CardText style={{fontSize:'large',textAlign:'center'}}>{participant.score}</CardText></Card>
                  { (this.state.groupType > 1) ? <Card style={{minWidth:75, paddingTop: 10,}}><CardText style={{fontSize:'large',textAlign:'center'}}>£{participant.pay}</CardText></Card> : '' }
           </div>

    if ( this.state.groupType == 0 || this.state.groupType == 2 ){
      if ( this.state.currentUserEmail == participant.account.email ){
        return participantLine;
      }
    }else {
        return participantLine;
    }

  }

//'_marker'
  render() {

    const { textColor } = this.context.muiTheme.palette;

    let title = 'Results Summary';
    let text = 'Here you can see you performance with respect to ther other participants within your group:';
    let data = this.state.data;

    if( data == null ){
      return (<div></div>)
    }

    return (
      <div>
      {
        // <h1>{message}</h1>
        // <Wait melacome={<ActionShop />} /><ActionStore /> <ActionShop />
        // <div> {this.props.firstName} {v} {this.mlk()}</div>

      }


          <Card
            style={{
              padding: 30,
              margin: '2% 15% 15%',
              minWidth: 900,
            }}
          >
            <CardHeader
              title={title}
              titleStyle={{
                fontSize: 24,
                color: textColor,
              }}
            />
            <CardText style={{ paddingTop: 0, }} >

              {text}
              <br/><br/>
              <div style={{display:'flex',textAlign:'center'}}>
                  <Card ><CardText style={{fontSize:'large'}}>Rank</CardText></Card>
                  <Card style={{minWidth:300}}><CardText style={{fontSize:'large'}}>Participant</CardText></Card>
                  <Card style={{minWidth:252}}><CardText style={{fontSize:'large'}}>Stars</CardText></Card>
                  <Card><CardText style={{fontSize:'large'}}>Score</CardText></Card>
                  { (this.state.groupType > 1) ? <Card style={{minWidth:75}}><CardText style={{fontSize:'large'}}>Pay</CardText></Card> : ''}
              </div>

                {

                  data.map( (participant,i) => {

                        return this.getParticipantLine(participant,i)

                  })


                }

                <RaisedButton
                  id="submitAnswers"
                  style={{color: 'rgb(124, 234, 127)',marginTop: 20, textAlign:'center'}}
                  type="submit"
                  onClick= { () => this.props.submit( this.state.data ) }
                >
                  Continue
                </RaisedButton>


            </CardText>



          </Card>

      </div>
    )
  }
}

Results.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

//export default Question

const mapStateToProps = (state) => {
  return {
    account : state.account,
    accounts : state.task.payload.accounts,
    groupType : state.task.payload.groupType,
    ideas: (state.task.payload) ? state.task.payload.ideas: [],
  }
}

export default connect(mapStateToProps)(Results)
