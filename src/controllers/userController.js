/* eslint-disable no-console */
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Product = require('../models/Product');

const userController = {
  // eslint-disable-next-line consistent-return
  dashboard: (req, res) => {
    if (req.session.user) {
      Product.getAllByUserId(req.session.user.id)
        .then((props) => {
          const userProperties = props;
          return res.render('users/dashboard', { userProperties });
        })
        .catch((err) => console.error(err));
    } else {
      return res.redirect('/users/login');
    }
  },

  registerForm: (req, res) => res.render('users/register'),

  loginForm: (req, res) => res.render('users/login'),

  register: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.errors = errors.mapped();
    }
    if (res.locals.errors) {
      return res.render('users/register', { errors: errors.mapped(), oldData: req.body });
    }
    const user = {
      user: req.body.user,
      email: req.body.email,
      category: req.body.category,
      password: bcryptjs.hashSync(String(req.body.password), 10),
      image: 'default.jpg',
    };

    if (req.file) {
      Object.defineProperty(user, 'image', {
        value: req.file.filename,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    }

    User.create(user);
    return res.redirect('/users/login');
  },

  login: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('users/login', { errors: errors.mapped(), oldData: req.body });
    }

    const user = User.findByField('email', req.body.email);
    delete user.password;
    req.session.user = user;

    if (req.body.remember_login === 'on') {
      res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 60 });
    }
    return res.redirect('/');
  },

  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy((err) => console.log(err));
    return res.redirect('/');
  },

  info: (req, res) => res.render('users/info'),

  viajero: (req, res) => res.render('users/viajero'),
};

module.exports = userController;
