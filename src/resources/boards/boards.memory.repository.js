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

module.exports = { getAll, get, create };
