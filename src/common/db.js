const User = require('../resources/users/user.model');

const DB = {
  users: [],
  boards: [],
  tasks: []
};

const getAll = async tableName => DB[tableName].concat();

const get = async (tableName, id) => DB[tableName].find(item => item.id === id);

const create = async (tableName, entity) => {
  DB[tableName].push(entity);
  return get(tableName, entity.id);
};

const update = async (tableName, id, user) => {
  console.log(id, user);

  return 1;
};

DB.users.push(
  new User(),
  new User(),
  new User({ name: 'b', login: 1, password: 4 })
);

module.exports = {
  getAll,
  get,
  create,
  update
};
