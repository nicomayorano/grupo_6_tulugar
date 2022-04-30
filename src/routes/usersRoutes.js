const { Router } = require('express');
const userController = require('../controllers/userController');

const userRouter = new Router();

userRouter.get('/', userController.dashboard);
userRouter.get('/register', userController.registerForm);
userRouter.get('/login', userController.loginForm);
userRouter.get('/info', userController.info);
userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);


module.exports = userRouter;
