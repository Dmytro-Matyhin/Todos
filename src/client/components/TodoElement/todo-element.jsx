import React from 'react';
import '../../styles/todo-element.scss'

class TodoElement extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.inputValue === nextProps.inputValue && 
      this.props.done === nextProps.done) {
      return false;
    }
    return true;
  }

  render() {
    const { text, done, id, changeTodoStatus, delTodo } = this.props;
    const todoItemDone = `todo-item ${done ? 'todo-item-done' : ''}`;

    return (
      <li className={todoItemDone}>
        <input 
          type="checkbox"
          className="todo-item-checkbox"
          defaultChecked={done}
          onChange={() => changeTodoStatus(id)}  
        />
        <span className="todo-item-text">{text}</span>
        <button 
          className="todo-item-button"
          onClick={() => delTodo(id)}
        ></button>
      </li>
    )
  }
}

export default TodoElement