import React from 'react'
import TodoElement from '../TodoElement/todo-element'
import PropTypes from 'prop-types'

import '../../styles/todo-list.scss'

class TodoList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const sortTodos = this.props.todos.slice().sort((a, b) => a.done - b.done)

    return (
      <div className="todo">
        <ul className="todo-list">
          {sortTodos.map(todo => (
            <TodoElement 
              key={todo.id}
              {...todo}
              changeTodoStatus={this.props.changeTodoStatus}
              changeTodoText={this.props.changeTodoText}
              deleteTodo={this.props.deleteTodo}
            />
          ))}
        </ul>
      </div>
    )
  }
}

TodoList.propTypes = {
  inputValue: PropTypes.string.isRequired,
  changeTodoStatus: PropTypes.func,
  changeTodoText: PropTypes.func,
  deleteTodo: PropTypes.func,
  todos: PropTypes.array,
}

export default TodoList