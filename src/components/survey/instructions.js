import React, { PropTypes, Component } from 'react'


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import Rater from './rater'

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
   experimentStructure : {
    0 : {
      title : 'Experiment Structure',
      text : 'Welcome to the experiment. The following lays out the structure of the experiment and the basis on which you are to be paid for taking part in it.'
            +'\nThe experiment will consist of 3 tasks. The first two tasks are ‘idea generation’ tasks undertaken in groups of 5 people: each task consists of 3 stages – In the order shown below. The final task will be completed individually.'
            +'\n[b]1.Task Completion Stage:[/b] You are asked to generate ideas based on the instructions provided.'
            +'\n[b]2.Similarities Stage:[/b] At this stage you will evaluate whether the entries from another group are similar. Likewise yours will be evaluated by another group.'
            +'\n[b]3.Favourites Stage:[/b] You are asked to rate the ideas produced by another group. The pay each participant receives depends on the number of stars received. Most stars → highest rank → highest pay.'
            +'\n[b]Final Task:[/b] You are asked to answer a series of questions. Your pay will depend on the number of correct answers relative to others in your group.'
            +'\n[b]Attribution:[/b] Your ideas will remain anonymous to everyone'
            +'\n[b]Pay:[/b] You will be paid £8.10 from completing all tasks.'

    },
    1 : {
      title : 'Experiment Structure',
      text : 'Welcome to the experiment. The following lays out the structure of the experiment and the basis on which you are to be paid for taking part in it.'
            +'\nThe experiment will consist of 3 tasks. The first two tasks are ‘idea generation’ tasks undertaken in groups of 5 people: each task consists of 3 stages – In the order shown below. The final task will be completed individually.'
            +'\n[b]1.Task Completion Stage:[/b] You are asked to generate ideas based on the instructions provided.'
            +'\n[b]2.Similarities Stage:[/b] At this stage you will evaluate whether the entries from another group are similar. Likewise yours will be evaluated by another group.'
            +'\n[b]3.Favourites Stage:[/b] You are asked to rate the ideas produced by another group. The pay each participant receives depends on the number of stars received. Most stars → highest rank → highest pay.'
            +'\n[b]Final Task:[/b] You are asked to answer a series of questions. Your pay will depend on the number of correct answers relative to others in your group.'
            +'\n[b]Attribution:[/b] Your name will appear next to your ideas'
            +'\n[b]Pay:[/b] You will be paid £8.10 from completing all tasks.'

    },
    2 : {
      title : 'Experiment Structure',
      text : 'Welcome to the experiment. The following lays out the structure of the experiment and the basis on which you are to be paid for taking part in it.'
            +'\nThe experiment will consist of 3 tasks. The first two tasks are ‘idea generation’ tasks undertaken in groups of 5 people: each task consists of 3 stages – In the order shown below. The final task will be completed individually.'
            +'\n[b]1.Task Completion Stage:[/b] You are asked to generate ideas based on the instructions provided.'
            +'\n[b]2.Similarities Stage:[/b] At this stage you will evaluate whether the entries from another group are similar. Likewise yours will be evaluated by another group.'
            +'\n[b]3.Favourites Stage:[/b] You are asked to rate the ideas produced by another group. The pay each participant receives depends on the number of stars received. Most stars → highest rank → highest pay.'
            +'\n[b]Final Task:[/b] You are asked to answer a series of questions. Your pay will depend on the number of correct answers relative to others in your group.'
            +'\n[b]Attribution:[/b] Your ideas will remain anonymous to everyone'
            +'\n[b]Pay:[/b] Your pay is based on your relative performance within your group for all tasks:'
            +'\n1. £5 – Highest ranking participant'
            +'\n2. £2'
            +'\n3. £1'
            +'\n4. £0.5'
            +'\n5. £0 – Lowest ranking participant'

    },
    3 : {
      title : 'Experiment Structure',
      text : 'Welcome to the experiment. The following lays out the structure of the experiment and the basis on which you are to be paid for taking part in it.'
            +'\nThe experiment will consist of 3 tasks. The first two tasks are ‘idea generation’ tasks undertaken in groups of 5 people: each task consists of 3 stages – In the order shown below. The final task will be completed individually.'
            +'\n[b]1.Task Completion Stage:[/b] You are asked to generate ideas based on the instructions provided.'
            +'\n[b]2.Similarities Stage:[/b] At this stage you will evaluate whether the entries from another group are similar. Likewise yours will be evaluated by another group.'
            +'\n[b]3.Favourites Stage:[/b] You are asked to rate the ideas produced by another group. The pay each participant receives depends on the number of stars received. Most stars → highest rank → highest pay.'
            +'\n[b]Final Task:[/b] You are asked to answer a series of questions. Your pay will depend on the number of correct answers relative to others in your group.'
            +'\n[b]Attribution:[/b] Your name will appear next to your ideas'
            +'\n[b]Pay:[/b] Your pay is based on your relative performance within your group for all tasks:'
            +'\n1. £5 – Highest ranking participant'
            +'\n2. £2'
            +'\n3. £1'
            +'\n4. £0.5'
            +'\n5. £0 – Lowest ranking participant'

    },
  },
  alternativeObjectFigural : {
    0: {
      title : 'Line Meanings',
      text : 'There will be a line shown at the start. Come up with as many things the line reminds you of or could be a part of. Remember you have to use the whole line. You will be given 5 minutes to complete the task.'
              +'\n\n[b]Important note:[/b]'
              +'\nThere are no restrictions on what the line can remind you of or can and can’t be a part of but your idea must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.'
              +'\n\n[b]Pay:[/b] You will be paid £8.10 from completing all tasks.'
      },
    1: {
      title : 'Line Meanings',
      text : 'There will be a line shown at the start. Come up with as many things the line reminds you of or could be a part of. Remember you have to use the whole line. You will be given 5 minutes to complete the task.'
              +'\n\n[b]Important note:[/b]'
              +'\nThere are no restrictions on what the line can remind you of or can and can’t be a part of but your idea must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.'
              +'\n\n[b]Attribution:[/b] Your ideas will be seen by your group together with your name'
              +'\n\n[b]Pay:[/b] You will be paid £8.10 from completing all tasks.'
      },
    2: {
        title : 'Line Meanings',
        text : 'There will be a line shown at the start. Come up with as many things the line reminds you of or could be a part of. Remember you have to use the whole line. You will be given 5 minutes to complete the task.'
                +'\n\n[b]Important note:[/b]'
                +'\nThere are no restrictions on what the line can remind you of or can and can’t be a part of but your idea must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.'
                +'\n\n[b]Pay:[/b] Your pay is based on your relative performance within your group for all tasks:'
                +'\n1. £5 – Highest ranking participant'
                +'\n2. £2'
                +'\n3. £1'
                +'\n4. £0.5'
                +'\n5. £0 – Lowest ranking participant'
        },
    3: {
        title : 'Line Meanings',
        text : 'There will be a line shown at the start. Come up with as many things the line reminds you of or could be a part of. Remember you have to use the whole line. You will be given 5 minutes to complete the task.'
                +'\n\n[b]Important note:[/b]'
                +'\nThere are no restrictions on what the line can remind you of or can and can’t be a part of but your idea must be justified or explained using the description. I also ask to kindly refrain from figures which are explicit or inappropriate in nature.'
                +'\n\n[b]Attribution:[/b] Your ideas will be seen by your group together with your name'
                +'\n\n[b]Pay:[/b] Your pay is based on your relative performance within your group for all tasks:'
                +'\n1. £5 – Highest ranking participant'
                +'\n2. £2'
                +'\n3. £1'
                +'\n4. £0.5'
                +'\n5. £0 – Lowest ranking participant'
          },

  },

  alternativeObject : {
    0: {
      title : 'Objects Task',
      text : 'The task is to come up with as many ideas for what a given object could be in the 5 minutes given.'
             +'\n[b]Completion[/b]'
             +'\nConsider the object given is a Coat Hanger:'
             +'\n • First enter the title for the object in the “title” field. For example, the alternative object could be a “back scratcher”. '
             +'\n • Then fill the description field with additional information. A description is always required. A possible description could be “a tool that can be used to scratch your back”.'
             +'\n • Press the submit button to submit your idea'
             +'\nThere is no limit to how many ideas you can submit.'
             +'\nAll submitted entries can be seen by your group.'
             +'\n\nThe previous example would look like this…'
             +'\n[EXAMPLE]'
             +'\n\n[b]Pay:[/b] You will be paid £8.10 from completing all tasks.'
      },
      1: {
        title : 'Objects Task',
        text : 'The task is to come up with as many ideas for what a given object could be in the 5 minutes given.'
               +'\n[b]Completion[/b]'
               +'\nConsider the object given is a Coat Hanger:'
               +'\n • First enter the title for the object in the “title” field. For example, the alternative object could be a “back scratcher”. '
               +'\n • Then fill the description field with additional information. A description is always required. A possible description could be “a tool that can be used to scratch your back”.'
               +'\n • Press the submit button to submit your idea'
               +'\nThere is no limit to how many ideas you can submit.'
               +' All submitted entries can be seen by your group together with your name.'
               +'\n\nThe previous example would look like this…'
               +'\n[EXAMPLE]'
               +'\n\n[b]Pay:[/b] You will be paid £8.10 from completing all tasks.'
        },
      2: {
        title : 'Objects Task',
        text : 'The task is to come up with as many ideas for what a given object could be in the 5 minutes given.'
               +'\n[b]Completion[/b]'
               +'\nConsider the object given is a Coat Hanger:'
               +'\n • First enter the title for the object in the “title” field. For example, the alternative object could be a “back scratcher”. '
               +'\n • Then fill the description field with additional information. A description is always required. A possible description could be “a tool that can be used to scratch your back”.'
               +'\n • Press the submit button to submit your idea'
               +'\nThere is no limit to how many ideas you can submit.'
               +'\nAll submitted entries can be seen by your group.'
               +'\n\nThe previous example would look like this…'
               +'\n[EXAMPLE]'
               +'\n\n[b]Pay:[/b] Your pay is based on your relative performance within your group for all tasks:'
               +'\n1. £5 – Highest ranking participant'
               +'\n2. £2'
               +'\n3. £1'
               +'\n4. £0.5'
               +'\n5. £0 – Lowest ranking participant'

        },
        3: {
          title : 'Objects Task',
          text : 'The task is to come up with as many ideas for what a given object could be in the 5 minutes given.'
                 +'\n[b]Completion[/b]'
                 +'\nConsider the object given is a Coat Hanger:'
                 +'\n • First enter the title for the object in the “title” field. For example, the alternative object could be a “back scratcher”. '
                 +'\n • Then fill the description field with additional information. A description is always required. A possible description could be “a tool that can be used to scratch your back”.'
                 +'\n • Press the submit button to submit your idea'
                 +'\nThere is no limit to how many ideas you can submit.'
                 +' All submitted entries can be seen by your group together with your name.'
                 +'\n\nThe previous example would look like this…'
                 +'\n[EXAMPLE]'
                //  +'\nObject name: Back Scratcher'
                //  +'\nDescription: A tool that can be used to scratch your back'
                //  +'\n			(might be able to show using screen shot)'
                 +'\n\n[b]Pay:[/b] Your pay is based on your relative performance within your group for all tasks:'
                 +'\n1. £5 – Highest ranking participant'
                 +'\n2. £2'
                 +'\n3. £1'
                 +'\n4. £0.5'
                 +'\n5. £0 – Lowest ranking participant'

          },
  },

  similarities : {
    0: {
      title : 'Instructions for Similarity rounds',
      text : 'This round is completely anonymous and will not affect your pay.'
              +'\nA list of ideas will be shown and you are to judge whether any two are similar. If a similarity identified more than once, the later entry will be disregarded in following stages.'
              +'\n[b]Similarity guidelines:[/b]'
              +'\n1. Ideas are exact copies of each other.'
              +'\n2. Idea is largely expressed in an existing entry.'
              +'\nIdeas should be originally expressed and not be simply rewordings of each other'
              +'\n[b]Example:[/b]'
              +'\nThe following is a similarity judging example, but the final decision is up to you.  Consider the task: “come up with alternative object for a coat hanger”:'
              +'\n[EXAMPLE]'
              // +'\n1. Object: Back Scratcher, Description: Bent to scratch the back'
              // +'\n2. Object: Leg Scratcher, Description: Bent to scratch the leg'
              // +'\n3. Object: Reaching tool, Description: Moulded in order to reach high places.'
              +'\n • 1 and 2 express the same idea similarly and are seen as similar.'
              +'\n • 3 expresses a similar idea differently and so is not similar to the first two. '
              //+'\n[Screen showing the choice of 1&2) explanation it means that they are seen to be too similar to each other.]'
        },
    1: {
      title : 'Instructions for Similarity rounds',
      text : 'This round is completely anonymous and will not affect your pay.'
              +'\nA list of ideas will be shown and you are to judge whether any two are similar. If a similarity identified more than once, the later entry will be disregarded in following stages.'
              +'\n[b]Similarity guidelines:[/b]'
              +'\n1. Ideas are exact copies of each other.'
              +'\n2. Idea is largely expressed in an existing entry.'
              +'\nIdeas should be originally expressed and not be simply rewordings of each other'
              +'\n[b]Example:[/b]'
              +'\nThe following is a similarity judging example, but the final decision is up to you.  Consider the task: “come up with alternative object for a coat hanger”:'
              +'\n[EXAMPLE]'
              // +'\n1. Object: Back Scratcher, Description: Bent to scratch the back'
              // +'\n2. Object: Leg Scratcher, Description: Bent to scratch the leg'
              // +'\n3. Object: Reaching tool, Description: Moulded in order to reach high places.'
              +'\n • 1 and 2 express the same idea similarly and are seen as similar.'
              +'\n • 3 expresses a similar idea differently and so is not similar to the first two. '
              //+'\n[Screen showing the choice of 1&2) explanation it means that they are seen to be too similar to each other.]'
       },
    2: {
      title : 'Instructions for Similarity rounds',
      text : 'This round is completely anonymous and will not affect your pay.'
              +'\nA list of ideas will be shown and you are to judge whether any two are similar. If a similarity identified more than once, the later entry will be disregarded in following stages.'
              +'\n[b]Similarity guidelines:[/b]'
              +'\n1. Ideas are exact copies of each other.'
              +'\n2. Idea is largely expressed in an existing entry.'
              +'\nIdeas should be originally expressed and not be simply rewordings of each other'
              +'\n[b]Example:[/b]'
              +'\nThe following is a similarity judging example, but the final decision is up to you.  Consider the task: “come up with alternative object for a coat hanger”:'
              +'\n[EXAMPLE]'
              // +'\n1. Object: Back Scratcher, Description: Bent to scratch the back'
              // +'\n2. Object: Leg Scratcher, Description: Bent to scratch the leg'
              // +'\n3. Object: Reaching tool, Description: Moulded in order to reach high places.'
              +'\n • 1 and 2 express the same idea similarly and are seen as similar.'
              +'\n • 3 expresses a similar idea differently and so is not similar to the first two. '
            //  +'\n[Screen showing the choice of 1&2) explanation it means that they are seen to be too similar to each other.]'
    },
    3: {
      title : 'Instructions for Similarity rounds',
      text : 'This round is completely anonymous and will not affect your pay.'
              +'\nA list of ideas will be shown and you are to judge whether any two are similar. If a similarity identified more than once, the later entry will be disregarded in following stages.'
              +'\n[b]Similarity guidelines:[/b]'
              +'\n1. Ideas are exact copies of each other.'
              +'\n2. Idea is largely expressed in an existing entry.'
              +'\nIdeas should be originally expressed and not be simply rewordings of each other'
              +'\n[b]Example:[/b]'
              +'\nThe following is a similarity judging example, but the final decision is up to you.  Consider the task: “come up with alternative object for a coat hanger”:'
              +'\n[EXAMPLE]'
              // +'\n1. Object: Back Scratcher, Description: Bent to scratch the back'
              // +'\n2. Object: Leg Scratcher, Description: Bent to scratch the leg'
              // +'\n3. Object: Reaching tool, Description: Moulded in order to reach high places.'
              +'\n • 1 and 2 express the same idea similarly and are seen as similar.'
              +'\n • 3 expresses a similar idea differently and so is not similar to the first two. '
              //+'\n[Screen showing the choice of 1&2) explanation it means that they are seen to be too similar to each other.]'
    },
  },
  favourites : {
    0: {
      title : 'Favourites rounds',
      text : 'You will be asked to name your 5 favourites ideas by giving them stars.\n'
             +'\nYou will be completely anonymous when giving stars.\n'
             +'\nThe amount of stars an individual receives for his/her ideas will determine his/her rank within their group.'
             +'\n[EXAMPLE]'
          },
    1: {
      title : 'Favourites rounds',
      text : 'You will be asked to name your 5 favourites ideas by giving them stars.\n'
             +'\nYou will be completely anonymous when giving stars.\n'
             +'\nThe amount of stars an individual receives for his/her ideas will determine his/her rank within their group.'
             +'\n[EXAMPLE]'
          },
    2: {
      title : 'Favourites rounds',
      text : 'You will be asked to name your 5 favourites ideas by giving them stars.\n'
             +'\nYou will be completely anonymous when giving stars.\n'
             +'\nThe amount of stars an individual receives for his/her ideas will determine his/her rank within their group.'
             +'\n[EXAMPLE]'
          },
    3: {
      title : 'Favourites rounds',
      text : 'You will be asked to name your 5 favourites ideas by giving them stars.\n'
             +'\nYou will be completely anonymous when giving stars.\n'
             +'\nThe amount of stars an individual receives for his/her ideas will determine his/her rank within their group.'
             +'\n[EXAMPLE]'
          },
  },
  math : {
    0 : {
      title : 'Math Game Instructions',
      text : 'Solve as many addition problems as possible during the 5 minutes given. The number of correct answers will be shown when the game is over. Example seen below.'
        +'\n[EXAMPLE]'
        // +'\n[Math result screen example]'
    },
    1 : {
      title : 'Math Game Instructions',
      text : 'Solve as many addition problems as possible during the 5 minutes given. The number of correct answers will be shown when the game is over. Example seen below.'
        +'\n[EXAMPLE]'
        // +'\n[Math result screen example]'
    },
    2 : {
      title : 'Math Game Instructions',
      text : 'Solve as many addition problems as possible during the 5 minutes given. The number of correct answers will be shown when the game is over. Example seen below.'
        +'\n[EXAMPLE]'
        +'\n[b]Pay:[/b] Your pay will depend on your performance relative to others in your group.'
        // +'\n[Math result screen example]'
    },
    3 : {
      title : 'Math Game Instructions',
      text : 'Solve as many addition problems as possible during the 5 minutes given. The number of correct answers will be shown when the game is over. Example seen below.'
        +'\n[EXAMPLE]'
        +'\n[b]Pay:[/b] Your pay will depend on your performance relative to others in your group.'
        // +'\n[Math result screen example]'
    },
  },
}


class Instructions extends Component {

  constructor(props) {
    super(props);
     this.state = {groupType: 0,isSubmitted: false};

     console.log("INSTRUCTIONS: "+props.payload)
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps vienen pa ca")
    console.log(nextProps)
    this.setState({
      groupType: nextProps.groupType,
    });

  }

  componentWillUnmount(){
    this.setState({isSubmitted: false});
  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    websocket: React.PropTypes.object,
  };

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
                   Title: <TextField id={'dummy'} value='Back Scratcher' style={{marginLeft:10,
                   }} /><br/>
                   Description: <TextField
                                 id={'dummy2'}
                                 multiLine={true}
                                 rows={1}
                                 rowsMax={10}
                                 value='A tool that can be used to scratch your back'
                                 style={{ marginLeft:20, width: '80%',
                      }} />
               </CardText>
              </Card>
           </div>
          case 'alternativeObjectFigural':
            return <div style={{marginTop:20}}>
                <Card>
                <CardText>
                    Title: <TextField id={'dummy'} value='Flag' style={{marginLeft:10,
                    }} /><br/>
                    Description: <TextField
                                  id={'dummy2'}
                                  multiLine={true}
                                  rows={1}
                                  rowsMax={10}
                                  value='The line could be a side of a flag.'
                                  style={{ marginLeft:20, width: '80%',
                       }} />
                </CardText>
               </Card>
            </div>
          case 'similarities':
            return <div> <div style={{padding:5,display:'flex'}}>

                          <Card style={{paddingTop: '0%',fontWeight: 800,}}>
                            <CardText style={{padding:8}}>
                              1.
                            </CardText>
                          </Card>

                          <Card>
                            <CardHeader style={{padding:8}}>
                              Back Scratcher
                            </CardHeader>
                            <CardText style={{padding:8}}>
                              Bent to scratch the back
                            </CardText>
                          </Card>

                          <Card>
                            <CardText style={{padding:8, paddingTop:28,fontWeight: 800}}>
                              Similar to:
                            </CardText>
                          </Card>

                          <Card>
                            <CardText style={{padding:8}}>
                            <SelectField value={2} onChange={ () => {alert('This will set the selected entries as similar')}} style={{width:30}}>
                                  <MenuItem value={1} primaryText={1} />
                                  <MenuItem  value={2} primaryText={2} />
                                  <MenuItem  value={3} primaryText={3} />
                             </SelectField>
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
                        2.
                      </CardText>
                    </Card>

                    <Card>
                      <CardHeader style={{padding:8}}>
                      Leg Scratcher
                      </CardHeader>
                      <CardText style={{padding:8}}>
                      Bent to scratch the leg
                      </CardText>
                    </Card>

                    <Card>
                      <CardText style={{padding:8, paddingTop:28,fontWeight: 800}}>
                        Similar to:
                      </CardText>
                    </Card>

                    <Card>
                      <CardText style={{padding:8}}>
                      <SelectField value={1} onChange={ () => {alert('This will set the selected entries as similar')}} style={{width:30}}>
                            <MenuItem value={1} primaryText={1} />
                            <MenuItem  value={2} primaryText={2} />
                            <MenuItem  value={3} primaryText={3} />
                       </SelectField>
                      </CardText>
                    </Card>

                    <Card>
                      <CardText style={{padding:8}}>
                      <SelectField value={-1} onChange={ () => {alert('This will set the selected entries as similar')}} style={{width:30}}>
                            <MenuItem value={1} primaryText={1} />
                            <MenuItem  value={2} primaryText={2} />
                            <MenuItem  value={3} primaryText={3} />
                       </SelectField>
                      </CardText>
                    </Card>
              </div>

              <div style={{padding:5,display:'flex'}}>

                            <Card style={{paddingTop: '0%',fontWeight: 800,}}>
                              <CardText style={{padding:8}}>
                                3.
                              </CardText>
                            </Card>

                            <Card>
                              <CardHeader style={{padding:8}}>
                                Reaching tool
                              </CardHeader>
                              <CardText style={{padding:8}}>
                                Moulded in order to reach high places
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
                                    <MenuItem value={1} primaryText={1} />
                                    <MenuItem  value={2} primaryText={2} />
                                    <MenuItem  value={3} primaryText={3} />
                               </SelectField>
                              </CardText>
                            </Card>
                      </div>
            </div>
          case 'favourites':
            return <div style={{marginTop:20,display:'flex'}}>
                      <Card style={{paddingTop: '0%',fontWeight: 800,}}>
                        <CardText style={{padding:8}}>
                          {1+'.'}
                        </CardText>
                      </Card>

                      <Card style={{width:460}}>
                        <CardHeader style={{padding:8}}>
                            Reset button pressing tool
                        </CardHeader>
                        <CardText style={{padding:8}}>
                          A tool that can be used to press reset buttons which cannot be pressed with your fingers
                        </CardText>
                      </Card>

                      <Card>
                          <CardText style={{padding:20}}>
                            <Rater entryIndex={0} currentRating={3} raterCallback={ () => {alert('This is how you assign a rating')}} />
                          </CardText>
                      </Card>
                  </div>
          case 'math':
              return <div style={{marginTop:20}}>
                  <Card>
                  <CardText>
                    <div>56+73+5+10+11 =
                      <TextField
                        id={'dummy'}
                        style={{
                          paddingLeft: 10,
                          marginRight: 20,
                          }}
                          value={155}
                      />
                    </div>
                  </CardText>
                 </Card>
              </div>
          default:
            return <div></div>

    }
  }

  formatIntructionItem = (item,example) =>{
      if ( item.indexOf("[EXAMPLE]") > -1 ){
        return example
      } else if(item.indexOf('[b]') > -1){
        var splits = item.replace('[b]','').split("[/b]")
        return <span><span style={{fontWeight:'bold', marginRight:5}}>{splits[0]}</span>{splits[1]}</span>
      } else {
        return item
      }
  }


  gatherData = () => {
      if ( !this.state.isSubmitted ){
        this.props.submit( this.state )
        this.setState({isSubmitted: true});
      }
    }


//'_marker'
  render() {
    if ( JSON.stringify(this.props.type) == "{}" ) {
      return <span></span>
    }

    const { textColor } = this.context.muiTheme.palette;

    if (
      [0,1,2,3].includes(this.props.groupType) == false ||
      typeof this.props.type != 'string'
    ) {
      return <span></span>
    }

    let groupType =  this.props.groupType
    let tasktype = this.props.type

    let possibleTasks = ['favourites','math','similarities','alternativeObject','alternativeObjectFigural','experimentStructure']
    console.log("TASK TYPE: "+tasktype)
    if ( possibleTasks.indexOf(tasktype) < 0 ){
      return <div></div>
    }

    let title = instructionsData[tasktype][groupType].title;
    let text = instructionsData[tasktype][groupType].text;
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

              {
                text.split('\n').map(
                    (item,i) => <div key={i} style={{marginBottom:10}}>{this.formatIntructionItem(item,example)}</div>
                  )
              }

              {
                //example
              }
              <br />

              <FlatButton
                id="ready"
                backgroundColor='green'
                style={{color: 'white',}}
                  onClick= { this.gatherData }
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
    type : state.task.payload != undefined? state.task.payload.taskType: null,
    groupType : state.task.payload != undefined? state.task.payload.groupType: null,
  }
}

export default connect(mapStateToProps)(Instructions)
