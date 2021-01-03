import React from 'react';
import './todo-element.scss';

const TodoElement = ({ text, done, id, changeTodoStatus, delTodo }) => {
  const todoItemDone = `todo-item ${done ? 'todo-item-done' : ''}`
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

export default TodoElement