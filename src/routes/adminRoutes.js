const { Router } = require('express');
const adminController = require('../controllers/adminController');

const adminRouter = new Router();

adminRouter.post('/', adminController.index);

adminRouter.get('/edit/:id', adminController.editForm);
adminRouter.put('/edit/:id', adminController.edit);

adminRouter.get('/new', adminController.newForm);
adminRouter.post('/new', adminController.new);

adminRouter.get('/edit-form', adminController.editForm);
adminRouter.post('/edit-form', adminController.edit);
module.exports = adminRouter;
