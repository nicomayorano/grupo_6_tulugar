// eslint-disable-next-line consistent-return
const authRequired = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/users/login');
  }
  next();
};

module.exports = authRequired;
