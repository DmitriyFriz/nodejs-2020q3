const DB = require('../../common/db');
const errors = require('../../errors/errors.list');

const TABLE_NAME = 'users';

const getAll = async () => DB.getAll(TABLE_NAME);

const get = async id => {
  const user = await DB.get(TABLE_NAME, id);

  if (!user) {
    throw new errors.NOT_FOUND(`The user with id: ${id} not found`);
  }

  return user;
};

const create = async user => DB.create(TABLE_NAME, user);

const update = async (id, user) => {
  const newUser = await DB.update(TABLE_NAME, id, user);

  if (!newUser) {
    throw new errors.BAD_REQUEST(`The user with id: ${id} doesn't exist`);
  }

  return newUser;
};

const deleteUser = async id => {
  const deletedUser = await DB.deleteItem(TABLE_NAME, id);

  if (!deletedUser) {
    throw new errors.NOT_FOUND(`The user with id: ${id} not found`);
  }
};

module.exports = { getAll, get, create, update, deleteUser };
