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

const update = async (id, user) => DB.update(TABLE_NAME, id, user);

module.exports = { getAll, get, create, update };
