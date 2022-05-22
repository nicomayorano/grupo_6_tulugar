const { Router } = require('express');
const userController = require('../controllers/userController');
const uploadFile = require('../middlewares/multerUsers');
const logueadoMiddleware = require('../middlewares/logueadoMiddleware');

const userRouter = new Router();

userRouter.get('/', userController.dashboard);
userRouter.get('/register', logueadoMiddleware, userController.registerForm);
userRouter.get('/login', logueadoMiddleware, userController.loginForm);
userRouter.get('/logout', userController.logout);
// userRouter.get('/info', userController.info);
userRouter.post('/login', userController.login);
userRouter.post('/register', uploadFile.single('imagenDePerfil'), userController.register);

module.exports = userRouter;
