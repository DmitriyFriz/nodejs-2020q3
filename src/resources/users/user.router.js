const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const errors = require('../../errors/errors.handlers');
const userService = require('./user.service');

router.route('/').get(
  errors.asyncWrapper(async (req, res) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  errors.asyncWrapper(async (req, res) => {
    const user = await usersService.get(req.params.id);

    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  errors.asyncWrapper(async (req, res) => {
    const { name, login, password } = req.body;
    const user = await usersService.create(new User({ name, login, password }));

    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  errors.asyncWrapper(async (req, res) => {
    const { name, login, password } = req.body;
    const user = await userService.update(req.params.id, {
      name,
      login,
      password
    });

    res.json(User.toResponse(user));
  })
);

module.exports = router;
