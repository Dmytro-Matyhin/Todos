import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/button.scss'

class Button extends React.Component {
  constructor(props) {
    super(props)
  }
  
  shouldComponentUpdate(nextProps) {
    if (this.props.inputValue === nextProps.inputValue) {
      return false
    }
    return true
  }

  handleTodoCreate = () => {
    this.props.CreateTodo(this.props.inputValue)
  }

  render() {
    return (
      <button 
        className="button"
        onClick={this.handleTodoCreate}
        disabled={!this.props.inputValue}
      >
      Add Todo
      </button>
    )
  }
}

Button.propTypes = {
  inputValue: PropTypes.string,
  CreateTodo: PropTypes.func,
}

export default Button