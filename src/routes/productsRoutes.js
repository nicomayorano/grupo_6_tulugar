const { Router } = require('express');
const productController = require('../controllers/productController');

const path = require('path');
var multer  = require('multer');

let pathImgs =path.resolve(__dirname, '../public/productosImg');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathImgs);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage });

const productRouter = new Router();

productRouter.get('/', productController.index);
productRouter.get('/detail/:id', productController.detail);
productRouter.get('/cart', productController.cart);
productRouter.get('/cart/add', productController.add);
//http://localhost:3020/products/propiedad
productRouter.route('/propiedad')
     .get(productController.propiedad) 
     .post(upload.array('profile-files', 3), productController.post);
/* productRouter.get('/propiedad', productController.propiedad);
productRouter.post(upload.array('profile-files', 3), propiedadController.post); */


module.exports = productRouter;
