const { Router } = require('express');
const userController = require('../controllers/userController');
const multer = require('../middlewares/multerUsers');
const alreadyLogged = require('../middlewares/alreadyLogged');
const userValidationMiddleware = require('../middlewares/userValidationMiddleware');
const validationHandler = require('../middlewares/validationHandler');

const userRouter = new Router();

userRouter.get('/', userController.dashboard);
userRouter.get('/register', alreadyLogged, userController.registerForm);
userRouter.get('/login', alreadyLogged, userController.loginForm);
userRouter.get('/logout', userController.logout);
userRouter.get('/info', userController.info);
userRouter.get('/viajero', userController.viajero);
userRouter.post('/login', userValidationMiddleware, userController.login);
userRouter.post('/register', multer, userValidationMiddleware, validationHandler, userController.register);

module.exports = userRouter;
