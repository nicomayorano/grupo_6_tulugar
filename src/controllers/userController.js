const User = require('../models/User');
const Product = require('../models/Product');

const userController = {
  dashboard: (req, res) => {
    if (req.session.loggedIn) {
      const { id } = User.getByEmail(req.session.user);
      Product.getAllByUserId(id)
        .then((props) => {
          const userProperties = props;
          return res.render('users/dashboard', { userProperties });
        })
        .catch((err) => console.error(err));
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
    const userNew = {
      user: 1,
      product: User.getNewId(),
      ...req.body,
    };
    User.add(userNew);
    res.render('users/login');
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
