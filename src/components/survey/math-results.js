import React, { PropTypes, Component } from 'react'


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
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


var currentUserEmail = 'melacome3@gmail.com'; // need to set the current user email here for the attribution variable. (type 0 and 2)

class MathResults extends Component {

  constructor(props) {
    super(props);
     this.state = {};
  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    websocket: React.PropTypes.object,
  };

  processMathResults = (data,accounts) => {

            if( data == null ){
              return
            }

            var results = data.reduce(
              (prev, current) => {
                    let account = accounts[current.accountId]
                    var currentEntry = { account : {email: current.accountId, firstname: account.firstName, surname: account.surname },  mathScore: 0, lastTimeSubmitted: current.endTimestamp }

                    var res = current.surveyData.numbers.reduce(
                        (prev, currentNumbers ) => {
                          if (currentNumbers.solution){
                            if ( (currentNumbers.solution+'').trim() == (currentNumbers.sum+'').trim()){
                              prev.total++;
                              prev.lastTimeSubmitted = currentNumbers.timeSubmitted > prev.lastTimeSubmitted ?  currentNumbers.timeSubmitted : prev.lastTimeSubmitted
                            }
                          }
                          return prev
                      },{total:0,lastTimeSubmitted:0})

                    currentEntry.mathScore = res.total;
                    currentEntry.lastTimeSubmitted = res.lastTimeSubmitted;

                    prev.push(currentEntry)
                    return prev;
              },
              []
            );

            return results;
  }



  componentWillMount() {
    var data = [{ account : {email:'melacomeNot@gmail.com', firstname:'paco', surname:'perez caballero'}, mathScore: 23},
               { account : {email:'melacome@gmail.com', firstname:'iker', surname:'jimenez'}, mathScore: 34},
               { account : {email:'melacome3@gmail.com', firstname:'carmen', surname:'porter'}, mathScore: 34},
               { account : {email:'melacome2@gmail.com', firstname:'el maestro', surname:'enrique de vicente'}, mathScore: 5},
               { account : {email:'melacome@gmail.com', firstname:'doctor', surname:'gaona'}, mathScore: 7}
             ];

   var data2 = [
     {"accountId":"felixdrp@gmail.com","startTimestamp":1474741488092,"endTimestamp":1474741508190,"surveyData":{"numbers":[{"numbers":[30,45,5,93,77],"sum":250,"solution":"250  ","timeSubmitted":1474741493550},{"numbers":[99,2,61,18,66],"sum":246,"solution":"3455","timeSubmitted":1474741495764},{"numbers":[43,72,54,49,84],"sum":302},{"numbers":[12,81,48,47,36],"sum":224},{"numbers":[28,64,7,4,3],"sum":106},{"numbers":[50,82,43,53,47],"sum":275},{"numbers":[75,6,50,28,8],"sum":167},{"numbers":[71,64,3,6,19],"sum":163},{"numbers":[24,65,60,31,83],"sum":263},{"numbers":[88,73,65,55,48],"sum":329},{"numbers":[39,72,94,8,24],"sum":237},{"numbers":[23,5,64,61,6],"sum":159},{"numbers":[39,2,19,54,74],"sum":188},{"numbers":[27,82,68,89,39],"sum":305},{"numbers":[3,33,90,68,31],"sum":225},{"numbers":[11,27,83,4,60],"sum":185},{"numbers":[62,49,85,72,92],"sum":360},{"numbers":[94,89,74,68,6],"sum":331},{"numbers":[56,20,76,18,68],"sum":238},{"numbers":[13,1,81,83,47],"sum":225},{"numbers":[37,23,33,21,69],"sum":183},{"numbers":[98,98,37,12,40],"sum":285},{"numbers":[75,73,31,90,16],"sum":285},{"numbers":[2,26,63,72,45],"sum":208},{"numbers":[33,73,52,61,10],"sum":229},{"numbers":[17,34,22,6,81],"sum":160},{"numbers":[46,99,67,94,58],"sum":364},{"numbers":[67,11,16,4,6],"sum":104},{"numbers":[27,48,73,32,5],"sum":185},{"numbers":[45,44,98,84,72],"sum":343}]},"surveyId":39},
     {"accountId":"rpsoft@gmail.com","startTimestamp":1474741488475,"endTimestamp":1474741508627,"surveyData":{"numbers":[{"numbers":[85,51,84,75,60],"sum":355,"solution":355,"timeSubmitted":1474741498819},{"numbers":[39,37,51,2,93],"sum":222,"solution":"y498yy98","timeSubmitted":1474741493779},{"numbers":[6,63,42,70,45],"sum":226,"solution":"226","timeSubmitted":1474741494300},{"numbers":[74,37,83,28,80],"sum":302,"solution":"kkl","timeSubmitted":1474741494549},{"numbers":[57,52,89,19,78],"sum":295,"solution":"kjl","timeSubmitted":1474741494809},{"numbers":[24,12,18,4,72],"sum":130,"solution":"kjl","timeSubmitted":1474741495010},{"numbers":[55,87,80,91,51],"sum":364,"solution":"klj","timeSubmitted":1474741495198},{"numbers":[30,87,65,65,16],"sum":263,"solution":"kl","timeSubmitted":1474741495301},{"numbers":[59,40,63,40,2],"sum":204,"solution":"jl","timeSubmitted":1474741495448},{"numbers":[68,34,52,94,99],"sum":347,"solution":"ggj","timeSubmitted":1474741495624},{"numbers":[20,70,2,6,29],"sum":127,"solution":"k","timeSubmitted":1474741495675},{"numbers":[87,40,26,54,69],"sum":276,"solution":"ghk","timeSubmitted":1474741495823},{"numbers":[38,25,96,34,16],"sum":209,"solution":"gkh","timeSubmitted":1474741495977},{"numbers":[47,67,49,78,83],"sum":324,"solution":"gkj","timeSubmitted":1474741496130},{"numbers":[80,87,100,93,67],"sum":427,"solution":"jgk","timeSubmitted":1474741496279},{"numbers":[38,31,92,42,21],"sum":224,"solution":"j","timeSubmitted":1474741496353},{"numbers":[61,34,10,31,26],"sum":162,"solution":"j","timeSubmitted":1474741496508},{"numbers":[96,44,33,41,10],"sum":224,"solution":"kgj","timeSubmitted":1474741496754},{"numbers":[36,65,50,17,66],"sum":234,"solution":"gjk","timeSubmitted":1474741496901},{"numbers":[87,7,24,42,92],"sum":252,"solution":"kjg","timeSubmitted":1474741497049},{"numbers":[97,66,9,7,1],"sum":180,"solution":"kj","timeSubmitted":1474741497151},{"numbers":[7,99,43,40,1],"sum":190,"solution":"jk","timeSubmitted":1474741497294},{"numbers":[5,95,64,79,71],"sum":314,"solution":"gkj","timeSubmitted":1474741497489},{"numbers":[7,35,80,84,66],"sum":272,"solution":"jbk","timeSubmitted":1474741497646},{"numbers":[30,6,60,22,9],"sum":127,"solution":"j","timeSubmitted":1474741497704},{"numbers":[11,37,11,41,76],"sum":176,"solution":"jk","timeSubmitted":1474741497891},{"numbers":[98,91,55,33,89],"sum":366,"solution":"jk","timeSubmitted":1474741498040},{"numbers":[36,41,26,86,54],"sum":243,"solution":"jl","timeSubmitted":1474741498218},{"numbers":[67,77,39,4,21],"sum":208,"solution":"lh","timeSubmitted":1474741498363},{"numbers":[40,86,75,61,36],"sum":298}]},"surveyId":39}
   ]
   var accounts = { list: [ 'rpsoft@gmail.com', 'felixdrp@gmail.com' ],
     'rpsoft@gmail.com':
      { email: 'rpsoft@gmail.com',
        firstName: 'suso',
        surname: 'rodriguez',
        token: '44e192de26457248f81c6609d2ecfc49',
        group: 1474740410598,
        surveyPointer: 9 },
     'felixdrp@gmail.com':
      { email: 'felixdrp@gmail.com',
        firstName: 'Felix',
        surname: 'RP',
        token: 'fc6bf88664ba58fd1f461cb1e4314a82',
        group: 1474740410589,
        surveyPointer: 9 } };

    var a = this.processMathResults(data2,accounts);

   console.log(JSON.stringify(a))

    data = a;
    //debugger;


    this.setState({groupType: 3});

    data.sort(function(a, b){
      return b.mathScore-a.mathScore
    });

    data.map((item,i) => {item.rank = (i+1); item.pay = this.getPay(i+1);});

    this.setState({data});

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
                  <Card style={{minWidth:77, paddingTop: 10,}}><CardText style={{fontSize:'large',textAlign:'center'}}>{participant.mathScore}</CardText></Card>
                  { (this.state.groupType > 1) ? <Card style={{minWidth:75, paddingTop: 10,}}><CardText style={{fontSize:'large',textAlign:'center'}}>£{participant.pay}</CardText></Card> : '' }
           </div>

    if ( this.state.groupType == 0 || this.state.groupType == 2 ){
      if ( currentUserEmail == participant.account.email ){
        return participantLine;
      }
    }else {

        return participantLine;

    }

  }

//'_marker'
  render() {

    const { textColor } = this.context.muiTheme.palette;

    let title = 'Math Results Summary';
    let text = 'Here you can see you performance with respect to ther other participants within your group:';
    let data = this.state.data;

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
                  <Card><CardText style={{fontSize:'large'}}>Score</CardText></Card>
                  { (this.state.groupType > 1) ? <Card style={{minWidth:75}}><CardText style={{fontSize:'large'}}>Pay</CardText></Card> : ''}
              </div>

                {

                  data.map( (participant,i) => {

                        return this.getParticipantLine(participant,i)

                  })


                }



            </CardText>

          </Card>

      </div>
    )
  }
}

MathResults.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

//export default Question

const mapStateToProps = (state) => {
  return {
    firstName : state.account.firstName
  }
}

export default connect(mapStateToProps)(MathResults)
