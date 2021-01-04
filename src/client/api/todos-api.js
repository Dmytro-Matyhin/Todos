import {environmentUrls} from '../utils/environment';

const { baseUrl, todosPath } = environmentUrls;

export const getTodosList = () => {
  return fetch(`${baseUrl}/${todosPath}`)
  .then(response => response.json())
  .then(data => data.data)
  .then(todos => todos)
}

export const sendTodo = todoData => {
  return fetch(`${baseUrl}/${todosPath}`, {
    method: 'POST',
    body: JSON.stringify(todoData),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to POST todos');
    }
  })
}

export const deleteTodo = todoId => {
  return fetch(`${baseUrl}/${todosPath}/${todoId}`, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to DELETE todos');
    }
  })
}

export const updateTodoStatus = (todoId, todoData) => {
  return fetch(`${baseUrl}/${todosPath}/${todoId}`, {
    method: 'PUT',
    body: JSON.stringify({...todoData}),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to POST todos');
    }
  })
}