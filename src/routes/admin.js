const { Router } = require('express');
const adminController = require('../controllers/admin');
//const authRequiredAdmin = require('../middlewares/authRequiredAdmin');
//const onlyAdmin = require('../middlewares/onlyAdmin');

const adminRouter = new Router();

adminRouter.get('/', adminController.loginAdm);
adminRouter.post('/admin', adminController.dashboard);

module.exports = adminRouter;
