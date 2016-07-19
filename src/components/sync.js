import React, { PropTypes, Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class Syncronize extends Component {
  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  render() {
    let message = this.props.message? this.props.message : 'Please wait a moment...'
    const { textColor } = this.context.muiTheme.palette;

    return (
      <div>
        <Card
          style={{
            padding: 30,
          }}
        >
          <CardHeader
            title={message}
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
        </CardText>
      </Card>
      </div>
    )
  }
}

Syncronize.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

export default Syncronize
