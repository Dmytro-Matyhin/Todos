import React from 'react';
import './button.scss'

class Button extends React.Component {
  constructor(props) {
    super(props)

    this.handleTodoCreate = this.handleTodoCreate.bind(this);
  }

  handleTodoCreate() {
    this.props.onCreateTodo(this.props.inputValue)
  }

  render() {
    return (
      <button 
        className="button"
        onClick={this.handleTodoCreate}
      >
      Add Todo
      </button>
    )
  }
}

export default Button