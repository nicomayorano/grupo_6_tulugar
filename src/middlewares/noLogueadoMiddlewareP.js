function noLogueadoMiddlewareP(req, res, next) {
    if (!req.session.usuarioLogueado) {
      return res.render('users/login');
    }
    next();
  }
  
  module.exports = noLogueadoMiddlewareP;