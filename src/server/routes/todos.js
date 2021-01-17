const express = require('express')
const shortid = require('shortid')
const router = express.Router()
const db = require('../database')

router.get('/', function(req, res, next) {
  let allTodos = db.get('todos')
  let onPageTodos = []

  const skip = parseInt(req.query.skip)
  const take = parseInt(req.query.take)
  const defaultTodos = 10
  const defaultSkip = 0

  if (skip < 0 || take < 0) {
    onPageTodos = allTodos.slice(defaultSkip, defaultTodos)
  } else if (skip == 0) {
    onPageTodos = allTodos.slice(skip, take)
  } else if (skip > 0) {
    onPageTodos = allTodos.slice(skip, skip + take)
  } 
  else if ( (skip + take) > allTodos.length) {
    onPageTodos = allTodos.slice(skip, allTodos.length)
  }

  res.status(200).json({
    status: 'success',
    data: onPageTodos
  })

}).get('/:id', function(req, res, next) {
  let todo = db.get('todos').find({id: req.params.id})

  res.status(200).json({
    status: 'success',
    data: todo
  }) 
  
}).post('/', function(req, res, next) {
  if (!req.body) {
    return res.status(400).json({
      status: 'error',
      error: 'req body cannot be empty',
    })
  }

  let id = shortid.generate()
  db.get('todos').push({...req.body, id }).write()

  res.status(200).json({
    status: 'success',
    data: id,
  })

}).delete('/:id', function(req, res, next) {
  let id = req.params.id
  db.get('todos').remove({id: id}).write()

  res.status(200).json({
    status: 'success',
    data: id,
  })

}).put('/:id', function(req, res, next) {
  let id = req.params.id
  
  db.get('todos').find({id: id}).assign(req.body).write()

  res.status(200).json({
    status: 'success',
    data: req.body,
  })
})

module.exports = router