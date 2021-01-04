import React from 'react';
import './button.scss'

class Button extends React.Component {
  constructor(props) {
    super(props)
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

export default Button