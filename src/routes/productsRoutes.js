const { Router } = require('express');
const multerMiddleware = require('../middlewares/multer');
const productController = require('../controllers/productController');

const productRouter = new Router();

productRouter.get('/', productController.index);
productRouter.get('/search', productController.search);
productRouter.get('/create', productController.newForm);
productRouter.get('/:id', productController.detail);
productRouter.post('/', multerMiddleware.array('profile-files', 6), productController.new);
productRouter.get('/cart/:id', productController.carrito);
productRouter.get('/:id/edit', productController.editForm);
productRouter.put('/:id', multerMiddleware.array('profile-files', 6), productController.edit);
productRouter.delete('/:id', productController.delete);

module.exports = productRouter;
