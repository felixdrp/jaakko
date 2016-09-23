import React, { PropTypes, Component } from 'react'


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import processSimilarities from '../../modules/similarity'

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
     this.state = {};
  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    websocket: React.PropTypes.object,
  };


  componentWillMount() {
    var data = [
      { group: 1474585598573,
       groupType: 0,
       id: '1',
       title: 'gfdgdfs',
       description: 'gfdgfds',
       creator: 'rpsoft@gmail.com',
       rating: [],
       timeSubmitted: 10,
       similarTo: ['2','7'],
       similarityHide : false,
     },
     { group: 1474585598573,
       groupType: 0,
       id: '2',
       title: '432432',
       description: 'gfdsgfds',
       creator: 'rpsoft@gmail.com',
       rating: [],
       timeSubmitted: 100,
       similarTo: ['1','3'],
       similarityHide : false,
     },
     { group: 1474585598573,
       groupType: 0,
       id: '3',
       title: '543gfdgfds63',
       description: 'hgdfsdf4',
       creator: 'rpsoft@gmail.com',
       rating: [],
       timeSubmitted: 50,
       similarTo: ['2'],
       similarityHide : false,
     },
     { group: 1474585598573,
        groupType: 0,
        id: '1',
        title: 'gfdgdfs',
        description: 'gfdgfds',
        creator: 'rpsoft@gmail.com',
        rating: [],
        timeSubmitted: 10,
        similarTo: ['2'],
        similarityHide : false,
      },
      { group: 1474585598573,
        groupType: 0,
        id: '2',
        title: '432432',
        description: 'gfdsgfds',
        creator: 'rpsoft@gmail.com',
        rating: [],
        timeSubmitted: 100,
        similarTo: ['1','3'],
        similarityHide : false,
       },
      { group: 1474585598573,
        groupType: 0,
        id: '3',
        title: '543gfdgfds63',
        description: 'hgdfsdf4',
        creator: 'rpsoft@gmail.com',
        rating: [],
        timeSubmitted: 50,
        similarTo: ['2'],
        similarityHide : false,
      },
      { group: 1474585598573,
        groupType: 0,
        id: '7',
        title: 'erhrhgf',
        description: 'hgfhgffhdg',
        creator: 'rpsoft@gmail.com',
        rating: [],
        timeSubmitted: 1474585612141,
        similarTo: ['1'],
        similarityHide : false,
      },
     { group: 1474585598573,
       groupType: 0,
       id: '4',
       title: 'erhrhgf',
       description: 'hgfhgffhdg',
       creator: 'rpsoft@gmail.com',
       rating: [],
       timeSubmitted: 1474585612141,
       similarTo: [],
       similarityHide : false,
     },
     { group: 1474585598573,
       groupType: 0,
       id: '5',
       title: '654546',
       description: 'hghgfhgfds',
       creator: 'rpsoft@gmail.com',
       rating: [],
       timeSubmitted: 200,
       similarTo: ['6'],
       similarityHide : false,
     },
     { group: 1474585598573,
       groupType: 0,
       id: '6',
       title: 'hgfghf',
       description: 'gfdfgds',
       creator: 'rpsoft@gmail.com',
       rating: [],
       timeSubmitted: 600,
       similarTo: ['5'],
       similarityHide : false, } ];

      this.setState({data});

      // var data = processSimilarities(data);
      //
      // console.log("finiquitao: "+JSON.stringify(data));

      this.setState({favourites : new Array(6)})

    }


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

    console.log(JSON.stringify(this.state));
    return this.state

  }

  alerthing = () => {
    alert('boom');
  }

  render() {

    const { textColor } = this.context.muiTheme.palette;

    let title = 'Favourites task';
    let text = 'Rate the following works, and show which ones are your favourites:';

    let data = this.state.data;
    let raters = new Array(data.lenght);

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
            <Timer timerCallback={() => this.props.submit( this.gatherData() )}></Timer>

            {
              data.map( (entry,i) => {
                return <div key={i} style={{padding:5,display:'flex'}}>

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
              } )
            }


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
    firstName : state.account.firstName
  }
}

export default connect(mapStateToProps)(Favourites)
