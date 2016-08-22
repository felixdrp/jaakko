import React, { PropTypes, Component } from 'react'

class Example extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  render() {
    let message = this.props.message? this.props.message : 'Example'

    return (
      <div>
          <h1>{message}</h1>
      </div>
    )
  }
}

Example.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

export default Example
