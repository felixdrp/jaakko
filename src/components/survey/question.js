import React, { PropTypes, Component } from 'react'

import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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


//
// var entryQuestionnarie = {
//   introText : "",
//
//   questions : [
//     {
//       name : "",
//       text : "",
//       type : "",
//       typeVars : {}
//     },
//   ],
// };
const TEXT_FIELD_TYPE = 'textField'
const LIST_FIELD_TYPE = 'listField'

var entryQuestionnarie = {
  introTitle : 'Entry Survey',
  introText : 'The following questionnaire will take approximately 10 minutes, all questions are optional and can be skipped if they are seen to be intrusive, however it would be appreciated if all questions were answered as it will allow the results to be analysed with more accuracy. The participation in this experiment and questionnaire is optional and the subject can withdraw at any point, no questions asked. All information will be kept confidential and is strictly for research purposes. ',

  questions : [
    {
      name : 'age',
      text : 'Age',
      type : TEXT_FIELD_TYPE,
      typeVars : {}
    },
    {
      name : 'gender',
      text : 'Gender',
      type : LIST_FIELD_TYPE,
      typeVars : {opts:['male','female']}
    },
  ],
};

class Question extends Component {

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

  handleChange(event, index, value, name) {
  //  debugger;
    this.setState({[name] : value})
  };

  render() {
    // let message = this.props.message? this.props.message : 'Question'
    let message =  'Question'

    const { textColor } = this.context.muiTheme.palette;

    let title = entryQuestionnarie.introTitle;
    let text = entryQuestionnarie.introText;

    let qs = entryQuestionnarie.questions.map(
      (q,i)=>{
        switch (q.type) {
          case TEXT_FIELD_TYPE:
            return <div key={i} >{q.text}<TextField id={q.name} style={{
                    paddingLeft: 10,
                  }} /><br /></div>

          case LIST_FIELD_TYPE:
            return <div key={i} >{q.text}
                    <SelectField
                      style={{paddingLeft: 10,}}
                      id={q.name}
                      value={this.state[q.name]}
                      onChange={ (event, index, value)=>this.handleChange(event, index, value, q.name)}
                    >
                      {
                        q.typeVars.opts.map(
                          (q,i) => <MenuItem key={i} value={q} primaryText={q} />
                        )
                      }
                    </SelectField>
                  <br />
                  </div>

          default:

        }
      }
    )

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

              {text}
              <br />


              {qs}

              <FlatButton
                id="submitAnswers"
                style={{color: 'white',}}
                type="submit"
              >
                Submit
              </FlatButton>

            </CardText>

          </Card>

      </div>
    )
  }
}

Question.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

//export default Question

const mapStateToProps = (state) => {
  return {
    firstName : state.account.firstName
  }
}

export default connect(mapStateToProps)(Question)
