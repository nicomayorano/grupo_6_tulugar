// eslint-disable-next-line consistent-return
const alreadyLogged = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  next();
};

module.exports = alreadyLogged;
