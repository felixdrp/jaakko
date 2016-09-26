import React, { PropTypes, Component } from 'react'

// groups
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

import Class from 'material-ui/svg-icons/action/class';
import Language from 'material-ui/svg-icons/action/language';
import Group from 'material-ui/svg-icons/social/group';
import GroupAdd from 'material-ui/svg-icons/social/group-add';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import DeveloperBoard from 'material-ui/svg-icons/hardware/developer-board';

// Icons

import ShowChart from 'material-ui/svg-icons/editor/show-chart';
import LocalAtm from 'material-ui/svg-icons/maps/local-atm';
import Memory from 'material-ui/svg-icons/hardware/memory';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
//
// import GeneralInfoContainer from './general-info-container';
// import SessionTrackerContainer from './session-tracker-container';


import {

} from '../../../websocket-message/server-actions'

class ResultsManager extends Component {
  static propTypes = {
    // groups: PropTypes.object,
    // unassignedAccounts: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor() {
    super()
    this.state = {

    };

    // Used to store references.
    this._input = {};
  }

  render() {
    let surveyIndexMonetary = this.props.storeSession.session.surveyPath.reduce(
      (prev, element, index) => {
        // The survey have a monetary value?
        if (element.type == 'RESULTS' || element.type == 'MATH_RESULTS') {
          prev.push( index )
          return prev
        }
        return prev
      },
      []
    )

    let result = 

    const style = {
      gray: {
        color: '#565555'
      }
    }

    return (
      <Card
        style={{
          paddingBottom: 20,
        }}
      >
        <CardHeader
          title={ <span><ShowChart /> Results manager </span> }
          subtitle="Results manager"
        />
        <CardHeader
          title={ <span><LocalAtm /> Results manager </span> }
        />

      </Card>
    )
  }
}

export default ResultsManager
