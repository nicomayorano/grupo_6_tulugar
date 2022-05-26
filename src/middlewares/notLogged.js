// eslint-disable-next-line consistent-return
const notLogged = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/users/login');
  }
  next();
};

module.exports = notLogged;
