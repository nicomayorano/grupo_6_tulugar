const { Router } = require('express');
const adminController = require('../controllers/adminController');

const adminRouter = new Router();

adminRouter.post('/', adminController.index);

adminRouter.get('/edit/:id', adminController.editForm);
adminRouter.put('/edit/:id', adminController.edit);

adminRouter.get('/new', adminController.newForm);
adminRouter.post('/new', adminController.new);

module.exports = adminRouter;
