const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const errors = require('../../errors/errors.handlers');

router.route('/').get(
  errors.asyncWrapper(async (req, res) => {
    res.json(await tasksService.getAll(req.params.boardId));
  })
);

router.route('/:taskId').get(
  errors.asyncWrapper(async (req, res) => {
    res.json(await tasksService.get(req.params.boardId, req.params.taskId));
  })
);

router.route('/').post(
  errors.asyncWrapper(async (req, res) => {
    const { title, order, description, userId, boardId, columnId } = req.body;
    const task = await tasksService.create({
      title,
      order,
      description,
      userId,
      boardId: boardId || req.params.boardId,
      columnId
    });
    res.json(task);
  })
);

router.route('/:taskId').put(
  errors.asyncWrapper(async (req, res) => {
    const { title, order, description, userId, boardId, columnId } = req.body;
    const task = await tasksService.update(
      req.params.boardId,
      req.params.taskId,
      {
        title,
        order,
        description,
        userId,
        boardId,
        columnId
      }
    );

    res.json(task);
  })
);

router.route('/:taskId').delete(
  errors.asyncWrapper(async (req, res) => {
    const { boardId, taskId } = req.params;
    await tasksService.deleteTask(boardId, taskId);

    res.sendStatus(204);
  })
);

module.exports = router;
