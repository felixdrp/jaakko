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
    this.state = {data : this.props.ideas};
    this.isSubmitted = false

  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    websocket: React.PropTypes.object,
  };


  componentWillReceiveProps(nextProps) {
    this.setState({
      data : JSON.stringify(this.props.type) != "{}"? nextProps.ideas : []
    });
  }


  componentWillMount() {
    // this.setState({data : [ { group: 1474585598573,
    //    groupType: 0,
    //    id: 'cnAxNDc0NTg1NjAyLjExMw==',
    //    title: 'gfdgdfs',
    //    description: 'gfdgfds',
    //    creator: 'rpsoft@gmail.com',
    //    rating: [],
    //    timeSubmitted: 1474585604805,
    //    similarTo: [] },
    // //  { group: 1474585598573,
    // //    groupType: 0,
    // //    id: 'cnAxNDc0NTg1NjA0LjgwNQ==',
    // //    title: '432432',
    // //    description: 'gfdsgfds',
    // //    creator: 'rpsoft@gmail.com',
    // //    rating: [],
    // //    timeSubmitted: 1474585607161,
    // //    similarTo: [] },
    // //  { group: 1474585598573,
    // //    groupType: 0,
    // //    id: 'cnAxNDc0NTg1NjA3LjE2MQ==',
    // //    title: '543gfdgfds63',
    // //    description: 'hgdfsdf4',
    // //    creator: 'rpsoft@gmail.com',
    // //    rating: [],
    // //    timeSubmitted: 1474585610161,
    // //    similarTo: [] },
    // //  { group: 1474585598573,
    // //    groupType: 0,
    // //    id: 'cnAxNDc0NTg1NjEwLjE2MQ==',
    // //    title: 'erhrhgf',
    // //    description: 'hgfhgffhdg',
    // //    creator: 'rpsoft@gmail.com',
    // //    rating: [],
    // //    timeSubmitted: 1474585612141,
    // //    similarTo: [] },
    // //  { group: 1474585598573,
    // //    groupType: 0,
    // //    id: 'cnAxNDc0NTg1NjEyLjE0MQ==',
    // //    title: '654546',
    // //    description: 'hghgfhgfds',
    // //    creator: 'rpsoft@gmail.com',
    // //    rating: [],
    // //    timeSubmitted: 1474585614096,
    // //    similarTo: [] },
    //  { group: 1474585598573,
    //    groupType: 0,
    //    id: 'cnAxNDc0NTg1NjE0LjA5Ng==',
    //    title: 'hgfghf',
    //    description: 'gf  // this.setState({data : [ { group: 1474585598573,
    //    groupType: 0,
    //    id: 'cnAxNDc0NTg1NjAyLjExMw==',
    //    title: 'gfdgdfs',
    //    description: 'gfdgfds',
    //    creator: 'rpsoft@gmail.com',
    //    rating: [],
    //    timeSubmitted: 1474585604805,
    //    similarTo: [] },
    // //  { group: 1474585598573,
    // //    groupType: 0,
    // //    id: 'cnAxNDc0NTg1NjA0LjgwNQ==',
    // //    title: '432432',
    // //    description: 'gfdsgfds',
    // //    creator: 'rpsoft@gmail.com',
    // //    rating: [],
    // //    timeSubmitted: 1474585607161,
    // //    similarTo: [] },
    // //  { group: 1474585598573,
    // //    groupType: 0,
    // //    id: 'cnAxNDc0NTg1NjA3LjE2MQ==',
    // //    title: '543gfdgfds63',
    // //    description: 'hgdfsdf4',
    // //    creator: 'rpsoft@gmail.com',
    // //    rating: [],
    // //    timeSubmitted: 1474585610161,
    // //    similarTo: [] },
    // //  { group: 1474585598573,
    // //    groupType: 0,
    // //    id: 'cnAxNDc0NTg1NjEwLjE2MQ==',
    // //    title: 'erhrhgf',
    // //    description: 'hgfhgffhdg',
    // //    creator: 'rpsoft@gmail.com',
    // //    rating: [],
    // //    timeSubmitted: 1474585612141,
    // //    similarTo: [] },
    // //  { group: 1474585598573,
    // //    groupType: 0,
    // //    id: 'cnAxNDc0NTg1NjEyLjE0MQ==',
    // //    title: '654546',
    // //    description: 'hghgfhgfds',
    // //    creator: 'rpsoft@gmail.com',
    // //    rating: [],
    // //    timeSubmitted: 1474585614096,
    // //    similarTo: [] },
    //  { group: 1474585598573,
    //    groupType: 0,
    //    id: 'cnAxNDc0NTg1NjE0LjA5Ng==',
    //    title: 'hgfghf',
    //    description: 'gfdfgds',
    //    creator: 'rpsoft@gmail.com',
    //    rating: [],
    //    timeSubmitted: 1474585616712,
    //    similarTo: [] } ]});dfgds',
    //    creator: 'rpsoft@gmail.com',
    //    rating: [],
    //    timeSubmitted: 1474585616712,
    //    similarTo: [] } ]});
  }


  handleChange = (event, selectionIndex, field, originIndex) => {

    var data = this.state.data;

    if ( field > -1 && selectionIndex == data.length){ // this is the remove case.

        data = this.removeSimilars ( data, originIndex, field );
        data = this.removeSimilars ( data, field, originIndex );
        this.setState({data : data});
        return;
    }

    if( field > -1 ){
      data = this.modifySimilars ( data, originIndex, selectionIndex, field );
      data = this.modifySimilars ( data, field, originIndex, originIndex );
    }


    if ( data[originIndex].similarTo.indexOf(selectionIndex) < 0){
      data[originIndex].similarTo.push(selectionIndex);
    }

    if ( data[selectionIndex].similarTo.indexOf(originIndex) < 0){
      data[selectionIndex].similarTo.push(originIndex);
    }

    this.setState({data : data})
  };

  modifySimilars = ( data, dataIndex, similarsIndex, modifyIndex ) => {

    var clean_array = []
    for ( var a in data[dataIndex].similarTo ){
       if(data[dataIndex].similarTo[a] == modifyIndex ){
         if ( data[dataIndex].similarTo.indexOf(similarsIndex) < 0){
           clean_array.push(similarsIndex);
         }
         continue;
       }
       clean_array.push(data[dataIndex].similarTo[a]);
    }
    data[dataIndex].similarTo = clean_array;

    return data;
  }

  removeSimilars = ( data, dataIndex, similarsIndex ) => {

    var clean_array = []
    for ( var a in data[dataIndex].similarTo ){
       if(data[dataIndex].similarTo[a] == similarsIndex ){
         if ( data[dataIndex].similarTo.indexOf(similarsIndex) > -1){
           continue;
         }
       }
       clean_array.push(data[dataIndex].similarTo[a]);
    }
    data[dataIndex].similarTo = clean_array;

    return data;
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }


    gatherData = () => {
      var data = this.state.data.slice();
      for ( var d in data){
          var entry = data[d];

          for (var s in entry.similarTo){
            var entry_index = entry.similarTo[s]

            entry.similarTo[s] = data[entry_index].id;

          }


      }

      if ( !this.isSubmitted ){
        this.props.submit( data )
        this.isSubmitted = true;
      }

    //  this.setState({data})
      //console.log(JSON.stringify(this.state));
      return data;

    }


//'_marker'
  render() {

    const { textColor } = this.context.muiTheme.palette;

    let title = 'Similarities Task';
    let text = 'The task is to come up with as many alternative objects for a given object. \n\n For example:';

    let data = this.state.data;
    if ( !data ){
      return <div></div>
    }

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
                                    entry.similarTo.map(  (sim_entry,j) => {

                                                return <Card key = {j}>
                                                  <CardText style={{padding:8}}>
                                                  <SelectField  value={sim_entry} onChange={(event, index, value) => this.handleChange(event, index, sim_entry, i)} style={{width:30, maxHeight:85}} >

                                                    {
                                                      data.map( (entry_options,z) => {return <MenuItem key={z} value={z} primaryText={z+''} disabled={ entry.title == entry_options.title }  />} )
                                                      // data.map( (entry_options,z) => {return (entry.title == entry_options.title ) ? <MenuItem key={z} value={z} primaryText={z} /> : <MenuItem key={z} /> })
                                                    }
                                                      <MenuItem value={data.length} primaryText={'remove'} />
                                                   </SelectField>
                                                  </CardText>
                                                </Card>
                                              })
                               }

                               <Card>
                                 <CardText style={{padding:8}}>
                                 <SelectField value={-1} onChange={(event, index, value) => this.handleChange(event, index, -1, i)} style={{width:30}}>

                                   {
                                      data.map( (entry_options,z) => { return <MenuItem key={z} value={z} primaryText={z+''} disabled={ entry.title == entry_options.title }  />} )
                                   }
                                  </SelectField>
                                 </CardText>
                               </Card>

                        </div>
                } )
              }

            </CardText>


            <RaisedButton
              id="submitAnswers"
              style={{color: 'white',}}
              type="submit"
              onClick= { this.gatherData }
            >
              Submit
            </RaisedButton>
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
    firstName : state.account.firstName,
    ideas: (state.task.payload) ? state.task.payload.ideas: [],
  }
}

export default connect(mapStateToProps)(Similarities)
