const { Router } = require('express');
const userController = require('../controllers/users');
const multer = require('../middlewares/multer');
const loginValidation = require('../middlewares/loginValidation');
const registerValidation = require('../middlewares/registerValidation');
const imageValidation = require('../middlewares/imageValidation');
const authRequired = require('../middlewares/authRequired');
const onlyGuests = require('../middlewares/onlyGuests');

const userRouter = new Router();

userRouter.get('/', userController.dashboard);
userRouter.get('/login', onlyGuests, userController.loginForm);
userRouter.get('/register', onlyGuests, userController.registerForm);
userRouter.get('/edit', authRequired, userController.editForm);
userRouter.get('/logout', authRequired, userController.logout);
userRouter.get('/detail', userController.detail);
userRouter.get('/info', userController.info);
userRouter.get('/traveler', userController.traveler);
userRouter.post('/login', loginValidation, userController.login);
userRouter.post('/register', multer('usersImages', { size: 2_000_000, files: 1 }), registerValidation, imageValidation, userController.register);
userRouter.patch('/edit', userController.edit);

module.exports = userRouter;
