/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
// ------------destructuring
// const {index, hostMenu}= require ( "../controllers/mainController")
// router.get("/", index)
// router.get ("/hostMenu",hostMenu)

// -----------------no destructuring
router.get('/', mainController.index);
router.get('/hostMenu', mainController.hostMenu);
router.get('/productCar', mainController.productCar);
router.get('/productDetail', mainController.productDetail);
router.get('/submitProduct', mainController.submitProduct);
router.get('/register', mainController.register);
router.get('/login', mainController.login);

module.exports = router;
