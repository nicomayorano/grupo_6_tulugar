const User = require('../models/User');
const Product = require('../models/Product');

//implementaciones para usar desde el controller//
//const bcryptjs = require('bcryptjs');

// FIN implementaciones para usar desde el controller//
const userController = {
  dashboard: (req, res) => {
    if (req.session.loggedIn) {
      const { id } = User.getByEmail(req.session.user);
      const userProperties = Product.getAllByUserId(id);
      res.render('users/dashboard', { userProperties });
    } else {
      res.redirect('users/login');
    }
  },
  registerForm: (req, res) => {
    res.render('users/register');
  },
  loginForm: (req, res) => {
    res.render('users/login');
  },
  register: (req, res) => {
  //  const userNew = {
  //    user: 1,
  //    product: User.getNewId(),
  //    ...req.body,
  //  };
  //  User.add(userNew);
    let usuarioACrear= {
      ...req.body,
     // password: bcryptjs.hashSync(req.body.password, 10),
      imagenDePerfil: req.file.filename,
    }
    User.create(usuarioACrear);
   return res.redirect('/');
  },
  login: (req, res) => {
    const { user, email, pass } = req.body;
    if (User.authenticate(user, pass)) {
      req.session.loggedIn = true;
      req.session.user = user;
      req.session.email = email;
      res.redirect('../users');
    } else {
      res.render('users/login');
    }
  },
  logout: (req, res) => {
    req.session.destroy((err) => console.log(err));
    res.redirect('/');
  },
  info: (req, res) => {
    res.render('users/info.ejs');
  },
};

module.exports = userController;
