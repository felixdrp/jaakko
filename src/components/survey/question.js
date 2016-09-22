import React, { PropTypes, Component } from 'react'


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import TextField from 'material-ui/TextField';
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
const SLIDER_FIELD_TYPE = 'sliderField'
const COMMENT_TYPE = 'commentType'
const RADIO_FIELD_TYPE = 'radioFieldType'
const ARRAY_TEXT_FIELD_TYPE = 'arrayTextFieldType'
const ARRAY_LIST_FIELD_TYPE = 'arrayListFieldType'
const ARRAY_SLIDER_FIELD_TYPE = 'arraySliderFieldType'


function likertScaleIntro(text){

  return  <div style={{
      minWidth: 800,
      width: '85%',
      marginTop : 40,
      borderLeftWidth: 15,
      borderLeftStyle: 'solid',
      borderColor: 'grey',
      paddingLeft: 5,
      }}
    >
      {text}Please use the following scale to answer the given questions.

    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop : 20,

      }}
    >
    {
      Array.from(Array(11).keys()).map(
        i => <span key={i}>{i*10}</span>
      )
    }
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
    {
      ['Cannot do at all','Moderately	can do','Highly certain can do'].map(
        (t,i) => <span key={i}>{t}</span>
      )
    }

    </div>

    <div  style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop : 20,
      }}>

      <span>Confidence (0-100)</span>
    </div>


    </div>

}

function fillGapIntro(text){

  return  <div style={{
      minWidth: 800,
      width: '85%',
      marginTop : 40,
      borderLeftWidth: 15,
      borderLeftStyle: 'solid',
      borderColor: 'grey',
      paddingLeft: 5,
      }}
    >
    <span>{text}Please read each statement. Where there is a blank _____, decide what your normal or usual attitude, feeling, or behaviour would be: </span>

    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
    {
      ['(A) Rarely (Less than 10% of the time)','(B) OCCASIONALY (About 30% of the time)','(C) SOMETIMES (About half the time)','(D) FREQUENTLY (About 70% of the time)','(E) USUALLY (More than 90% of the time)'].map(
        (t,i) => <span key={i} style={{paddingRight:20, paddingTop:20,}}>{t}</span>
      )
    }

    </div>
    <br />

    <span>Of course, there are always unusual situations in which this would not be the case, but think of what you would do or feel in most normal situations.
Click on the empty space and select the option that describes your usual attitude or behaviour. </span>


    </div>

}

function getTextPart(t,p){
  var bits = t.split(/[_]+/)
  if ( bits[p] )
    return bits[p];
}

var questionnaire;

var entryQuestionnarie = {
  introTitle : 'Entry Survey',
  introText : 'The following questionnaire will take approximately 10 minutes, all questions are optional and can be skipped if they are seen to be intrusive, however it would be appreciated if all questions were answered as it will allow the results to be analysed with more accuracy. The participation in this experiment and questionnaire is optional and the subject can withdraw at any point, no questions asked. All information will be kept confidential and is strictly for research purposes. ',

  questions : [
    {
      name : 'age',
      text : '1. Age',
      type : TEXT_FIELD_TYPE,
      typeVars : {}
    },
    {
      name : 'gender',
      text : '2. Gender Identification',
      type : LIST_FIELD_TYPE,
      typeVars : {opts:['male','female','other']}
    },
    {
      name : 'degree',
      text : '3. Degree',
      type : TEXT_FIELD_TYPE,
      typeVars : {}
    },
    {
      name : 'degree_year',
      text : '4. Year of Degree (As a number Please)',
      type : TEXT_FIELD_TYPE,
      typeVars : {}
    },
    {
      name : 'hobbies',
      text : '5. What are your hobbies (For example a club or clubs you belong to)?',
      type : TEXT_FIELD_TYPE,
      typeVars : {}
    },
    {
      name : '',
      text : likertScaleIntro('6. '),
      type : COMMENT_TYPE,
      typeVars : {},
    },
    {
      name : 'jobConfidence',
      text : ['I’m confident that I can do an excellent job on my math tests.',
              'I’m Certain I can understand the most difficult material presented in math texts',
              'I am confident I can do an excellent job on my math assignments.',
              'I am certain I can master the skills being taught in my math class.',
              'I’m confident I can understand the most difficult material presented by my math teacher.'],
      type : ARRAY_SLIDER_FIELD_TYPE,
      typeVars : {}
    },
    {
      name : '',
      text : likertScaleIntro('7. '),
      type : COMMENT_TYPE,
      typeVars : {},
    },
    {
      name : 'jobNovelty',
      text : ['I feel that I am good at generating novel ideas.',
              'I have confidence in my ability to solve problems.',
              'I Have a knack for further developing the ideas of others.',
              'I am good at Finding creative ways to solve problems'],
      type : ARRAY_SLIDER_FIELD_TYPE,
      typeVars : {}
    },
    {
      name : '',
      text : fillGapIntro('8. '),
      type : COMMENT_TYPE,
      typeVars : {},
    },
    {
      name : 'probemSolvingSkills',
      text : ['1. When faced with a problem I ______ try to forget it.',
              '2. I _____ need frequent encouragement from others for me to keep working at a difficult task.',
              '3. I _____ like jobs where I can make decisions and be responsible for my own work',
              '4. I _____ Change my opinion when someone I admire disagrees with me',
              '5. If I want something I ____ work hard to get it.',
              '6. I ____ prefer to learn the facts about something from someone else rather than have to dig them out for myself.',
              '7. I will ____ accept jobs that require me to supervise others.',
              '8. I ____ Have a hard time saying “no” when someone tries to sell me something I don’t want.',
              '9. I ____ like to have a say in any decision made by any group I’m in.',
              '10. I ____ consider the different sides of an issue before making any decisions.',
              '11. What other people think _____ has a great influence on my behaviour.',
              '12. Whenever something good happens to me I _____ feel it is because I’ve earned it.',
              '13. I ____ enjoy being in a position of leadership.',
              '14. I ____ need someone else to praise my work before I am satisfied with what I’ve done.',
              '15. I am ____ sure enough of my opinions to try and influence others.',
              '16. When something is going to affect me I ____ learn as much about it as I can.',
              '17. I ____ decide to do things on the spur of the moment.',
              '18. For me, knowing I’ve done something well is ____ more important that being praised by someone else.',
              '19. I ____ let other peoples’ demands keep me from doing things I want to do.',
              '20. I ____ stick to my opinions when someone disagrees with me.',
              '21. I ____ do what I feel like doing not what other people think I ought to do.',
              '22. I ____ get discouraged when doing something that takes a long time to achieve results.',
              '23. When part of a group I ____ prefer to let other people make all the decisions.',
              '24. When I have a problem I ____ follow the advice of friends or relatives.',
              '25. I ____ enjoy trying to do difficult tasks more than I enjoy trying to do easy tasks.',
              '26. I ____ prefer situations where I can depend on someone else’s ability rather than just my own. ',
              '27. Having someone important tell me I did a good job is ____ more important to me than feeling I’ve done a good job.',
              '28. When I’m involved in something I ____ try to find out all I can about what is going on even when someone else in in charge.'],
      type : ARRAY_LIST_FIELD_TYPE,
      typeVars : {opts:['RARELY','OCCASIONALY','SOMETIMES','FREQUENTLY','USUALLY']}
    },
  ],
};

var exitQuestionnaire = {
  introTitle : 'Exit Survey',
  introText : 'The following questionnaire will take approximately 5 minutes, all questions are optional and can be skipped if they are seen to be intrusive, however it would be appreciated if all questioned were answered as it will allow the results to be analysed with more accuracy. The participation in this experiment and questionnaire is optional and the subject can withdraw at any point, no questions asked. All information will be kept anonymous, confidential, and is strictly for research purposes. ',

  questions : [
    {
      name : 'creativeFamily',
      text : '1. Do you have any siblings or close family members working in the creative industries (movies, tv, writer etc.)?',
      type : TEXT_FIELD_TYPE,
      typeVars : {}
    },
    {
      name : 'creativePreviousSchool',
      text : '2. Have you been to an art school before the institution you attend now?',
      type : TEXT_FIELD_TYPE,
      typeVars : {}
    },
    {
      name : 'creativePreviousSchool',
      text : '3. Have you gone to a Steiner School or a Waldorf school? ',
      type : TEXT_FIELD_TYPE,
      typeVars : {}
    },
    {
      name : 'experimentSatisfaction',
      text : '4. How satisfied are you with your overall performance in the experiment?',
      type : LIST_FIELD_TYPE,
      typeVars : {opts:['a. Very satisfied',
                        'b. Satisfied',
                        'c. Quite satisfied',
                        'd. Quite unsatisfied',
                        'e. Unsatisfied',
                        'f. Very unsatisfied']}
    },
    {
      name : 'countryGrowUp',
      text : '5. What country and city did you grow up in until you were 18? (please indicate country or countries along with the relevant postcode)',
      type : TEXT_FIELD_TYPE,
      typeVars : {}
    },
    {
      name : 'preferredPayment',
      text : '6. Assuming you gain £200 would you prefer to… (circle the preferred answer)',
      type : RADIO_FIELD_TYPE,
      typeVars : {opts:['a. Stay at £200',
                        'b. Have a 50% chance of receiving £300 and a 50% chance of receiving £100',
                        'c. Have a 50% chance of receiving £400 and a 50% chance of receiving £0',
                        'd. Have a 10% chance of receiving £1500 and a 90% chance of receiving £0']}
    },
    {
      name : 'howMuchRisk',
      text : '7. Assuming you could risk up to 100£ but the probability of winning would be unknown,\n how much of the £100 would you be willing to risk?',
      type : SLIDER_FIELD_TYPE,
      typeVars : {min: 0, max:100, step:1}
    },
    {
      name : 'preferredPayment2',
      text : '8. Which would you prefer?',
      type : RADIO_FIELD_TYPE,
      typeVars : {opts:['a. Receive £180 with a 100% probability',
                        'b. Have a 50% of winning £400 and a 50% of receiving £0']}
    },
    {
      name : 'howMuchFun',
      text : '9. How much fun did you have or enjoy the experiment from a scale of 1-10 using only whole numbers?',
      type : SLIDER_FIELD_TYPE,
      typeVars : {min: 0, max:10, step:1}
    },
    {
      name : 'handedness',
      text : '10. Are you right handed, left handed, or ambidextrous? ',
      type : LIST_FIELD_TYPE,
      typeVars : {opts:['a. Right Handed',
                        'b. Left Handed',
                        'c. Ambidextrous',
                        ]}
    },
    {
      name : 'preferredPayment3',
      text : '11. Assume you have £200 and had the chance to risk £5 to have a 50% to win £10, would you either…',
      type : RADIO_FIELD_TYPE,
      typeVars : {opts:['a. Stay at £200',
                        'b. 50% chance of gaining £5 (to have a total of £205) and a 50% of losing £5 (To have a total of £195)']}
    },
    {
      name : 'experimentRewardFairness',
      text : '12. How fair did you find the rewards in the experiment?',
      type : LIST_FIELD_TYPE,
      typeVars : {opts:['a. Highly unfair',
                        'b. Unfair',
                        'c. Quite unfair',
                        'd. Quite fair',
                        'e. Fair',
                        'f. Very fair']}
    },
  ],
};



// '0	10	20	30	40	50	60	70	80	90	100','Cannot			Moderately				highly certain 	   ','do at all			Can do					can do']

class Question extends Component {

  constructor(props) {
    super(props);

    this.state = {questionnaire : 'entry' };
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

  handleSliderChange(event, value, name) {
//    debugger;
    this.setState({[name] : value})
  };

  handleRadioChange(event, value, name) {

    this.setState({[name] : value})
  };


  gatherData = () => {

    console.log(JSON.stringify(this.state));
    return this.state

  }


//'_marker'
  render() {
    // let message = this.props.message? this.props.message : 'Question'
    let questionnaire = (this.state.questionnaire == 'entry') ? entryQuestionnarie : exitQuestionnaire
    let message =  'Question'

    const { textColor } = this.context.muiTheme.palette;

    let title = questionnaire.introTitle;
    let text = questionnaire.introText;

    let qs = questionnaire.questions.map(
      (q,i)=>{
        switch (q.type) {
          case TEXT_FIELD_TYPE:
            return <div key={i} style={{marginTop: 20,}}>{q.text}<TextField id={q.name} style={{
                    paddingLeft: 10,
                  }} //       handleChange(event, index, value, name) {
                    onChange={ (event, index, value)=>this.handleChange(event, value, index,  q.name)}/>

                   </div>

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
           case SLIDER_FIELD_TYPE:
             return <div key={i}
                   style={{
                     position: 'relative',
                     marginTop: 20,
                     marginBottom: 30,
                   }}
                   >
                   <span
                   style={{
                     marginRight: 20,
                   }}>{q.text}</span>
                   <Slider
                     style={{
                       display: 'inline',
                       margin: 1,
                       padding: 1,
                       width: 200,
                       top: 5,
                       left: 218,
                       position: 'absolute',
                           }}
                     id={q.name}
                     min={(q.typeVars.min) ? q.typeVars.min : 0}
                     max={(q.typeVars.max) ? q.typeVars.max : 100}
                     step={(q.typeVars.step) ? q.typeVars.step : 10}
                     defaultValue={(q.typeVars.max) ? (q.typeVars.max/2) : 0}
                     value={this.state[q.name]}
                     onChange={ (event, value)=>this.handleSliderChange(event, value, (q.name))}
                   />
                   <div
                   style={{
                     display: 'inline',
                     margin: 1,
                     paddingLeft: 93,
                     width: 200,
                     top: 20,
                     left: 211,
                     fontWeight: 'bold',
                     position: 'absolute',
                   }}> {this.state[(q.name)]} </div>
                   <br/>
             </div>
           case COMMENT_TYPE:
            return <div key={i}>
                      {q.text}
                    </div>

           case ARRAY_TEXT_FIELD_TYPE:
             return <div key={i}>
                      {
                       q.text.map(
                         (k,j) => <div key={j} >{getTextPart(k,0)}
                                    <TextField id={q.name+j} style={{
                                    paddingLeft: 10,
                                    marginRight: 20,
                                    }}
                                    onChange={ (event, index, value)=> this.handleChange(event, index, value, (q.name+j))}
                                    />
                                    {getTextPart(k,1)}
                                    <br />
                                  </div>
                       )
                      }
                    </div>
            case ARRAY_LIST_FIELD_TYPE:
              return <div key={i}>
                       {
                        q.text.map(
                          (k,j) => <div key={j} >{getTextPart(k,0)}

                                      <SelectField
                                        style={{
                                          paddingLeft: 10,
                                          marginRight: 20,

                                        }}

                                        autoWidth={true}

                                        id={(q.name+j)}
                                        value={this.state[(q.name+j)]}
                                        onChange={ (event, index, value)=>this.handleChange(event, index, value, (q.name+j))}
                                      >
                                        {
                                          q.typeVars.opts.map(
                                            (q,i) => <MenuItem key={i} value={q} primaryText={q} />
                                          )
                                        }
                                      </SelectField>

                                     {getTextPart(k,1)}
                                     <br />
                                   </div>
                        )
                       }
                     </div>
            case RADIO_FIELD_TYPE:
               return <div key={i} style={{paddingTop:20,}}>{q.text}
                       <RadioButtonGroup
                         style={{paddingLeft: 30, marginTop: 15,}}
                         id={q.name}
                         name={q.name}
                         defaultSelected={this.state[q.name]}
                         onChange={ (event, index, value)=>this.handleRadioChange(event, index, q.name)}
                       >
                         {
                           q.typeVars.opts.map(
                             (q,i) => <RadioButton style={{paddingTop:10,}} key={i} value={q} label={q} />
                           )
                         }
                       </RadioButtonGroup>
                     <br />
                     </div>
            case ARRAY_SLIDER_FIELD_TYPE:
              return <div key={i}

                      >
                       {
                        q.text.map(
                          (k,j) => <div key={j}
                                style={{
                                  position: 'relative',
                                  marginTop: 20,
                                }}
                                >
                                <span
                                style={{
                                  marginRight: 20,
                                }}>{k}</span>
                                <Slider
                                  style={{
                                    display: 'inline',
                                    margin: 1,
                                    padding: 1,
                                    width: 200,
                                    top: -24,
                                    position: 'absolute',
                                        }}
                                  id={q.name+j}
                                  min={0}
                                  max={100}
                                  step={10}
                                  defaultValue={0}
                                  value={this.state[q.name+j]}
                                  onChange={ (event, value)=>this.handleSliderChange(event, value, (q.name+j))}
                                />
                                <div
                                style={{
                                  display: 'inline',
                                  margin: 1,
                                  paddingLeft: 93,
                                  width: 200,
                                  top: -15,
                                  fontWeight: 'bold',
                                  position: 'absolute',
                                }}> {this.state[(q.name+j)]} </div>
                          </div>
                        )
                       }
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

              {text}
              <br />

              {qs}

              <RaisedButton
                id="submitAnswers"
                style={{color: 'white',}}
                type="submit"
                onClick= { () => this.props.submit( this.gatherData() ) }
              >
                Submit
              </RaisedButton>

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
