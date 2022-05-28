const { Router } = require('express');
const userController = require('../controllers/userController');
const multer = require('../middlewares/multer');
const alreadyLogged = require('../middlewares/alreadyLogged');
const loginValidation = require('../middlewares/loginValidation');
const registerValidation = require('../middlewares/registerValidation');
const imageValidation = require('../middlewares/imageValidation');

const userRouter = new Router();

userRouter.get('/', userController.dashboard);
userRouter.get('/register', alreadyLogged, userController.registerForm);
userRouter.get('/login', alreadyLogged, userController.loginForm);
userRouter.get('/logout', userController.logout);
userRouter.get('/info', userController.info);
userRouter.get('/viajero', userController.viajero);
userRouter.post('/login', loginValidation, userController.login);
userRouter.post('/register', multer('usersImages', { size: 2_000_000, files: 1 }), registerValidation, imageValidation, userController.register);

module.exports = userRouter;
