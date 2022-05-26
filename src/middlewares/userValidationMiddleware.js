const { body } = require('express-validator');

const userValidations = [
  body('user').notEmpty().withMessage('Se requiere nombre de usuario'),
  body('email').notEmpty().withMessage('Se requiere un correo electronico').bail()
    .isEmail()
    .withMessage('Debe ser un correo valido'),
  body('password').notEmpty().withMessage('Debe ingresar una contraseña'),
  body('Repeatpassword').notEmpty().withMessage('Se requiere repetir la contrasena'),
  body('category').notEmpty().withMessage('Debe seleccionar una opcion'),
];

module.exports = userValidations;
