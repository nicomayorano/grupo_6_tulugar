const { Router } = require('express');
const dashboardController = require('../../controllers/api/dashboardController');

const dashboardRouter = new Router();

dashboardRouter.get('/', dashboardController.metrics);

module.exports = dashboardRouter;