const { Router } = require('express');
const adminController = require('../controllers/adminController');

const adminRouter = new Router();

adminRouter.post('/', adminController.index);

module.exports = adminRouter;
