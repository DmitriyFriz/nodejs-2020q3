const boardsRepo = require('./boards.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

const update = (id, board) => boardsRepo.update(id, board);

const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, get, create, update, deleteBoard };
