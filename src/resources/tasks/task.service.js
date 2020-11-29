const taskRepo = require('./task.memory.repository');

const getAll = boardId => taskRepo.getAll(boardId);

const get = (boardId, taskId) => taskRepo.get(boardId, taskId);

const create = task => taskRepo.create(task);

const update = (boardId, taskId, task) =>
  taskRepo.update(boardId, taskId, task);

const deleteTask = (boardId, taskId) => taskRepo.deleteTask(boardId, taskId);

module.exports = { getAll, get, create, update, deleteTask };
