const { Router } = require('express');
const mainController = require('../controllers/main');

const mainRouter = new Router();

mainRouter.get('/', mainController.index);

module.exports = mainRouter;
