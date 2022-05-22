const { body } = require('express-validator');

const validations = [
  body('type')
    .isEmpty()
    .withMessage('Seleccione un tipo de propiedad'),
  body('max_guests')
    .custom((val) => {
      if (Number(val) < 1 || Number(val) > 15) {
        return Promise.reject(new Error('Seleccione entre 1 y 15 huéspedes'));
      }
      return Promise.resolve(true);
    }),
  body('price')
    .custom((val) => {
      if (Number(val) <= 0) {
        return Promise.reject(new Error('El precio debe ser mayor a 0'));
      }
      return Promise.resolve(true);
    }),
  body('description')
    .isEmpty()
    .withMessage('Proporcione una descripción del inmueble'),
  body('province')
    .isEmpty()
    .withMessage('Seleccione una provincia'),
  body('city')
    .isEmpty()
    .withMessage('Introduzca una ciudad'),
  body('address')
    .isEmpty()
    .withMessage('Introduzca una dirección'),
];

module.exports = validations;
