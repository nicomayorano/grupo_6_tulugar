const helpers = require('./helperFunctions');

const userController = {
  dashboard: (req, res) => {
    const userProperties = helpers.fetchProductsByUserId(1); // Cambia con el login armado
    res.render('users/dashboard', { userProperties });
  },
  registerForm: (req, res) => {
    res.render('users/register');
  },
  loginForm: (req, res) => {
    res.render('users/login');
  },
  register: (req, res) => {
    res.render('users/register'); // TO DO
  },
  login: (req, res) => {
    res.render('users/login'); // TO DO
  },
};

module.exports = userController;
