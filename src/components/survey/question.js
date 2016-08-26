import React, { PropTypes, Component } from 'react'

import { connect } from 'react-redux'

import Wait from './wait'


var v = "MELACO"
class Question extends Component {
  componentWillMount() {
    console.log(" LO ICE ANNTESS CON H DE PUTA")
  }
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }
  mlk() {
    return 'm l come'
  }

  render() {
    // let message = this.props.message? this.props.message : 'Question'
    let message =  'Question'

    return (
      <div>
          <h1>{message}</h1>
          <Wait melacome={10} />
          <div> {this.props.firstName} {v} {this.mlk()}</div>
      </div>
    )
  }
}

Question.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

//export default Question

const mapStateToProps = (state) => {
  return {
    firstName : state.account.firstName
  }
}

export default connect(mapStateToProps)(Question)
