const { Users } = require('../database/index');

const session = async (req, res, next) => {
  const ongoingSession = req.session.user;
  const hasRememberMeCookie = req.cookies.userEmail;

  if (ongoingSession) {
    res.locals.user = req.session.user;
  }

  if (hasRememberMeCookie && !ongoingSession) {
    const found = await Users.findOne({
      where: {
        email: String(req.cookies.userEmail),
      },
      attributes: { exclude: ['password', 'created_at', 'updated_at'] },
    });
    req.session.user = found.get({ plain: true });
    res.locals.user = found.get({ plain: true });
  }

  next();
};

module.exports = session;
