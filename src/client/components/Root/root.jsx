import React from 'react';
import Title from '../Title/title';
import Input from '../Input/input';
import Button from '../Button/button';
import TodoList from '../TodoList/todo-list';
import { 
  sendTodo,
  getTodosList,
  deleteTodo,
  updateTodoStatus
} from '../../api/todos-api';

import '../../styles/root.scss'

class Root extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      todos: [],
    }
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
    const form = event.target;
    form.reset();
    this.setState({ inputValue: '' })
  }

  getTodos = () => {
    getTodosList()
    .then(todos => {
      this.setState({ todos })
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
    };

    updateTodoStatus(id, updatedTodo)
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
        { 
          this.state.todos.length &&
          <TodoList 
            changeTodoStatus={this.handleChangeTodoStatus}
            delTodo={this.handleDeleteTodo}
            todos={this.state.todos}
            inputValue={this.state.inputValue}
          />
        }
      </React.Fragment>
    )
  }
}

export default Root

/*
3. add link in header to this project on github (optional)
4. add propTypes, defaultProps
5. add shouldComponentUpdate
6. create file for styles and add variables there(colors, backgrounds, etc) (optional)
7. create authorization (future)
8. use mySQL instead lowdb(future)
 */