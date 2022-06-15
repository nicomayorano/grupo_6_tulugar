/* eslint-disable no-console */
const { body } = require('express-validator');
const bcryptjs = require('bcryptjs');
const { Users } = require('../database/index');

const loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Se requiere un correo electronico')
    .bail()
    .custom((data) => {
      Users.findOne({
        where: {
          email: data,
        },
      })
        .then((result) => {
          if (result) return true;
          throw new Error('E-mail incorrecto');
        })
        .catch((error) => {
          console.error(error);
        });
    }),
  body('password')
    .notEmpty()
    .withMessage('Se requiere una contraseña')
    .bail()
    .custom((pwd, { req }) => {
      Users.findOne({
        where: {
          email: String(req.body.email),
        },
      })
        .then((result) => {
          if (!result) {
            return true;
          }
          if (bcryptjs.compareSync(pwd, result.password)) return true;
          throw new Error('Contraseña incorrecta');
        })
        .catch((error) => {
          console.error(error);
        });
    }),
];

module.exports = loginValidation;
