import React, { PropTypes, Component } from 'react'

class Question extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  render() {
    let message = this.props.message? this.props.message : 'Question'

    return (
      <div>
          <h1>{message}</h1>
      </div>
    )
  }
}

Question.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

export default Question
