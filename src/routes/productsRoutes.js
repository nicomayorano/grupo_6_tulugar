const { Router } = require('express');
const multer = require('../middlewares/multerProducts');
const productController = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation');
const noLogueadoMiddlewareP = require('../middlewares/noLogueadoMiddlewareP');

const productRouter = new Router();

productRouter.get('/', productController.index);
productRouter.get('/search', noLogueadoMiddlewareP, productController.search);
productRouter.get('/new', noLogueadoMiddlewareP, productController.newForm);
productRouter.get('/:id', noLogueadoMiddlewareP, productController.detail);
productRouter.post('/', multer.array('image', 6), productValidation, productController.new);
productRouter.get('/cart/:id', productController.cart);
productRouter.get('/:id/edit', productController.editForm);
productRouter.put('/:id', multer.array('image', 6), productValidation, productController.edit);
productRouter.delete('/:id', productController.delete);

module.exports = productRouter;
