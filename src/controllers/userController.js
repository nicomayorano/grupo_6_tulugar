/* eslint-disable consistent-return */
/* eslint-disable no-console */
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const { Users } = require('../database/index');
const { Products } = require('../database/index');

const userController = {
  dashboard: (req, res) => {
    if (req.session.user) {
      res.render('users/dashboard', { userProperties: props });
      /*  Products.findAll({
         include: [{
           association: 'Users',
           where: {
             id: Number(req.session.user.id),
           },
         }],
       } )
         .then((props) => res.render('users/dashboard', { userProperties: props }))
         .catch((error) => console.error(error));*/
    } else {
      return res.redirect('/users/login');
    }
  },

  registerForm: (req, res) => res.render('users/register'),

  loginForm: (req, res) => res.render('users/login'),

  register: (req, res) => {
    /*  const errors = validationResult(req);
 
     if (!errors.isEmpty()) {
       res.locals.errors = errors.mapped();
     }
 
     if (res.locals.errors) {
       return res.render('users/register', { errors: errors.mapped(), oldData: req.body });
     } */

    Users.create({
      username: req.body.user,
      email: req.body.email,
      password: bcryptjs.hashSync(String(req.body.password), 10),
      type: req.body.type,
      avatar: req.file?.filename,
    })
      .then(() => res.redirect('/users/login'))
      .catch((error) => console.error(error));
  },

  login: async (req, res) => {

    try {
      const errors = await validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.render('users/login', { errors: errors.mapped(), oldData: req.body });
      }

      let user = await Users.findOne({
        where: {
          email: req.body.email,
        },
      });
      req.session.user = user.dataValues;

      if (req.body.remember_login === 'on') {
        res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 60 });
      }

      return res.redirect('/');


    } catch (ex) {
      
      console.log("ex" + ex);
    }

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
