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
  const oldUser = await get(tableName, id);
  const index = DB[tableName].indexOf(oldUser);

  if (index < 0) {
    return undefined;
  }

  DB[tableName][index] = { ...oldUser, ...user };

  return DB[tableName][index];
};

const deleteItem = async (tableName, id) => {
  const deletedUser = await get(tableName, id);
  const index = DB[tableName].indexOf(deletedUser);

  if (index < 0) {
    return undefined;
  }

  return DB[tableName].splice(index, 1);
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
  update,
  deleteItem
};
