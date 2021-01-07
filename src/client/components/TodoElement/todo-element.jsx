import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import '../../styles/todo-element.scss'

const Button = ({ text, onClick, disabled = false }) => {
  const todoItemChange = `${disabled ? 'todo-item-change-save' : 'todo-item-update'}`
  return (
    <button   
      className={todoItemChange}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

class TodoElement extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      newText: props.text
    }
  }

  handleEdit = _e => {
    this.setState({ isEditing: true })
  }

  handleChange = e => {
    this.setState({ newText: e.target.value })
  }

  handleUpdate = e => {
    this.props.changeTodoText(this.props.id, this.state.newText)
      .then(() => {
        this.setState({ isEditing: false })
      })
  }

  cancelEditing = e => {
    this.setState({ newText: this.props.text, isEditing: false })
  }

  render() {
    const { text, done, id, changeTodoStatus, deleteTodo } = this.props
    const todoItemDone = `todo-item ${done ? 'todo-item-done' : ''}`

    return (
      <li className={todoItemDone}>
        <div className="todo-item-value">
          <input
            type="checkbox"
            className="todo-item-checkbox"
            defaultChecked={done}
            onChange={() => changeTodoStatus(id)}  
          />
          {
            this.state.isEditing
              ? <input
                  value={this.state.newText}
                  onChange={this.handleChange}
                  className="todo-item-change"
                />
              : <span className="todo-item-text">{text}</span>
          }
        </div>
        <div className="todo-item-btns">
          {
            this.state.isEditing
              ? <React.Fragment>
                  <Button text="Cancel" onClick={this.cancelEditing} />
                  <Button text="Save" onClick={this.handleUpdate} disabled={this.props.text === this.state.newText} />
                </React.Fragment>
              : <Button text="Edit" onClick={this.handleEdit} />
          }

          <button 
            className="todo-item-button"
            onClick={() => deleteTodo(id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </li>
    )
  }
}

TodoElement.propTypes = {
  changeTodoStatus: PropTypes.func,
  deleteTodo: PropTypes.func,
  done: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default TodoElement