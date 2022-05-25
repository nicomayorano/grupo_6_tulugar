const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const Product = require('../models/product');

const userController = {
  dashboard: (req, res) => {
    if (req.session.usuarioLogueado) {
      Product.getAllByUserId(req.session.usuarioLogueado.id)
        .then((props) => {
          const userProperties = props;
          return res.render('users/dashboard', { userProperties });
        })
        .catch((err) => console.error(err));
    } else {
      return res.redirect('users/login');
    }
  },
  registerForm: (req, res) => res.render('users/register'),

  loginForm: (req, res) => res.render('users/login'),

  register: (req, res) => {
    const resultValidation = validationResult(req);
    if (!resultValidation.isEmpty()) {
      return res.render('users/register', { errors: resultValidation.mapped(), oldData: req.body });
    }

    const emailRegistrado = User.findByCampos('email', req.body.email);
    if (emailRegistrado) {
      return res.render('users/register');
      // Checkear en las validaciones dando un mensaje al usuario
      // Si el email ya esta en uso, remite de nuevo a la pagina de registro
    }

    const usuarioACrear = {
      usuario: req.body.usuario,
      email: req.body.email,
      categoria: req.body.categoria,
      password: bcryptjs.hashSync(req.body.password, 10),
      imagenDePerfil: '',
    };

    if (req.file) {
      Object.defineProperty(usuarioACrear, 'imagenDePerfil', {
        value: req.file.filename,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    } else {
      Object.defineProperty(usuarioACrear, 'imagenDePerfil', {
        value: 'default.jpg',
        writable: true,
        configurable: true,
        enumerable: true,
      });
    }

    User.create(usuarioACrear);
    return res.render('users/login');
  },
  //  GUARDA el registro nuevo, creandole un id, haseha contrasena y guarda la foto de usuario

  login: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length >= 4) {
      return res.render('users/login', { errors: resultValidation.mapped(), oldData: req.body });
      // Validacion usada para el LOGIN presupone existencia de 4 errores, porque usamos la misma
      // validacion que para el form de Registro, por ende hay varios campos que vienen vacios.
    }
    const usuarioALoguear = User.findByCampos('email', req.body.email);
    const passwordVerific = bcryptjs.compareSync(req.body.password, usuarioALoguear.password);
    if (usuarioALoguear && passwordVerific) {
      delete usuarioALoguear.password;
      req.session.usuarioLogueado = usuarioALoguear;
      return res.redirect('/');
    }
    
    return res.render('users/login', {
      errors: {
        password: {
          msg: 'La contraseña es invalida',
        },
      },
      oldData: req.body,
    });
  },

  logout: (req, res) => {
    req.session.destroy((err) => console.log(err));
    return res.redirect('/');
  },
  info: (req, res) => res.render('users/info'),
  viajero: (req, res) => res.render('users/viajero'),
};

module.exports = userController;
