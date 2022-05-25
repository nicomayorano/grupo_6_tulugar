const User = require('../models/user');
// necesito la funcionalidad p/ buscar usuario y guardarlo en cookie, si selecciona recordar usuario.

function usuarioEnSessionMiddleware(req, res, next) {
  res.locals.isLogged = false;

  let emailInCookie = req.cookies.userEmail;
  let userInCookie = User.findByCampos('email', emailInCookie);
  if(userInCookie){
    req.session.usuarioLogueado = userInCookie;
  }
  if (req.session.usuarioLogueado) {
    res.locals.isLogged = true;
    res.locals.usuarioLogueado = req.session.usuarioLogueado;
  }

  next();
}

module.exports = usuarioEnSessionMiddleware;
