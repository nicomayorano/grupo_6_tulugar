const { Router } = require('express');
const mainController = require('../controllers/mainController');

const mainRouter = new Router();

mainRouter.get('/', mainController.index);

module.exports = mainRouter;
