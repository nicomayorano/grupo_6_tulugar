const express = require('express');

const router = express.Router();
//const apiUsers = require('../../controllers/api/apiUsers');

// Listado de todos los usuarios desde APi
//router.get('/', apiUsers.list);
// Detalle del Usuario desde api
//router.get('/:id', apiUsers.detail);

//module.exports = router;

const { Router } = require('express');
const usersController = require('../../controllers/api/users');

const usersRouter = new Router();

usersRouter.get('/', usersController.list);
usersRouter.get('/:id', usersController.detail);

module.exports = usersRouter;