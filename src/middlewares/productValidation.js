const { body } = require('express-validator');

const validations = [
  body('type')
    .notEmpty()
    .withMessage('Seleccione un tipo de propiedad'),
  body('max_guests')
    .custom((val) => {
      if (Number(val) < 1 || Number(val) > 15) {
        throw new Error('Seleccione entre 1 y 15 huéspedes');
      }
      return true;
    }),
  body('price')
    .custom((val) => {
      if (Number(val) <= 0) {
        throw new Error('El precio debe ser mayor a 0');
      }
      return true;
    }),
  body('description')
    .notEmpty()
    .withMessage('Proporcione una descripción del inmueble'),
  body('province')
    .notEmpty()
    .withMessage('Seleccione una provincia'),
  body('city')
    .notEmpty()
    .withMessage('Introduzca una ciudad'),
  body('address')
    .notEmpty()
    .withMessage('Introduzca una dirección'),
];

module.exports = validations;
