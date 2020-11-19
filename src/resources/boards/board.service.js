const boardsRepo = require('./boards.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

module.exports = { getAll, get, create };
