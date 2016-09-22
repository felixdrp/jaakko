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

import {
  swTaskIdeaAdd,
} from '../../websocket-message/server-actions'


class AltObjectTask extends Component {

  constructor(props) {
    super(props);
    let accountId = this.props.account.email || 'unassigned'
    this.state = {
     entries:[],
     username : "PACO PEREZ AVELLAN",
     currentEntry : {
       id : btoa( accountId.slice(0,2)+(Date.now()/1000) ),
       title : '',
       description : '',
       creator : accountId,
       rating : [],
       timeSubmitted : null,
       similarTo : [],
     }
    };

  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    websocket: React.PropTypes.object,
  };

  componentWillMount() {

    //this.addGroupEntry({ title : 'Super paper clip' ,description : 'the super super paperclip that will rule them all'});
  }

  // componentWillReceiveProps() {
  //   console.log('componentWillReceiveProps')
  // }
  // shouldComponentUpdate() {
  //   console.log('shouldComponentUpdate')
  //   return true
  // }

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

  /**
  * Just missing the account information.
  */
  addEntry = (e) => {

    // var entries  = this.state.entries.slice()
    // entries.push({  id : btoa(this.state.username.slice(0,2)+(Date.now()/1000)),
    //                 title : '',
    //                 description : '',
    //                 creator : null,
    //                 rating : [],
    //                 timeSubmitted : null,
    //                 similarTo : [],
    //               });

    if (
      this.state.currentEntry.title == '' ||
      this.state.currentEntry.description == ''
    ) {
      return
    }

    let accountId = this.props.account.email || 'unassigned'
    var o2 = JSON.parse(JSON.stringify(this.state.currentEntry));
    o2.timeSubmitted = Date.now();

    this.context.websocket.send(
      swTaskIdeaAdd( o2 )
    )

    // entries.push(o2);

    // this.setState({entries : entries });

    var newEntry = {
      id : btoa( accountId.slice(0,2)+(Date.now()/1000) ),
      title : '',
      description : '',
      creator : accountId,
      rating : [],
      timeSubmitted : null,
      similarTo : [],
    };

    this.setState({currentEntry : newEntry});

    this.gatherData();
  }

  // addGroupEntry = (entry) => {
  //   var entries  = this.state.groupEntries.slice()
  //   entries.push({id : ('groupEntry'+entries.length), title : entry.title ,description : entry.description});
  //   this.setState({groupEntries : entries });
  // }

  alerthing = () => {
    alert('boom');
  }

  handleEntryChange(event, index, value, id) {
    //var entries  = this.state.entries.slice()
      //
      // var entryId = id.split(" ")[0]
      //
      var entryField = id.split(" ")[1];
      //
      // this.alterEntry (entries, entryId, entryField, value);
      var currentEntry = this.state.currentEntry;
      currentEntry[entryField] = value;

      this.setState(currentEntry : currentEntry);



    //this.setState({entries : entries });
  }

  // alterEntry  =  (entries, id, field, value) => {
  //   for (var e in entries ){
  //         var entry = entries[e]
  //         if ( entry.id == id ){
  //           entries[e][field] = value;
  //           return entries;
  //         }
  //   }
  // }


  gatherData = () => {

      console.log(JSON.stringify(this.state));
      return this.state
  }

//'_marker'
  render() {

    const { textColor } = this.context.muiTheme.palette;

    let title = 'Alternative Objects Task';
    let text = `Come up with as many alternative objects for a stapler as possible. \n	You will have 7 minutes to complete the task. \n \n You can add a new entry by clicking on the new entry button`;
    let currentEntry = this.state.currentEntry;

    let groupTasks = this.props.tasks;

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

              <Timer timerCallback={ () => this.props.submit( this.gatherData() ) }></Timer>

              <div style={{marginTop:20}}>
                  <Card>
                  <CardText>
                      Title: <TextField id={currentEntry.id+" title"}
                                        style={{marginLeft:10,}}
                                        value={this.state.currentEntry.title}
                                        onChange={ (event, index, value) => this.handleEntryChange(event, value, index, (currentEntry.id+' title'))}
                             /><br/>
                      Description: <TextField
                                    multiLine={true}
                                    rows={1}
                                    rowsMax={10}
                                    id={currentEntry.id+" description"}
                                    style={{marginLeft:10, width: '80%',}}
                                    value={this.state.currentEntry.description}
                                    onChange={ (event, index, value) => this.handleEntryChange(event, value, index, (currentEntry.id+' description'))}
                             />
                  </CardText>
                 </Card>
              </div>

              <RaisedButton
                id="newEntry"
                onClick={ (e) => this.addEntry(e) }
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
                groupTasks.map( (entry,i) => {

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

const mapStateToProps = (state, ownProps = {}) => {
  return {
    firstName : state.account.firstName,
    account: state.account,
    tasks: state.task.tasks,
    taskLength: state.task.tasks.length,
  }
}

export default connect(mapStateToProps)(AltObjectTask)
