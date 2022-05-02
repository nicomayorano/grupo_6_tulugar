const helpers = require('./helperFunctions');

const userController = {
  dashboard: (req, res) => {
    const userProperties = helpers.fetchProductsByUserId(1); // Cambia con el login armado
    const { camelCaseToProperCase } = helpers;
    res.render('users/dashboard', { userProperties, camelCaseToProperCase });
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
  info: (req, res) => {
    res.render('users/info.ejs');
  },
};

module.exports = userController;
