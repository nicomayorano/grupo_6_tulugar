const { body } = require('express-validator');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

const loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Se requiere un correo electronico')
    .bail()
    .custom((email) => {
      const found = User.findByField('email', email);
      if (found) return true;
      throw new Error('E-mail incorrecto');
    }),
  body('password')
    .notEmpty()
    .withMessage('Se requiere una contraseña')
    .custom((pwd, { req }) => {
      const user = User.findByField('email', String(req.body.email));
      if (bcryptjs.compareSync(pwd, user.password)) return true;
      throw new Error('Contraseña incorrecta');
    }),
];

module.exports = loginValidation;
