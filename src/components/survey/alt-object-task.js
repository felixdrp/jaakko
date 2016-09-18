import React, { PropTypes, Component } from 'react'


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import Timer from './timer'


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
} from 'material-ui/svg-icons';


class AltObjectTask extends Component {

  constructor(props) {
    super(props);
     this.state = {entries:[],groupEntries:[]};


  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    websocket: React.PropTypes.object,
  };

  componentWillMount() {
    this.addEntry();
    this.addGroupEntry({ title : 'Super paper clip' ,description : 'the super super paperclip that will rule them all'});
  }

//   handleSave(text) {
//     if (text.length !== 0) {
//       this.props.addTodo(text)
//     }
//   }
//
//   handleChange(event, index, value, name) {
//     //debugger;
//     this.setState({[name] : value})
//   };
//
//   handleSliderChange(event, value, name) {
// //    debugger;
//     this.setState({[name] : value})
//   };
//
//   handleRadioChange(event, value, name) {
//
//     this.setState({[name] : value})
//   };

  addEntry = () => {
    var entries  = this.state.entries.slice()
    entries.push({name : ('entry'+entries.length), title : '',description : ''});
    this.setState({entries : entries });
  }

  addGroupEntry = (entry) => {
    var entries  = this.state.groupEntries.slice()
    entries.push({name : ('groupEntry'+entries.length), title : entry.title ,description : entry.description});
    this.setState({groupEntries : entries });
  }

  alerthing = () => {
    alert('boom');
  }

//'_marker'
  render() {

    const { textColor } = this.context.muiTheme.palette;

    let title = 'Alternative Objects Task';
    let text = 'Come up with as many alternative objects for a stapler as possible. \n	You will have 5 minutes to complete the task. \n \n You can add a new entry by clicking on the new entry button';

    return (
      <div style={{display:'flex'}}>

          <Card
            style={{
              padding: 30,
              margin: '2% 3% 0%',
              maxWidth: 900,
              minWidth: 750,
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
                text.split('\n').map( (item,i) => { return <div key={i} style={{marginBottom:20}}>{item}</div>})
              }



              <Timer timerCallback={ this.alerthing }></Timer>

              {
                this.state.entries.map( (entry,i) => {

                  return <div key={i} style={{marginTop:20}}>
                            <Card>
                            <CardText>
                                Title: <TextField id={entry.name+"_title"} style={{marginLeft:10,
                                }} /><br/>
                                Description: <TextField
                                              multiLine={true}
                                              rows={1}
                                              rowsMax={10}
                                              id={entry.name+"_description"} style={{ marginLeft:10, width: '80%',
                                   }} />
                            </CardText>
                           </Card>
                        </div>
                })
              }

              <RaisedButton
                id="newEntry"
                onClick={ this.addEntry }
                type="button"
                backgroundColor='rgb(124, 210, 118)'
                style={{marginTop:20, }}
              >
                New Entry
              </RaisedButton>

            </CardText>

          </Card>

          <Card  style={{

              margin: '2% 0% 5%',
              minWidth: 400,
              backgroundColor: 'rgb(234, 233, 233)',
            }}
          >
            <CardHeader
              title='Group entries'
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
                this.state.groupEntries.map( (entry,i) => {

                  return <div key={i} style={{padding:5}}>
                                <Card>
                                  <CardHeader style={{padding:8}}>
                                    {entry.title}
                                  </CardHeader>
                                  <CardText style={{padding:8}}>
                                    {entry.description}
                                  </CardText>
                                </Card>
                        </div>
                })
              }

              </CardText>

          </Card>
      </div>
    )
  }
}

AltObjectTask.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

//export default Question

const mapStateToProps = (state) => {
  return {
    firstName : state.account.firstName
  }
}

export default connect(mapStateToProps)(AltObjectTask)
