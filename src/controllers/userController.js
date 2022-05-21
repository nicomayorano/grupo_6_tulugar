const User = require('../models/User');
const Product = require('../models/Product');

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
<<<<<<< HEAD
  
=======
>>>>>>> 52cfb0a21adaa03438b5d597261e1696aeb3bab7
    const userNew = {
      user: 1,
      product: User.getNewId(),
      ...req.body,
    };
<<<<<<< HEAD
    helpers.addUser(userNew);
    res.render('users/login'); // TO DO
    console.log("hola");
=======
    User.add(userNew);
    res.render('users/login');
>>>>>>> 52cfb0a21adaa03438b5d597261e1696aeb3bab7
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
