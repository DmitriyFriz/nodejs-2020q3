const DB = require('../../common/db');
const errors = require('../../errors/errors.list');

const TABLE_NAME = 'tasks';

const getAll = async boardId =>
  DB.filterByCondition(TABLE_NAME, item => item.boardId === boardId);

const get = async (boardId, taskId) => {
  const task = await DB.get(TABLE_NAME, taskId);

  if (!task) {
    throw new errors.NOT_FOUND(`The task with id: ${taskId} not found`);
  }

  if (task.boardId !== boardId) {
    throw new errors.BAD_REQUEST(
      `The task with id: ${taskId} doesn't apply to the board with id: ${boardId}`
    );
  }

  return task;
};

const create = async task => DB.create(TABLE_NAME, task);

const update = async (boardId, taskId, task) => {
  await get(boardId, taskId);

  const newTask = await DB.update(TABLE_NAME, taskId, task);

  return newTask;
};

const deleteTask = async (boardId, taskId) => {
  await get(boardId, taskId);
  await DB.deleteEntity(TABLE_NAME, taskId);
};

module.exports = { getAll, get, create, update, deleteTask };
