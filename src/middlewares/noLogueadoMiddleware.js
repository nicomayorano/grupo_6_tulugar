function noLogueadoMiddleware(req, res, next) {
  if (!req.session.usuarioLogueado) {
    return res.redirect('login');
  }
  next();
}

module.exports = noLogueadoMiddleware;
