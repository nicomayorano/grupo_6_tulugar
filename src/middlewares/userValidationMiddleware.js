const { body } = require('express-validator');

const userValidations = [
  body('usuario').notEmpty().withMessage('Se requiere nombre de usuario'),
  body('email').notEmpty().withMessage('Se requiere un correo electronico').bail()
    .isEmail()
    .withMessage('Debe ser un correo valido'),
  body('password').notEmpty().withMessage('Se requiere una contrasena'),
  body('Repeatpassword').notEmpty().withMessage('Se requiere repetir la contrasena'),
  body('categoria').notEmpty().withMessage('Debe seleccionar una opcion'),
  body('edad').notEmpty().withMessage('Campo requerido'),
  body('imagenDePerfil').notEmpty().withMessage('Campo requerido'),
];

module.exports = userValidations;
