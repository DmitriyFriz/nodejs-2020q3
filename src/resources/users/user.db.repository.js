const User = require('./user.model');
const errors = require('../../common/errors/errors.list');

const getAll = async () => User.find();

const get = async id => {
  const user = await User.findById(id);

  console.log(user);

  if (!user) {
    throw new errors.NOT_FOUND(`The user with id: ${id} not found`);
  }

  return user;
};

const create = async user => User.create(user);

const update = async (id, user) => {
  const newUser = await User.findByIdAndUpdate(id, user, { new: true });

  if (!newUser) {
    throw new errors.BAD_REQUEST(`The user with id: ${id} doesn't exist`);
  }

  return newUser;
};

const deleteUser = async id => {
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw new errors.NOT_FOUND(`The user with id: ${id} not found`);
  }

  // await DB.deleteUserInTasks(id);
};

module.exports = { getAll, get, create, update, deleteUser };
