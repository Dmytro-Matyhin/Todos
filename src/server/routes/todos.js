const express = require('express')
const shortid = require('shortid')
const router = express.Router()
const db = require('../database')

const DEFAULT_SKIP = 0
const MIN_TAKE = 10
const MAX_TAKE = 25

router.get('/', function(req, res, next) {
  let allTodos = db.get('todos')
  let onPageTodos = []
  let skip
  let take
  const querySkip = parseInt(req.query.skip)
  const queryTake = parseInt(req.query.take)
  
  switch (true) {
    case querySkip < 0 || queryTake < 0:
      skip = DEFAULT_SKIP
      take = MIN_TAKE
      break
      
    case querySkip > allTodos.size().value() || queryTake > allTodos.size().value():
      skip = DEFAULT_SKIP
      take = MAX_TAKE
      break 

    case querySkip == undefined || querySkip == null || isNaN(querySkip):
      skip = DEFAULT_SKIP
      take = MIN_TAKE
      break

    case queryTake == undefined || queryTake == null || isNaN(queryTake):
      skip = DEFAULT_SKIP
      take = MIN_TAKE
      break

    case querySkip == 0 && queryTake == 0 || querySkip > 0 && queryTake == 0:
      skip = querySkip
      take = MIN_TAKE
      break
      
    case !querySkip || !queryTake:
      skip = querySkip
      take = queryTake
      break

    case querySkip > 1:
      skip = querySkip
      take = querySkip + queryTake
      break
  }

  onPageTodos = allTodos.slice(skip, take)

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