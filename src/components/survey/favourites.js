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

import Timer from './timer'

import Wait from './wait'
import Rater from './rater'

import {
 ActionShop,
 ActionShoppingBasket,
 ActionSpeakerNotesOff,
 ActionSpeakerNotes,
 ActionSpellcheck,
 ActionStars,
 ActionStore,
} from 'material-ui/svg-icons';


class Favourites extends Component {

  constructor(props) {
    super(props);
     this.state = {favourites : new Array(6)};
     this.isSubmitted = false;
  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    websocket: React.PropTypes.object,
  };


  componentWillReceiveProps(nextProps) {
    this.setState({
      data : nextProps.ideas || []
    });
  }

  // componentWillMount (){
  //   var initData = [{"accountId":"rp@p.com","startTimestamp":1474905857189,"endTimestamp":1474905977310,"surveyData":[{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzEyLjU1OQ==","title":"1G","description":"1G","creator":"rp3@p.com","rating":[],"timeSubmitted":1474905729190,"similarTo":[],"similarityHide":true},{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzEyLjYxOQ==","title":"1H","description":"1H","creator":"rp4@p.com","rating":[],"timeSubmitted":1474905733349,"similarTo":[],"similarityHide":false},{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzMzLjM0OQ==","title":"1HH","description":"1HH","creator":"rp4@p.com","rating":[],"timeSubmitted":1474905737244,"similarTo":[],"similarityHide":false},{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzI5LjE5","title":"1GG","description":"1GG","creator":"rp3@p.com","rating":[],"timeSubmitted":1474905743242,"similarTo":[],"similarityHide":false}],"surveyId":8,"groupId":1474909224623},{"accountId":"rp3@p.com","startTimestamp":1474905857194,"endTimestamp":1474905977333,"surveyData":[{"group":1474909224594,"groupType":0,"id":"cnAxNDc0OTA5MzEyLjYwNA==","title":"1B","description":"1B","creator":"rpsoft@gmail.com","rating":[],"timeSubmitted":1474909343001,"similarTo":["Z2wxNDc0OTA5MzEyLjYwNQ=="],"similarityHide":false},{"group":1474909224594,"groupType":0,"id":"Z2wxNDc0OTA5MzEyLjYwNQ==","title":"1D","description":"1D","creator":"glucas2@walker.com","rating":[],"timeSubmitted":1474909347311,"similarTo":["cnAxNDc0OTA5MzEyLjYwNA=="],"similarityHide":true},{"group":1474909224594,"groupType":0,"id":"cnAxNDc0OTA5MzQzLjAwMQ==","title":"1BB","description":"1BB","creator":"rpsoft@gmail.com","rating":[],"timeSubmitted":1474909376427,"similarTo":[],"similarityHide":false},{"group":1474909224594,"groupType":0,"id":"Z2wxNDc0OTA5MzQ3LjMxMQ==","title":"1DD","description":"1DD","creator":"glucas2@walker.com","rating":[],"timeSubmitted":1474909378758,"similarTo":[],"similarityHide":false}],"surveyId":8,"groupId":1474909224634},{"accountId":"rp2@p.com","startTimestamp":1474905857193,"endTimestamp":1474905977358,"surveyData":[{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzEyLjU1OQ==","title":"1G","description":"1G","creator":"rp3@p.com","rating":[],"timeSubmitted":1474905729190,"similarTo":[],"similarityHide":false},{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzEyLjYxOQ==","title":"1H","description":"1H","creator":"rp4@p.com","rating":[],"timeSubmitted":1474905733349,"similarTo":[],"similarityHide":false},{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzMzLjM0OQ==","title":"1HH","description":"1HH","creator":"rp4@p.com","rating":[],"timeSubmitted":1474905737244,"similarTo":[],"similarityHide":false},{"group":1474909224634,"groupType":3,"id":"cnAxNDc0OTA1NzI5LjE5","title":"1GG","description":"1GG","creator":"rp3@p.com","rating":[],"timeSubmitted":1474905743242,"similarTo":[],"similarityHide":false}],"surveyId":8,"groupId":1474909224623},{"accountId":"rp4@p.com","startTimestamp":1474905857197,"endTimestamp":1474905977424,"surveyData":[{"group":1474909224594,"groupType":0,"id":"cnAxNDc0OTA5MzEyLjYwNA==","title":"1B","description":"1B","creator":"rpsoft@gmail.com","rating":[],"timeSubmitted":1474909343001,"similarTo":["Z2wxNDc0OTA5MzEyLjYwNQ=="],"similarityHide":false},{"group":1474909224594,"groupType":0,"id":"Z2wxNDc0OTA5MzEyLjYwNQ==","title":"1D","description":"1D","creator":"glucas2@walker.com","rating":[],"timeSubmitted":1474909347311,"similarTo":["cnAxNDc0OTA5MzEyLjYwNA=="],"similarityHide":false},{"group":1474909224594,"groupType":0,"id":"cnAxNDc0OTA5MzQzLjAwMQ==","title":"1BB","description":"1BB","creator":"rpsoft@gmail.com","rating":[],"timeSubmitted":1474909376427,"similarTo":[],"similarityHide":true},{"group":1474909224594,"groupType":0,"id":"Z2wxNDc0OTA5MzQ3LjMxMQ==","title":"1DD","description":"1DD","creator":"glucas2@walker.com","rating":[],"timeSubmitted":1474909378758,"similarTo":[],"similarityHide":false}],"surveyId":8,"groupId":1474909224634},{"accountId":"glucas2@walker.com","startTimestamp":1474909457577,"endTimestamp":1474909577748,"surveyData":[{"group":1474909224611,"groupType":1,"id":"ZmUxNDc0OTA5MzEyLjYxMQ==","title":"1A","description":"1A","creator":"felixdrp@gmail.com","rating":[],"timeSubmitted":1474909341972,"similarTo":["ZmUxNDc0OTA5MzQxLjk3Mw=="],"similarityHide":false},{"group":1474909224611,"groupType":1,"id":"Z2wxNDc0OTA5MzEyLjYwOA==","title":"1C","description":"1C","creator":"glucas@walker.com","rating":[],"timeSubmitted":1474909345262,"similarTo":["ZmUxNDc0OTA5MzQxLjk3Mw=="],"similarityHide":false},{"group":1474909224611,"groupType":1,"id":"Z2wxNDc0OTA5MzQ1LjI2Mg==","title":"1CC","description":"1CC","creator":"glucas@walker.com","rating":[],"timeSubmitted":1474909367777,"similarTo":[],"similarityHide":true},{"group":1474909224611,"groupType":1,"id":"ZmUxNDc0OTA5MzQxLjk3Mw==","title":"1AA","description":"1AA","creator":"felixdrp@gmail.com","rating":[],"timeSubmitted":1474909377476,"similarTo":["ZmUxNDc0OTA5MzEyLjYxMQ==","Z2wxNDc0OTA5MzEyLjYwOA=="],"similarityHide":false}],"surveyId":8,"groupId":1474909224594},{"accountId":"rpsoft@gmail.com","startTimestamp":1474909457579,"endTimestamp":1474909577764,"surveyData":[{"group":1474909224611,"groupType":1,"id":"ZmUxNDc0OTA5MzEyLjYxMQ==","title":"1A","description":"1A","creator":"felixdrp@gmail.com","rating":[],"timeSubmitted":1474909341972,"similarTo":[],"similarityHide":false},{"group":1474909224611,"groupType":1,"id":"Z2wxNDc0OTA5MzEyLjYwOA==","title":"1C","description":"1C","creator":"glucas@walker.com","rating":[],"timeSubmitted":1474909345262,"similarTo":["Z2wxNDc0OTA5MzQ1LjI2Mg=="],"similarityHide":false},{"group":1474909224611,"groupType":1,"id":"Z2wxNDc0OTA5MzQ1LjI2Mg==","title":"1CC","description":"1CC","creator":"glucas@walker.com","rating":[],"timeSubmitted":1474909367777,"similarTo":["Z2wxNDc0OTA5MzEyLjYwOA=="],"similarityHide":false},{"group":1474909224611,"groupType":1,"id":"ZmUxNDc0OTA5MzQxLjk3Mw==","title":"1AA","description":"1AA","creator":"felixdrp@gmail.com","rating":[],"timeSubmitted":1474909377476,"similarTo":[],"similarityHide":true}],"surveyId":8,"groupId":1474909224594},{"accountId":"glucas@walker.com","startTimestamp":1474909457579,"endTimestamp":1474909577764,"surveyData":[{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzEyLjU1NA==","title":"1E","description":"1E","creator":"rp@p.com","rating":[],"timeSubmitted":1474905719186,"similarTo":["cnAxNDc0OTA1NzE5LjE4Ng=="],"similarityHide":false},{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzEyLjU5Mg==","title":"1F","description":"1F","creator":"rp2@p.com","rating":[],"timeSubmitted":1474905724001,"similarTo":[],"similarityHide":false},{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzI0LjAwMQ==","title":"1FF","description":"1FF","creator":"rp2@p.com","rating":[],"timeSubmitted":1474905748039,"similarTo":[],"similarityHide":false},{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzE5LjE4Ng==","title":"1EE","description":"1EE","creator":"rp@p.com","rating":[],"timeSubmitted":1474905752712,"similarTo":["cnAxNDc0OTA1NzEyLjU1NA=="],"similarityHide":false}],"surveyId":8,"groupId":1474909224611},{"accountId":"felixdrp@gmail.com","startTimestamp":1474909457577,"endTimestamp":1474909577772,"surveyData":[{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzEyLjU1NA==","title":"1E","description":"1E","creator":"rp@p.com","rating":[],"timeSubmitted":1474905719186,"similarTo":["cnAxNDc0OTA1NzE5LjE4Ng=="],"similarityHide":false},{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzEyLjU5Mg==","title":"1F","description":"1F","creator":"rp2@p.com","rating":[],"timeSubmitted":1474905724001,"similarTo":[],"similarityHide":false},{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzI0LjAwMQ==","title":"1FF","description":"1FF","creator":"rp2@p.com","rating":[],"timeSubmitted":1474905748039,"similarTo":[],"similarityHide":false},{"group":1474909224623,"groupType":2,"id":"cnAxNDc0OTA1NzE5LjE4Ng==","title":"1EE","description":"1EE","creator":"rp@p.com","rating":[],"timeSubmitted":1474905752712,"similarTo":["cnAxNDc0OTA1NzEyLjU1NA=="],"similarityHide":true}],"surveyId":8,"groupId":1474909224611}]
  //
  //   this.setState({
  //     data : initData[0].surveyData
  //   })
  //
  //
  // }


  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  rater = (index,rating) => {
    var data = this.state.data;
    var favourites = this.state.favourites;

    if ( rating == -1 ){
      for ( var f in favourites){
        if (favourites[f] == index ){
          favourites[f] = undefined;
          this.currentRating = 0;
          data[index].rating = 0;

        }
      }
    } else {
      if ( favourites[rating] == undefined ){
      //  debugger
        for ( var f in favourites){
          if (favourites[f] == index ){
            favourites[f] = undefined;
            this.currentRating = 0;
            data[index].rating = 0;
          }
        }
        data[index].rating = rating;
        this.currentRating = rating;
        favourites[rating] = index;
      }
    }

    this.setState({data: data});
    this.setState({favourites: favourites});

  }


    gatherData = () => {
      if ( !this.isSubmitted ){
        this.props.submit( this.state )
        this.isSubmitted = true;
      }
    }

  alerthing = () => {
    alert('boom');
  }

  render() {

    const { textColor } = this.context.muiTheme.palette;

    let title = 'Favourites task';
    let text = 'Rate the following works, and show which ones are your favourites:';

    let data = this.state.data || [];
    let raters = new Array(data.length);

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
            <CardText
              style={{
                paddingTop: 0,
              }}
              >

              {text.split('\n').map( (item,i) => <div key={i} style={{marginBottom:10}}>{item}</div>)}
            </CardText>


            <br />

            {
              data.map( (entry,i) => {
                var lineToDraw = <div key={i} style={{padding:5,display:'flex'}}>

                              <Card style={{paddingTop: '0%',fontWeight: 800,}}>
                                <CardText style={{padding:8}}>
                                  {i+'.'}
                                </CardText>
                              </Card>

                              <Card style={{width:460}}>
                                <CardHeader style={{padding:8}}>
                                  {entry.title}
                                </CardHeader>
                                <CardText style={{padding:8}}>
                                  {entry.description}
                                </CardText>
                              </Card>

                              <Card>
                                  <CardText style={{padding:20}}>
                                    <Rater entryIndex={i} raterCallback={this.rater} currentRating={entry.rating}/>
                                  </CardText>
                              </Card>

                      </div>

                return !entry.similarityHide ? lineToDraw : <div key={i}> </div>
              } )
            }

            <RaisedButton
              id="submitAnswers"
              style={{color: 'white',}}
              type="submit"
              onClick= { this.gatherData }
            >
              Submit
            </RaisedButton>
          </Card>

      </div>
    )
  }
}


Favourites.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

//export default Question

const mapStateToProps = (state) => {
  return {
    firstName : state.account.firstName,
    ideas: (state.task.payload) ? state.task.payload.ideas: [],

  }
}

export default connect(mapStateToProps)(Favourites)
