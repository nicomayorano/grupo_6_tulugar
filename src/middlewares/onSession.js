const User = require('../models/User');

const onSession = (req, res, next) => {
  res.locals.isLogged = false;

  const hasCookieUser = User.findByField('email', String(req.cookies.userEmail));

  if (hasCookieUser) {
    req.session.user = hasCookieUser;
  }

  if (req.session.user) {
    res.locals.isLogged = true;
    res.locals.user = req.session.user;
  }

  next();
};

module.exports = onSession;
