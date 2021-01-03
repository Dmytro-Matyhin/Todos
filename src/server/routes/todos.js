const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const db = require('../database');

router.get('/', function(req, res, next) {
  let todos = db.get('todos');

  res.status(200).json({
    status: 'success',
    data: todos,
  }); 

}).get('/:id', function(req, res, next) {
  let todo = db.get('todos').find({id: req.params.id})

  res.status(200).json({
    status: 'success',
    data: todo
  }); 
  
}).post('/', function(req, res, next) {
  if (!req.body) {
    return res.status(400).json({
      status: 'error',
      error: 'req body cannot be empty',
    });
  }

  let id = shortid.generate();
  db.get('todos').push({...req.body, id }).write();

  res.status(200).json({
    status: 'success',
    data: id,
  });

}).delete('/:id', function(req, res, next) {
  let id = req.params.id;
  db.get('todos').remove({id: id}).write();

  res.status(200).json({
    status: 'success',
    data: id,
  })

}).put('/:id', function(req, res, next) {
  let id = req.params.id;
  
  db.get('todos').find({id: id}).assign(req.body).write();

  res.status(200).json({
    status: 'success',
    data: req.body,
  })
})

module.exports = router;