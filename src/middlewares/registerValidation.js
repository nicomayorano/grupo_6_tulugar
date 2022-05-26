/* eslint-disable no-undef */
const { body } = require('express-validator');
const User = require('../models/User');

const registerValidation = [
  body('user')
    .notEmpty()
    .withMessage('Se requiere nombre de usuario')
    .bail()
    .isLength({ min: 4, max: 12 })
    .isAlphanumeric('es-ES')
    .withMessage('Debe contener entre 4 y 12 caracteres alfanuméricos')
    .bail()
    .custom((user) => {
      const found = User.findByField('user', user);
      if (found) return true;
      throw new Error('Ya existe un usuario con ese nombre');
    }),
  body('email')
    .notEmpty()
    .withMessage('Se requiere un correo electronico')
    .bail()
    .isEmail()
    .withMessage('Debe ser un correo electrónico válido')
    .bail()
    .custom((email) => {
      const found = User.findByField('email', email);
      if (found) return true;
      throw new Error('Ya existe un usuario con ese e-mail');
    }),
  body('password')
    .notEmpty()
    .withMessage('Se requiere una contraseña')
    .isStrongPassword()
    .withMessage('Debe contener al menos: 8 caracteres, una minúscula, una mayúscula, un número y un símbolo'),
  body('Repeatpassword')
    .notEmpty()
    .withMessage('Debe repetir la contraseña')
    .custom((password, { req }) => {
      if (password !== req.body.password) throw new Error('Las contraseñas no coinciden');
      return true;
    }),
  body('category')
    .notEmpty()
    .withMessage('Debe seleccionar una categoría'),
  body('adult')
    .custom((checkbox, { req }) => {
      if (String(req.body.adult) !== 'on') throw new Error('Debe ser mayor de edad para registrarse');
      return true;
    }),
];

module.exports = registerValidation;
