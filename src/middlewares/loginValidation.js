/* eslint-disable no-console */
const { body } = require('express-validator');
const bcryptjs = require('bcryptjs');
const { Users } = require('../database/index');

const loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Se requiere un correo electronico')
    .bail()

    .custom(async (data) => {
      const found = await Users.findOne({
        where: {
          email: data,
        },
        attributes: ['email'],
      });

      if (!found) throw new Error('E-mail incorrecto');
      return true;
    }),

  body('password')
    .notEmpty()
    .withMessage('Se requiere una contraseña')
    .bail()

    .custom(async (inputPwd, { req }) => {
      const user = await Users.findOne({
        where: {
          email: String(req.body.email),
        },
        attributes: ['password'],
      });

      const auth = await bcryptjs.compare(inputPwd, user.password);
      if (auth) return true;
      throw new Error('Contraseña incorrecta');
    }),
];

module.exports = loginValidation;
