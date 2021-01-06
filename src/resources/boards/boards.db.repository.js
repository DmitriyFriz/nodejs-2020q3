const Board = require('./board.model');
const errors = require('../../common/errors/errors.list');
const { deleteTasksByBoardId } = require('../tasks/task.db.repository');

const getAll = async () => Board.find();

const get = async id => {
  const board = await Board.findById(id);

  if (!board) {
    throw new errors.NOT_FOUND(`The board with id: ${id} not found`);
  }

  return board;
};

const create = async board => Board.create(board);

const update = async (id, board) => {
  const newBoard = await Board.findByIdAndUpdate(id, board, { new: true });

  if (!newBoard) {
    throw new errors.BAD_REQUEST(`The board with id: ${id} doesn't exist`);
  }

  return newBoard;
};

const deleteBoard = async id => {
  const deletedBoard = await Board.findByIdAndDelete(id);

  if (!deletedBoard) {
    throw new errors.NOT_FOUND(`The board with id: ${id} not found`);
  }

  await deleteTasksByBoardId(id);
};

module.exports = { getAll, get, create, update, deleteBoard };
