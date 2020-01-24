const assert = require('assert');

exports.insertTask = (db, task, collection, cb) => {
  const coll = db.collection(collection);
  return coll.insertOne(task);
};

exports.findTasks = (db, collection, cb) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray();
};

exports.removeTask = (db, task, collection, cb) => {
  const coll = db.collection(collection);
  return coll.deleteOne(task);
};

exports.updateTask = (filter, db, update, collection, cb) => {
  const coll = db.collection(collection);
  return coll.updateOne(filter, { $set: update }, null);
};
