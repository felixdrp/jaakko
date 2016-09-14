import React, { PropTypes, Component } from 'react'


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';

import Checkbox from 'material-ui/Checkbox';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

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
 ToggleStar,
 ToggleStarBorder,
 ContentClear,
} from 'material-ui/svg-icons';


const styles = {
  block: {
    display:'flex',
  },
  radioButton: {
    display:'inline',
    width: 50
  },
};


class Rater extends Component {

  constructor(props) {
    super(props);
    this.state = {currentRating : 0};
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

  setRating = (rating) => {
    //this.setState({currentRating: rating});
    this.props.raterCallback(this.props.entryIndex, rating);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({currentRating: nextProps.currentRating});
  }

  getStar = (number) => {
    var checked = false;
    if ( number <= this.state.currentRating){
      checked = true;
    }
    return <Checkbox
      key={number}
      checkedIcon={<ToggleStar   color={yellow500}/>}
      uncheckedIcon={<ToggleStarBorder   color={yellow500}/>}
      label=""
      checked={checked}
      style={styles.radioButton}
      onClick={ () => {this.setRating(number)}}

      />
  }

  reset = () => {
    this.setState({currentRating: 0});
  }

  render() {

    const { textColor } = this.context.muiTheme.palette;
    let numberOfStars = 5;

    return (
      <div style={{display:'flex'}}>
        {
          [1,2,3,4,5].map(
             (number,i) => {
               return this.getStar(number)
             })
        }
        <IconButton tooltip="Clear all stars"
                    onClick={ () => {this.setRating(-1)}}
                    style={{width:24,height:24,margin:0,padding:0}}
                    >
          <ContentClear />
        </IconButton>
      </div>
    )
  }
}

Rater.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

//export default Question

const mapStateToProps = (state) => {
  return {
    firstName : state.account.firstName
  }
}

export default connect(mapStateToProps)(Rater)
