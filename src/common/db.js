const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const DB = {
  users: [],
  boards: [],
  tasks: []
};

const getEntityById = async (tableName, id) =>
  DB[tableName].find(item => item.id === id);

const getAll = async tableName => DB[tableName].concat();

const get = async (tableName, id) => {
  const item = await getEntityById(tableName, id);
  return item ? { ...item } : undefined;
};

const create = async (tableName, entity) => {
  DB[tableName].push(entity);
  return get(tableName, entity.id);
};

const update = async (tableName, id, entity) => {
  const oldEntity = await getEntityById(tableName, id);
  const index = DB[tableName].indexOf(oldEntity);

  if (index < 0) {
    return undefined;
  }

  DB[tableName][index] = { ...oldEntity, ...entity };

  return { ...DB[tableName][index] };
};

const deleteEntity = async (tableName, id) => {
  const deletedEntity = await getEntityById(tableName, id);
  const index = DB[tableName].indexOf(deletedEntity);

  if (index < 0) {
    return undefined;
  }

  return DB[tableName].splice(index, 1);
};

// code below is for the testing
DB.users.push(
  new User(),
  new User(),
  new User({ name: 'b', login: 1, password: 4 })
);

DB.boards.push(
  new Board(),
  new Board({
    title: 'my board',
    columns: [
      {
        order: 100500
      }
    ]
  })
);

//

module.exports = {
  getAll,
  get,
  create,
  update,
  deleteEntity
};
