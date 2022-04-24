const { Router } = require('express');
const propiedadController = require('../controllers/propiedadController');
const path = require('path');
var multer  = require('multer');

let pathImgs =path.resolve(__dirname, '../public/images');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathImgs);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

const propiedadRouter = new Router();



propiedadRouter.route('/propiedad')
     .get(propiedadController.get)
     .post(upload.array('profile-files'), propiedadController.post);

module.exports = propiedadRouter;