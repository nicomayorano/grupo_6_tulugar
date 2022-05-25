const { Router } = require('express');
const userController = require('../controllers/userController');
const uploadFile = require('../middlewares/multerUsers');
const logueadoMiddleware = require('../middlewares/logueadoMiddleware');
const userValidationMiddleware = require('../middlewares/userValidationMiddleware');
const noLogueadoMiddleware = require('../middlewares/noLogueadoMiddleware');

const userRouter = new Router();

userRouter.get('/', userController.dashboard);
userRouter.get('/register', logueadoMiddleware, userController.registerForm);
userRouter.get('/login', logueadoMiddleware, userController.loginForm);
userRouter.get('/logout', userController.logout);
userRouter.get('/info', noLogueadoMiddleware, userController.info);
userRouter.post('/login', userValidationMiddleware, userController.login);
userRouter.post('/register', uploadFile.single('imagenDePerfil'), userValidationMiddleware, userController.register);

module.exports = userRouter;
