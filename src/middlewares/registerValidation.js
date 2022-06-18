/* eslint-disable no-console */
/* eslint-disable no-undef */
const { body } = require('express-validator');
const { Users } = require('../database/index');

const registerValidation = [
  body('username')
    .notEmpty()
    .withMessage('Se requiere nombre de usuario')
    .bail()
    .isLength({ min: 4, max: 12 })
    .isAlphanumeric('es-ES')
    .withMessage('Debe contener entre 4 y 12 caracteres alfanuméricos')
    .bail()
    .custom(async (user) => {
      const found = await Users.findOne({
        where: {
          username: user,
        },
        attributes: ['username'],
      });
      if (found) throw new Error('Ya existe un usuario con ese nombre');
      return true;
    }),
  body('email')
    .notEmpty()
    .withMessage('Se requiere un correo electronico')
    .bail()
    .isEmail()
    .withMessage('Debe ser un correo electrónico válido')
    .bail()
    .custom(async (inputEmail) => {
      const found = await Users.findOne({
        where: {
          email: inputEmail,
        },
        attributes: ['email'],
      });
      if (found) throw new Error('Ya existe un usuario con ese e-mail');
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('Se requiere una contraseña')
    .bail()
    .isStrongPassword()
    .withMessage('Debe contener al menos: 8 caracteres, una minúscula, una mayúscula, un número y un símbolo'),
  body('repeat')
    .notEmpty()
    .withMessage('Debe repetir la contraseña')
    .bail()
    .custom((password, { req }) => {
      if (password !== req.body.password) throw new Error('Las contraseñas no coinciden');
      return true;
    }),
  body('type')
    .notEmpty()
    .withMessage('Debe seleccionar una categoría'),
  body('adult')
    .custom((checkbox) => {
      if (!checkbox) throw new Error('Debe ser mayor de edad para registrarte');
      return true;
    }),
];

module.exports = registerValidation;
