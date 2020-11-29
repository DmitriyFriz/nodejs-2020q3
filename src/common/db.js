const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const DB = {
  users: [],
  boards: [],
  tasks: []
};

const entityClass = {
  users: User,
  boards: Board,
  tasks: Task
};

const getEntityById = async (tableName, id) =>
  DB[tableName].find(item => item.id === id);

const getAll = async tableName => DB[tableName].concat();

const get = async (tableName, id) => {
  const item = await getEntityById(tableName, id);

  if (!item) {
    return undefined;
  }

  return item;
};

const create = async (tableName, entity) => {
  const createdEntity = new entityClass[tableName](entity);
  DB[tableName].push(createdEntity);
  return get(tableName, createdEntity.id);
};

const update = async (tableName, id, entity) => {
  const updateEntity = await getEntityById(tableName, id);

  if (!updateEntity) {
    return undefined;
  }

  updateEntity.toUpdate(entity);

  return updateEntity;
};

const deleteEntity = async (tableName, id) => {
  const deletedEntity = await getEntityById(tableName, id);
  const index = DB[tableName].indexOf(deletedEntity);

  if (index < 0) {
    return undefined;
  }

  return DB[tableName].splice(index, 1);
};

const filterByCondition = async (tableName, callback) => {
  const data = await getAll(tableName);

  return data.filter(callback);
};

const deleteUserInTasks = async id => {
  const tasks = await filterByCondition('tasks', task => task.userId === id);
  tasks.forEach(task => task.toUpdate({ userId: null }));
};

const deleteTasksByBoard = async id => {
  const tasks = await filterByCondition('tasks', task => task.boardId === id);
  tasks.forEach(async task => await deleteEntity('tasks', task.id));
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

DB.tasks.push(new Task({ order: 100 }), new Task());

//

module.exports = {
  getAll,
  get,
  create,
  update,
  deleteEntity,
  filterByCondition,
  deleteUserInTasks,
  deleteTasksByBoard
};
