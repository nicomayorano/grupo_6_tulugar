const { Router } = require('express');
const dashboardController = require('../../controllers/api/dashboardController');

const dashboardRouter = new Router();

dashboardRouter.get('/', dashboardController.metrics);
dashboardRouter.get('/lastProduct', dashboardController.lastRecord);
module.exports = dashboardRouter;