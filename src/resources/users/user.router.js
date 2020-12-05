const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const errors = require('../../errors/errors.handlers');

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
    const user = await usersService.create({ name, login, password });

    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  errors.asyncWrapper(async (req, res) => {
    const { name, login, password } = req.body;
    const user = await usersService.update(req.params.id, {
      name,
      login,
      password
    });

    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  errors.asyncWrapper(async (req, res) => {
    await usersService.deleteUser(req.params.id);
    // add delete task

    res.sendStatus(204);
  })
);

module.exports = router;
