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


var instructionsData = {

  alternativeObject : {
    title : 'Instructions for Alternative Objects Task',
    text : 'The task is to come up with as many alternative objects for a given object. \n\n For example:'
            	+'\nIf the object given is a paper clip then here is how you would complete the task.'
              +'\n1. First you would enter the name of the object in the “object name” field, for example, the alternative object could be a “reset button pressing tool”. '
              +'\n2. Then a description must be filled in to give more information, this is especially important if the object is uncommon. Using the example above the “description” could be, for example, A tool that can be used to press reset buttons which can be pressed with your fingers.'
              +'\n3. When you are finished you can press the “submit button” to submit the entry. '
              +'\n4. Your name will be shown next to your entries and so each entry will have an author. '
              +'\n\nThe previous example would look like this…',
  },
  similarities : {
    title : 'Instructions for Similarity rounds',
    text : 'How you judge another groups entries to be similar will not affect your pay or the way others judge your entries. This round is completely anonymous.'
            	+'\nPlease look through the group’s answers and judge if any 2 answers are similar. If two people deem the same two entries to be similar to an already existing entry then the entry that was given after the original entry will not be taken into account in the favouriting round. This means that if the entry is disqualified from the favouriting round it cannot be favourited and so will not count toward your earnings.  That is to say that if an answer is deemed to be similar to another existing answer, by two or more people, then the answer that was given after the original will not appear in the favourites round  and so not be taken into account when determining payoffs. Thus no money can be made on ideas which have been seen similar to existing ideas by two or more people. The maximum number of similar ideas to be submitted is 3, so if there are more than 3 ideas which you view as similar ideas then you are asked to prioritise which ideas are more similar than the others.'
              +'\nSome guidelines for what might be “similar” '
              +'\n1. If the entry is not original and is largely expressed in an existing entry.'
              +'\n2. If the entry is an exact copy of an existing entry '
              +'\n\nRemember that the answers are from another group and will not affect your performance in the task. If two entries are flagged similar then the later entry will be eliminated from the favouriting round.	'
              +'\n\nThe following shows an example of how the different entries will show in the interface. Each row represents each of the entries. On each row, from left to right, each entry has a number, a title and description, and the numbers of the questions it is similar to.',
  },
  favourites : {
    title : 'Instructions for Favourites rounds',
    text : 'You will be asked to name your 5 favourites entries from the list of entries that are presented to you and the entries will be from another group than yours. How you individually favourite the entries will not be known by the members of the group you are favouriting or even the members of your group. Thus you will be completely anonymous when favouriting.'
            	+'\nEvery groups entries will be favorited and based on the total amount of favourites an individual receives it will determine where they rank within their group and so how much they will be paid. '
              +'\nYou are asked to rank the 5 favourite entries by giving your favourite 5 stars, second favourite 4 starts, etc. thus..'
              +'\n1. First place = 5 Stars'
              +'\n2. Second place = 4 Stars'
              +'\n3. Third place = 3 Stars'
              +'\n4. Fourth place = 2 Stars'
              +'\n5. Fifth place = 1 Star'
              +'\n\nOnly your 5 favourites will receive stars, you cannot give any other entry a star. No half stars can be given; they can only be given as shown above.'
              +'\n\nThe previous example would look like this…',
  },
  math : {
    title : 'Instructions for Math task',
    text : 'For this task you will be asked to solve simple addition problems correct. For example you could be asked to solve the following “56+73+5+10+11” you would simply type “155” and move onto the next question.'
            +'There will be multiple problems and you will be asked to solve as many as possible in the 5 minutes given. The number of correct answers will then be calculated and showed to you after the task is over.'
            +'\n Your name will appear on a ranking of the group’s performance and your will be ranked from the best performer (person with the most correct answers) to the worst performer (person with the least amount of correct answers).'
                +'The exact score of the participant in your group will not be shown.'
            +'\n In this task your pay will depend on your performance relative to the other members in the group. The pay structure will be as shown below.'
            +'\n The task will have a series of addition problems like the ones below. You will be asked to solve as many as you can in the 5 minutes. Only correct answers will be counted toward your score.'
            +'\n\n The aforementioned example would look like this…',
  },
}


class Instructions extends Component {

  constructor(props) {
    super(props);
     this.state = {};
     console.log("INSTRUCTIONS: "+props.payload)
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

  getTaskExample = (tasktype) => {
        switch(tasktype){
          case 'alternativeObject':
           return <div style={{marginTop:20}}>
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
          case 'similarities':
            return <div> <div style={{padding:5,display:'flex'}}>

                          <Card style={{paddingTop: '0%',fontWeight: 800,}}>
                            <CardText style={{padding:8}}>
                              0.
                            </CardText>
                          </Card>

                          <Card>
                            <CardHeader style={{padding:8}}>
                              Reset button pressing tool
                            </CardHeader>
                            <CardText style={{padding:8}}>
                              A tool that can be used to press reset buttons which cannot be pressed with your fingers
                            </CardText>
                          </Card>

                          <Card>
                            <CardText style={{padding:8, paddingTop:28,fontWeight: 800}}>
                              Similar to:
                            </CardText>
                          </Card>

                          <Card>
                            <CardText style={{padding:8}}>
                            <SelectField value={-1} onChange={ () => {alert('This will set the selected entries as similar')}} style={{width:30}}>
                                  <MenuItem value={0} primaryText={0} />
                                  <MenuItem  value={1} primaryText={1} />
                                  <MenuItem  value={2} primaryText={2} />
                             </SelectField>
                            </CardText>
                    </Card>
                    </div>

                    <div style={{padding:5,display:'flex'}}>
                    <Card style={{paddingTop: '0%',fontWeight: 800,}}>
                      <CardText style={{padding:8}}>
                        1.
                      </CardText>
                    </Card>

                    <Card>
                      <CardHeader style={{padding:8}}>
                        Reset button pressing tool
                      </CardHeader>
                      <CardText style={{padding:8}}>
                        A tool that can be used to press reset buttons which cannot be pressed with your fingers
                      </CardText>
                    </Card>

                    <Card>
                      <CardText style={{padding:8, paddingTop:28,fontWeight: 800}}>
                        Similar to:
                      </CardText>
                    </Card>

                    <Card>
                      <CardText style={{padding:8}}>
                      <SelectField value={-1} onChange={ () => {alert('This will set the selected entries as similar')}} style={{width:30}}>
                            <MenuItem value={0} primaryText={0} />
                            <MenuItem  value={1} primaryText={1} />
                            <MenuItem  value={2} primaryText={2} />
                       </SelectField>
                      </CardText>
              </Card>
              </div>
              </div>
          case 'favourites':
            return <div style={{marginTop:20}}>
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
          case 'math':
              return <div style={{marginTop:20}}>
                  <Card>
                  <CardText>
                    <div>56+73+5+10+11 =
                        <TextField  style={{
                            paddingLeft: 10,
                            marginRight: 20,
                            }}
                            value={155}/>
                    </div>
                  </CardText>
                 </Card>
              </div>
          default:
            return <div></div>

    }
  }

//'_marker'
  render() {
    if (!this.props.payload) {
      return <span></span>
    }

    const { textColor } = this.context.muiTheme.palette;
    let tasktype = 'math';
    let title = instructionsData[tasktype].title;
    let text = instructionsData[tasktype].text;
    let example = this.getTaskExample(tasktype);


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
              maxWidth: 1200,
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

              {example}
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
