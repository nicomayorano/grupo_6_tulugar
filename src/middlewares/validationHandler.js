/* eslint-disable no-prototype-builtins */
const { MulterError } = require('multer');
const { validationResult } = require('express-validator');

const validationHandler = (err, req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.locals.errors = errors.mapped();
  }
  if (err instanceof MulterError) {
    if (!res.locals.hasOwnProperty('errors')) res.locals.errors = {};
    Object.defineProperty(res.locals.errors, 'image', {
      value: {},
      writable: true,
      enumerable: true,
      configurable: true,
    });
    if (String(err.code) === 'LIMIT_FILE_SIZE') {
      Object.defineProperty(res.locals.errors.image, 'msg1', {
        value: 'El peso de una imágen excede el máximo',
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
  }
  if (err.message === 'FORBIDDEN_FILE_EXT') {
    if (!Object.hasOwn(res.locals, 'errors')) res.locals.errors = {};
    if (!Object.hasOwn(res.locals.errors, 'image')) res.locals.errors.image = {};
    Object.defineProperty(res.locals.errors.image, 'msg2', {
      value: 'Extensión de archivo no permitida',
      writable: true,
      enumerable: true,
      configurable: true,
    });
  }
  next();
};

module.exports = validationHandler;
