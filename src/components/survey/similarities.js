import React, { PropTypes, Component } from 'react'


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
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




class Similarities extends Component {

  constructor(props) {
    super(props);
     this.state = {data : []};

  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    websocket: React.PropTypes.object,
  };

  componentWillMount() {
    this.setState({'data' : [{ title : 'Super paper clip' ,description : 'the super super paperclip that will rule them all',similars:[]},
                { title : 'Super paper clip' ,description : 'the super super paperclip that will rule them all',similars:[]},
                { title : 'Super paper clip' ,description : 'the super super paperclip that will rule them all',similars:[]},
                { title : 'Super paper clip' ,description : 'the super super paperclip that will rule them all',similars:[]},
                { title : 'Super paper clip' ,description : 'the super super paperclip that will rule them all',similars:[]},
                { title : 'Super paper clip' ,description : 'the super super paperclip that will rule them all',similars:[]},
                { title : 'Super paper clip' ,description : 'the super super paperclip that will rule them all',similars:[]},
                { title : 'Super paper clip' ,description : 'the super super paperclip that will rule them all',similars:[]},
                { title : 'Super paper clip' ,description : 'the super super paperclip that will rule them all',similars:[]},
                { title : 'Super paper clip' ,description : 'the super super paperclip that will rule them all',similars:[]},
                { title : 'Super paper clip' ,description : 'the super super paperclip that will rule them all',similars:[]},
                { title : 'Super paper clip' ,description : 'the super super paperclip that will rule them all',similars:[]}] });
  }


  handleChange = (event, selectionIndex, field, originIndex) => {

    var data = this.state.data;

    if( field > -1 ){
      var clean_array = []
      for ( var a in data[originIndex].similars ){

         if(data[originIndex].similars[a] == field ){
           if ( data[originIndex].similars.indexOf(selectionIndex) < 0){
             clean_array.push(selectionIndex);
           }
           continue;
         }
         clean_array.push(data[originIndex].similars[a]);
      }
      data[originIndex].similars = clean_array;

    }

    if( field > -1 ){
      var clean_array = []
      for ( var a in data[field].similars ){

         if(data[field].similars[a] == originIndex ){
           if ( data[field].similars.indexOf(originIndex) < 0){
             clean_array.push(originIndex);
           }
           continue;
         }
         clean_array.push(data[field].similars[a]);
      }
      data[field].similars = clean_array;

    }


    if ( data[originIndex].similars.indexOf(selectionIndex) < 0){
      data[originIndex].similars.push(selectionIndex);
    }

    if ( data[selectionIndex].similars.indexOf(originIndex) < 0){
      data[selectionIndex].similars.push(originIndex);
    }

    this.setState({data : data})
  };

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  alerthing = () => {
    alert('boom');
  }

//'_marker'
  render() {

    const { textColor } = this.context.muiTheme.palette;

    let title = 'Similarities Task';
    let text = 'The task is to come up with as many alternative objects for a given object. \n\n For example:';

    let data = this.state.data;


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

              <br />
              <Timer timerCallback={ this.alerthing }></Timer>

              {
                data.map( (entry,i) => {
                  return <div key={i} style={{padding:5,display:'flex'}}>

                                <Card style={{paddingTop: '0%',fontWeight: 800,}}>
                                  <CardText style={{padding:8}}>
                                    {i+'.'}
                                  </CardText>
                                </Card>

                                <Card>
                                  <CardHeader style={{padding:8}}>
                                    {entry.title}
                                  </CardHeader>
                                  <CardText style={{padding:8}}>
                                    {entry.description}
                                  </CardText>
                                </Card>

                                <Card>

                                  <CardText style={{padding:8, paddingTop:28,fontWeight: 800}}>
                                    Similar to:
                                  </CardText>
                                </Card>

                                {
                                    entry.similars.map(  (sim_entry,j) => {

                                                return <Card key = {j}>
                                                  <CardText style={{padding:8}}>
                                                  <SelectField  value={sim_entry} onChange={(event, index, value) => this.handleChange(event, index, sim_entry, i)} style={{width:30, maxHeight:85}} >

                                                    {
                                                      data.map( (entry_options,z) => {return (entry.title == entry_options.title ) ? <MenuItem key={z} value={z} primaryText={z} /> : '' })
                                                    }
                                                   </SelectField>
                                                  </CardText>
                                                </Card>
                                              })
                               }

                               <Card>
                                 <CardText style={{padding:8}}>
                                 <SelectField value={-1} onChange={(event, index, value) => this.handleChange(event, index, -1, i)} style={{width:30}}>

                                   {
                                     data.map( (entry_options,z) => { return (entry.title == entry_options.title ) ? <MenuItem key={z} value={z} primaryText={z+'. '+entry_options.title} /> : '' })
                                   }
                                  </SelectField>
                                 </CardText>
                               </Card>

                        </div>
                } )
              }

            </CardText>

          </Card>

      </div>
    )
  }
}

Similarities.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

//export default Question

const mapStateToProps = (state) => {
  return {
    firstName : state.account.firstName
  }
}

export default connect(mapStateToProps)(Similarities)
