const { Router } = require('express');
const multer = require('../middlewares/multerProducts');
const productController = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation');
const validationHandler = require('../middlewares/validationHandler');
const noLogueadoMiddlewareP = require('../middlewares/noLogueadoMiddlewareP');

const productRouter = new Router();

productRouter.get('/', productController.index);
productRouter.get('/search', noLogueadoMiddlewareP, productController.search);
productRouter.get('/new', noLogueadoMiddlewareP, productController.newForm);
productRouter.get('/:id', noLogueadoMiddlewareP, productController.detail);
productRouter.post('/', multer, productValidation, validationHandler, productController.new);
productRouter.get('/cart/:id', productController.cart);
productRouter.get('/:id/edit', productController.editForm);
productRouter.put('/:id', multer, productValidation, validationHandler, productController.edit);
productRouter.delete('/:id', productController.delete);

module.exports = productRouter;
