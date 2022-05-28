/* eslint-disable no-prototype-builtins */
const { MulterError } = require('multer');

const imageValidation = (err, req, res, next) => {
  if (err instanceof MulterError) {
    if (!Object.hasOwn(res.locals, 'errors')) res.locals.errors = {};

    Object.assign(res.locals.errors, { image: {} });

    if (String(err.code) === 'LIMIT_FILE_SIZE') {
      Object.assign(res.locals.errors.image, { msg1: 'El peso de la imagen excede el máximo' });
    }
  }
  if (err.message === 'FORBIDDEN_FILE_EXT') {
    if (!Object.hasOwn(res.locals, 'errors')) res.locals.errors = {};
    if (!Object.hasOwn(res.locals.errors, 'image')) res.locals.errors.image = {};
    Object.assign(res.locals.errors.image, { msg2: 'Extensión de archivo no permitida' });
  }
  next();
};

module.exports = imageValidation;
