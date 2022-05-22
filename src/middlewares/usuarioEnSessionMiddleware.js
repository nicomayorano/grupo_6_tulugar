function usuarioEnSessionMiddleware(req, res, next) {
  res.locals.isLogged = false;

  if (req.session.usuarioLogueado) {
    res.locals.isLogged = true;
    res.locals.usuarioLogueado = req.session.usuarioLogueado;
  }

  next();
}

module.exports = usuarioEnSessionMiddleware;
