import {environmentUrls} from '../utils/environment'

const { baseUrl, todosPath } = environmentUrls

const DEFAULT_HEADERS = {
  "Content-type": "application/json; charset=UTF-8"
}

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
    headers: DEFAULT_HEADERS
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to POST todos')
    }
  })
}

export const deleteTodo = todoId => {
  return fetch(`${baseUrl}/${todosPath}/${todoId}`, {
    method: 'DELETE',
    headers: DEFAULT_HEADERS
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to DELETE todos')
    }
  })
}

export const updateTodo = (todoId, todoData) => {
  return fetch(`${baseUrl}/${todosPath}/${todoId}`, {
    method: 'PUT',
    body: JSON.stringify({...todoData}),
    headers: DEFAULT_HEADERS
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to PUT todos')
    }
  })
}

export const getTodosListWithParams = (skip, take) => {
  return fetch(`${baseUrl}/${todosPath}?skip=${skip}&take=${take}`)
  .then(res => res.json())
  .then(data => data.data)
  .then(todos => todos)
}