const { Router } = require('express');
const userController = require('../controllers/userController');
const uploadFile = require('../middlewares/multerUsers')

const userRouter = new Router();

userRouter.get('/', userController.dashboard);
userRouter.get('/register', userController.registerForm);
userRouter.get('/login', userController.loginForm);
//userRouter.get('/logout', userController.logout);
//userRouter.get('/info', userController.info);
userRouter.post('/login', userController.login);
userRouter.post('/register', uploadFile.single('imagenDePerfil'), userController.register);

module.exports = userRouter;
