/* eslint-disable consistent-return */
/* eslint-disable no-console */

const { validationResult } = require('express-validator');
const { Users } = require('../database/index');
const { Products } = require('../database/index');

const userController = {
  dashboard: async (req, res) => {
    if (req.session.user) {
      const products = await Products.findAll({
        where: {
          user_id: Number(req.session.user.id),
        },
        attributes: ['type', 'city', 'province', 'id'],
        include: [{
          association: 'Images',
          attributes: { exclude: ['product_id', 'updated_at'] },
        }],
      });
      const userProperties = products.map((product) => product.get({ plain: true }));
      res.render('users/dashboard', { userProperties });
    } else {
      return res.redirect('/users/login');
    }
  },

  detail: async (req, res) => {
    const id = req.session?.user?.id;
    if (id) {
      const user = await Users.findByPk(req.session.user.id);
      res.render('users/detail', { user: user.dataValues });
    } else {
      return res.redirect('/users/login');
    }
  },

  info: (req, res) => res.render('users/info'),

  traveler: (req, res) => res.render('users/traveler'),

  registerForm: (req, res) => res.render('users/register'),

  loginForm: (req, res) => res.render('users/login'),

  editForm: (req, res) => {
    Users.findByPk(req.params.id)
      .then((user) => res.render('users/edit', { user: user.get({ plain: true }) }))
      .catch((err) => console.error(err));
  },

  register: (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.locals.errors = errors.mapped();
    }

    if (res.locals.errors) {
      return res.render('users/register', { errors: errors.mapped(), oldData: req.body });
    }

    Users.create({
      ...req.body,
      avatar: req.file?.filename,
    })
      .then(() => res.redirect('/users/login'))
      .catch((error) => console.error(error));
  },

  login: (req, res) => {
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
        req.session.user = result.get({ plain: true });

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

  edit: async (req, res) => {
    console.log(req.params.id);
    Users.update({
      username: req.body.username,
      email: req.body.email,
      type: req.body.type,
      avatar: req.file?.filename,
    }, {
      where: {
        id: Number(req.params.id),
      },
    });
    req.session.user = {
      ...req.body,
      avatar: req.file ? req.file.filename : req.session.user.avatar,
    };
    console.log(req.session.user);
    return res.redirect('/');
  },
};

module.exports = userController;
