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
     this.state = {entries:[]};


  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    websocket: React.PropTypes.object,
  };

  componentWillMount() {
    this.addEntry();
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  handleChange(event, index, value, name) {
    //debugger;
    this.setState({[name] : value})
  };

  handleSliderChange(event, value, name) {
//    debugger;
    this.setState({[name] : value})
  };

  handleRadioChange(event, value, name) {

    this.setState({[name] : value})
  };

  addEntry = () => {
    var entries  = this.state.entries.slice()
    entries.push({name : ('entry'+entries.length), title : '',description : ''});
    this.setState({entries : entries });
  }


//'_marker'
  render() {

    const { textColor } = this.context.muiTheme.palette;

    let title = 'Alternative Objects Task';
    let text = 'Come up with as many alternative objects for a stapler as possible. \n	You will have 5 minutes to complete the task. \n \n You can add a new entry by clicking on the new entry button';



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
              {
                text.split('\n').map( (item,i) => { return <div key={i} style={{marginBottom:20}}>{item}</div>})
              }
              <br />
              <Timer></Timer>

              {
                this.state.entries.map( (entry,i) => {

                  return <div key={i} style={{marginTop:20}}>
                            <Card>
                            <CardText>
                                Title: <TextField id={entry.name+"_title"} style={{
                                }} /><br/>
                                Description: <TextField
                                              multiLine={true}
                                              rows={1}
                                              rowsMax={10}
                                              id={entry.name+"_description"} style={{ width: '80%',
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

              <br />
              <div
              style={{ marginLeft:'90%',}}
              >
                    <RaisedButton
                      id="submitAnswers"
                      style={{color: 'white',}}
                      type="submit"
                      style={{marginTop:20}}
                    >
                      Submit
                    </RaisedButton>
              </div>
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
