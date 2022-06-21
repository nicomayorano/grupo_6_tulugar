const { Router } = require('express');
const userController = require('../controllers/userController');
const multer = require('../middlewares/multer');
const loginValidation = require('../middlewares/loginValidation');
const registerValidation = require('../middlewares/registerValidation');
const imageValidation = require('../middlewares/imageValidation');
const authRequired = require('../middlewares/authRequired');
const onlyGuests = require('../middlewares/onlyGuests');

const userRouter = new Router();

userRouter.get('/', userController.dashboard);
userRouter.get('/register', onlyGuests, userController.registerForm);
userRouter.get('/login', onlyGuests, userController.loginForm);
userRouter.get('/logout', authRequired, userController.logout);
userRouter.get('/detail', userController.detail);
userRouter.get('/edit', userController.edit);
userRouter.get('/edit', userController.editForm);
userRouter.get('/info', userController.info);
userRouter.get('/viajero', userController.viajero);
userRouter.post('/login', loginValidation, userController.login);
userRouter.post('/register', multer('usersImages', { size: 2_000_000, files: 1 }), registerValidation, imageValidation, userController.register);

module.exports = userRouter;
