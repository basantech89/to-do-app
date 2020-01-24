const express = require('express');
const bodyParse = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

const tasksRouter = express.Router();
tasksRouter.use(bodyParse.json());
const taskOperations = require('../operations');
const { getDb } = require('../db');
const collection = 'tasks';

let db;
getDb().then(dataabse => db = dataabse);

const getDB = async () => await getDb();

tasksRouter.route('/')
  .get((req, res, next) => {
    taskOperations.findTasks(db, collection)
      .then((tasks) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tasks);
      }, err => next(err))
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    taskOperations.insertTask(db, req.body, collection)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      }, err => next(err))
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('Forbidden');
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end('Forbidden');
  });

tasksRouter.route('/:taskId')
  .get((req, res) => {
    res.statusCode = 403;
    res.end('Forbidden');
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end('Forbidden');
  })
  .put((req, res, next) => {
    taskOperations.updateTask({ _id: ObjectID(req.params.taskId) }, db, req.body, collection)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      }, err => next(err))
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    console.log('id is ', req.params.taskId);
    taskOperations.removeTask(db, { _id: ObjectID(req.params.taskId) }, collection)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      }, err => next(err))
      .catch(err => next(err));
  });

module.exports = tasksRouter;