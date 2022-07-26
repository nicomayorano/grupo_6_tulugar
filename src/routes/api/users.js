const { Router } = require('express');
const usersController = require('../../controllers/api/users');

const usersRouter = new Router();

usersRouter.get('/', usersController.list);
usersRouter.get('/:id', usersController.detail);

module.exports = usersRouter;
