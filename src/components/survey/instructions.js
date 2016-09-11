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
} from 'material-ui/svg-icons';


class Instructions extends Component {

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

  }
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }


//'_marker'
  render() {

    const { textColor } = this.context.muiTheme.palette;

    let title = 'Example of Alternative Objects Task';
    let text = 'The task is to come up with as many alternative objects for a given object. \n\n For example:'
            	+'\nIf the object given is a paper clip then here is how you would complete the task.'
              +'\n1. First you would enter the name of the object in the “object name” field, for example, the alternative object could be a “reset button pressing tool”. '
              +'\n2. Then a description must be filled in to give more information, this is especially important if the object is uncommon. Using the example above the “description” could be, for example, A tool that can be used to press reset buttons which can be pressed with your fingers.'
              +'\n3. When you are finished you can press the “submit button” to submit the entry. '
              +'\n4. Your name will be shown next to your entries and so each entry will have an author. '
              +'\n\nThe previous example would look like this…';

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

              <div style={{marginTop:20}}>
                  <Card>
                  <CardText>
                      Title: <TextField id='dummy' value='Reset button pressing tool' style={{marginLeft:10,
                      }} /><br/>
                      Description: <TextField
                                    id='dummy2'
                                    multiLine={true}
                                    rows={1}
                                    rowsMax={10}
                                    value='A tool that can be used to press reset buttons which cannot be pressed with your fingers.'
                                    style={{ marginLeft:20, width: '80%',
                         }} />
                  </CardText>
                 </Card>
              </div>

              <br />

              <FlatButton
                id="ready"
                backgroundColor='green'
                style={{color: 'white',}}
              >
                I'm ready
              </FlatButton>

            </CardText>

          </Card>

      </div>
    )
  }
}

Instructions.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

//export default Question

const mapStateToProps = (state) => {
  return {
    firstName : state.account.firstName
  }
}

export default connect(mapStateToProps)(Instructions)
