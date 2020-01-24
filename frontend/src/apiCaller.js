import * as config from "./config";

export const getAllTasks = () => {
  return fetch(config.url + config.getTasks)
    .then(res => res.json())
};

export const addTask = (task) => {
  return fetch(config.url + config.getTasks, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then(res => res.json())
};

export const editItem = (id, update) => {
  return fetch(config.url + config.getTasks + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
  })
    .then(res => res.json())
};

export const removeTask = (id) => {
  return fetch(config.url + config.getTasks + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
};
