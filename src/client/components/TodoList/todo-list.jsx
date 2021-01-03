import React from 'react'
import TodoElement from '../TodoElement/todo-element';
import './todo-list.scss'

class TodoList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const sortTodos = this.props.todos.slice().sort((a, b) => a.done - b.done);

    return (
      <div className="todo">
        <ul className="todo-list">
          {sortTodos.map(todo => (
            <TodoElement 
              key={todo.id}
              {...todo}
              changeTodoStatus={this.props.changeTodoStatus}
              delTodo={this.props.delTodo}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default TodoList