// eslint-disable-next-line consistent-return
const alreadyLogged = (req, res, next) => {
  console.log("alreadyLogged: " +req.session.user );
  if (req.session.user) {
    return res.redirect('/');
  }
  next();
};

module.exports = alreadyLogged;
