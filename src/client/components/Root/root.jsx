import React from 'react'
import Title from '../Title/title'
import Input from '../Input/input'
import Button from '../Button/button'
import TodoList from '../TodoList/todo-list'
import { 
  sendTodo,
  deleteTodo,
  updateTodo,
  getTodosListWithParams
} from '../../api/todos-api'

import '../../styles/root.scss'

class Root extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      todos: [],
      defaultSkip: 0,
      defaultTake: 8,
      skip: 0,
      take: 8
    }

    this.startTodosPage = this.startTodosPage.bind(this)
    this.nextTodosPage = this.nextTodosPage.bind(this)
    this.previousTodosPage = this.previousTodosPage.bind(this)
  }

  componentDidMount() {
    this.getTodos()
  }

  handleChange = event => {
    this.setState({
      inputValue: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const form = event.target
    form.reset()
    this.setState({ inputValue: '' })
  }

  getTodos = () => {
    getTodosListWithParams(this.state.skip, this.state.take)
    .then(todos => {
      this.setState({ todos })
    })
  }

  nextTodosPage() {
    getTodosListWithParams(this.state.skip + this.state.take, this.state.take)
    .then(todos => {
      this.setState({
        todos,
        skip: this.state.skip + this.state.take
      })
    })
  }

  startTodosPage() {
    getTodosListWithParams(this.state.defaultSkip, this.state.defaultTake)
    .then(todos => {
      this.setState({ 
        todos,
        skip: this.state.defaultSkip
      })
    })
  }

  previousTodosPage() {
    getTodosListWithParams(this.state.skip - this.state.take, this.state.take)
    .then(todos => {
      this.setState({
        todos,
        skip: this.state.skip - this.state.take
      })
    })
  }

  handleCreateTodo = text => {
    const newTodo = {
      text,
      done: false
    }
    sendTodo(newTodo)
    .then(() => this.getTodos())
  }

  handleChangeTodoStatus = id => {
    const { text, done } = this.state.todos.find(todo => todo.id === id)
    const updatedTodo = {
      text,
      done: !done,
    }

    updateTodo(id, updatedTodo)
    .then(() => this.getTodos()) 

  }

  handleChangeTodoText = (id, newText) => {
    const updatedTodo = { text: newText }

    return updateTodo(id, updatedTodo)
      .then(() => this.getTodos())
  }

  handleDeleteTodo = id => {
    deleteTodo(id)
    .then(() => this.getTodos()) 
  }

  render() {
    return (
      <React.Fragment>
        <Title />
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <Input 
            value={this.state.inputValue}
            handleChange={this.handleChange}  
          />
          <Button 
            type="submit"
            CreateTodo={this.handleCreateTodo}
            inputValue={this.state.inputValue}
          />
        </form>
        {this.state.todos.length 
          ? <TodoList 
              changeTodoStatus={this.handleChangeTodoStatus}
              changeTodoText={this.handleChangeTodoText}
              deleteTodo={this.handleDeleteTodo}
              todos={this.state.todos}
              inputValue={this.state.inputValue}
            />
          : null
        }
        <button onClick={this.startTodosPage}>ORIGIN</button>
        <button 
          onClick={this.nextTodosPage}
          disabled={this.state.todos.length < this.state.take}
        >
        NEXT
        </button>
        <button
        onClick={this.previousTodosPage}
        disabled={this.state.skip < this.state.todos.length}
        >
        PREVIOUS
        </button>
      </React.Fragment>
    )
  }
}

export default Root