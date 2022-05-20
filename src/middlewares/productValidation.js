const { body } = require('express-validator');

const validations = [
  body('type')
    .exists()
    .withMessage('Seleccione un tipo de propiedad'),
  body('max_guests')
    .isEmpty()
    .bail()
    .trim()
    .isInt({ min: 1, max: 15 })
    .withMessage('Seleccione entre 1 y 15 huéspedes'),
  body('price')
    .isEmpty()
    .bail()
    .trim()
    .isDecimal({ decimal_digits: '0,2', min: 1 })
    .withMessage('Introduzca el precio diario del alojamiento. Hasta 2 decimales'),
  body('description')
    .isEmpty()
    .bail()
    .trim()
    .isLength({ min: 20, max: 300 })
    .withMessage('Introduzca una descripción de entre 20 y 300 caracteres'),
  body('province')
    .exists()
    .withMessage('Seleccione una provincia'),
  body('city')
    .isEmpty()
    .trim()
    .withMessage('Introduzca el nombre de la ciudad donde se sitúa el inmueble'),
  body('address')
    .isEmpty()
    .trim()
    .withMessage('Introduzca la dirección del inmueble'),
];

module.exports = validations;
