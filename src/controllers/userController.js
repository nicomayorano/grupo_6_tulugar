/* eslint-disable consistent-return */
/* eslint-disable no-console */

const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const { Users } = require('../database/index');
const { Products } = require('../database/index');

const userController = {
  dashboard: (req, res) => {
    if (req.session.user) {
      Products.findAll({
        where: {
          user_id: Number(req.session.user.id),
        },
        attributes: ['type', 'city', 'province', 'id'],
        include: [{
          association: 'Images',
          attributes: { exclude: ['product_id', 'updated_at'] },
        }],
      })
        .then((props) => {
          res.render('users/dashboard', { userProperties: props.dataValues });
        })
        .catch((error) => console.error(error));
    } else {
      return res.redirect('/users/login');
    }
  },

  registerForm: (req, res) => res.render('users/register'),

  loginForm: (req, res) => res.render('users/login'),

  register: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.locals.errors = errors.mapped();
    }

    if (res.locals.errors) {
      return res.render('users/register', { errors: errors.mapped(), oldData: req.body });
    }

    Users.create({
      username: req.body.username,
      email: req.body.email,
      password: await bcryptjs.hash(String(req.body.password), 10),
      type: req.body.type,
      avatar: req.file?.filename,
    })
      .then(() => res.redirect('/users/login'))
      .catch((error) => console.error(error));
  },

  login: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('users/login', { errors: errors.mapped(), oldData: req.body });
    }

    Users.findOne({
      where: {
        email: String(req.body.email),
      },
      attributes: { exclude: ['password', 'created_at', 'updated_at'] },
    })
      .then((result) => {
        req.session.user = result.dataValues;

        if (req.body.remember_login === 'on') {
          res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 60 });
        }

        return res.redirect('/');
      })
      .catch((error) => console.error(error));
  },

  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy(() => {});
    return res.redirect('/');
  },

  info: (req, res) => res.render('users/info'),

  viajero: (req, res) => res.render('users/viajero'),
};

module.exports = userController;
