const { Router } = require('express');
const mainController = require('../controllers/mainController');

const mainRouter = new Router();

mainRouter.get('/', mainController.index);
mainRouter.get('/buscar', mainController.buscar);

module.exports = mainRouter;
