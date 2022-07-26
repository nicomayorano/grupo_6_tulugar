const { Router } = require('express');
const adminController = require('../controllers/admin');

const adminRouter = new Router();

adminRouter.get('/', adminController.login);
adminRouter.post('/', adminController.auth);

module.exports = adminRouter;
