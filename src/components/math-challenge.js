import React, { PropTypes, Component } from 'react'

class MathChallenge extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  render() {
    let message = this.props.message? this.props.message : 'Math Challenge'

    return (
      <div>
          <h1>{message}</h1>
      </div>
    )
  }
}

MathChallenge.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

export default MathChallenge
