import React from 'react';
import Title from '../Title/title';
import Input from '../Input/input';
import Button from '../Button/button';
import TodoList from '../TodoList/todo-list';
import './root.scss';

class Root extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      todos: [
        {text: 'Eat food', done: true, id: 1}
      ]
    }
  }

  handleChange = event => {
    this.setState({
      inputValue: event.target.value
    })
  }

  onCreateTodo = text =>  {
    const { todos } = this.state;
    const newTodo = {
      text,
      done: false,
      id: Math.random()
    }

    const updatedTodos = todos.concat(newTodo);
    this.setState({
      todos: updatedTodos
    })
  }

  handleChangeTodoStatus = id => {
    const todos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          done: !todo.done
        }
      }
      return todo;
    })
    this.setState({ todos })
  }

  handleDeleteTodo = id => {
    const updatedTodos = this.state.todos.filter(todo => todo.id !== id)
    this.setState({ todos: updatedTodos })
  }

  render() {
    return (
      <React.Fragment>
        <Title />
        <form
          className="form"
          onSubmit={event => event.preventDefault()}
        >
          <Input 
            value={this.state.inputValue}
            handleChange={this.handleChange}  
          />
          <Button 
            type="submit"
            onCreateTodo={this.onCreateTodo}
            inputValue={this.state.inputValue}
          />
        </form>
        <TodoList 
          changeTodoStatus={this.handleChangeTodoStatus}
          delTodo={this.handleDeleteTodo}
          todos={this.state.todos}
          inputValue={this.state.inputValue}
        />
      </React.Fragment>
    )
  }
}

export default Root