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
      });
      if (found) return Promise.resolve(true);
      return Promise.reject('E-mail incorrecto');
    }),
   body('password')
    .notEmpty()
    .withMessage('Se requiere una contraseña')
    .bail()
    .custom( async (pwd, { req }) => {
      const user= await Users.findOne({
        where: {
          email: String(req.body.email),
        },
      });      
          if (bcryptjs.compareSync(pwd, user.password)) return Promise.resolve(true);
          return Promise.reject('Contraseña incorrecta');
       
        })
       
  
];

module.exports =  loginValidation;
