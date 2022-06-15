const { Users } = require('../database/index');

const onSession = (req, res, next) => { // REVISAR
  if (!res.locals.isLogged) {
    Users.findAll({ // findOne
      where: {
        email: String(req.cookies.userEmail),
      },
    })
      .then((result) => {
        if (result) {
          const foundUser = result;
          delete foundUser.password; // Ver si se guardan otras cosas para borrar
          req.session.user = result;
        }

        if (req.session.user) {
          res.locals.isLogged = true;
          res.locals.user = req.session.user;
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }

  next();
};

module.exports = onSession;
