const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const errors = require('../../errors/errors.handlers');

router.route('/').get(
  errors.asyncWrapper(async (req, res) => {
    res.json(await boardsService.getAll());
  })
);

router.route('/:id').get(
  errors.asyncWrapper(async (req, res) => {
    res.json(await boardsService.get(req.params.id));
  })
);

router.route('/').post(
  errors.asyncWrapper(async (req, res) => {
    const { title, columns } = req.body;
    const board = await boardsService.create(new Board({ title, columns }));

    res.json(board);
  })
);

module.exports = router;
