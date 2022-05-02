const { Router } = require('express');
const multerMiddleware = require('../middlewares/multer');
const productController = require('../controllers/productController');

const productRouter = new Router();

productRouter.get('/', multerMiddleware.array('profile-files', 3), productController.index);
productRouter.get('/search', productController.search);
// productRouter.get('/detail', productController.detailGo);
productRouter.get('/create', productController.newForm);
productRouter.get('/:id', productController.detail);
productRouter.post('/', multerMiddleware.array('profile-files', 3), productController.new);
productRouter.get('/:id/edit', productController.editForm);
productRouter.put('/:id', productController.edit);
productRouter.delete('/:id', productController.delete);

module.exports = productRouter;
