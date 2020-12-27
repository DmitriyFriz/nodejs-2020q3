const Task = require('./task.model');
const errors = require('../../common/errors/errors.list');

const getAll = async boardId => Task.find({ boardId });

const get = async (boardId, taskId) => {
  const task = await Task.findOne({ _id: taskId, boardId });

  if (!task) {
    throw new errors.NOT_FOUND(
      `The task with id: ${taskId} and board id: ${boardId} not found`
    );
  }

  return task;
};

const create = async task => Task.create(task);

const update = async (boardId, taskId, task) => {
  const newTask = await Task.findOneAndUpdate({ _id: taskId, boardId }, task, {
    new: true
  });

  if (!newTask) {
    throw new errors.BAD_REQUEST(
      `The task with id: ${taskId} and board id: ${boardId} doesn't exist`
    );
  }

  return newTask;
};

const deleteTask = async (boardId, taskId) => {
  const deletedTask = await Task.findOneAndDelete({ _id: taskId, boardId });

  console.log(deletedTask);

  if (!deletedTask) {
    throw new errors.NOT_FOUND(
      `The task with id: ${taskId} and board id: ${boardId} not found`
    );
  }
};

module.exports = { getAll, get, create, update, deleteTask };
