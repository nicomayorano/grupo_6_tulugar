// eslint-disable-next-line consistent-return
const onlyGuests = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  next();
};

module.exports = onlyGuests;
