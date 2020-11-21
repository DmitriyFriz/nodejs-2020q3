const DB = require('../../common/db');
const errors = require('../../errors/errors.list');

const TABLE_NAME = 'boards';

const getAll = async () => DB.getAll(TABLE_NAME);

const get = async id => {
  const board = await DB.get(TABLE_NAME, id);

  if (!board) {
    throw new errors.NOT_FOUND(`The board with id: ${id} not found`);
  }

  return board;
};

const create = async board => DB.create(TABLE_NAME, board);

const update = async (id, board) => {
  const newBoard = await DB.update(TABLE_NAME, id, board);

  if (!newBoard) {
    throw new errors.BAD_REQUEST(`The board with id: ${id} doesn't exist`);
  }

  return newBoard;
};

const deleteBoard = async id => {
  const deletedBoard = await DB.deleteEntity(TABLE_NAME, id);

  if (!deletedBoard) {
    throw new errors.NOT_FOUND(`The board with id: ${id} not found`);
  }
};

module.exports = { getAll, get, create, update, deleteBoard };
