const userController = {
  dashboard: (req, res) => {
    res.render('users/dashboard.ejs');
  },
  registerForm: (req, res) => {
    res.render('users/register.ejs');
  },
  loginForm: (req, res) => {
    res.render('users/login.ejs');
  },
  register: (req, res) => {
    res.render('users/register.ejs'); // TO DO
  },
  login: (req, res) => {
    res.render('users/login.ejs'); // TO DO
  },
  info: (req, res) => {
    res.render('users/info.ejs'); 
  },
};

module.exports = userController;
