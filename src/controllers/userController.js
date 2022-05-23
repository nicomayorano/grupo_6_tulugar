const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Product = require('../models/Product');


const userController = {
  dashboard: (req, res) => {
    if (req.session.usuarioLogueado) {
      Product.getAllByUserId(req.session.usuarioLogueado.id)
        .then((props) => {
          const userProperties = props;
          return res.render('users/dashboard', { userProperties });
        })
        .catch((err) => console.error(err));
    } else {
      res.redirect('users/login');
    }
  },
  registerForm: (req, res) => {
    res.render('users/register');
  },
  loginForm: (req, res) => {
    res.render('users/login');
  },
  register: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render('users/register', { errors: resultValidation.mapped(), oldData: req.body });
    }

    const emailRegistrado = User.findByCampos('email', req.body.email);
    if (emailRegistrado) {
      return res.render('users/register');
      // Si el email ya esta en uso, remite de nuevo a la pagina de registro
    }

    const usuarioACrear = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10),
      Repeatpassword: bcryptjs.hashSync(req.body.Repeatpassword, 10),
      imagenDePerfil: req.file.filename,
    };
    User.create(usuarioACrear);
    return res.render('users/login');
  },
  // lo de arriba GUARDA el registro nuevo, creandole un id, haseha contrasena y guarda la foto de usuario

  login: (req, res) => {

    const usuarioALoguear = User.findByCampos('email', req.body.email);
    if (usuarioALoguear) {
      const passwordVerific = bcryptjs.compareSync(req.body.password, usuarioALoguear.password);
      if (passwordVerific) {
        req.session.usuarioLogueado = usuarioALoguear;
        return res.redirect('/');
      }
      return res.render('users/register');
    }
    // Filtra el loggin SOLO por Email.
  },

  logout: (req, res) => {
    req.session.destroy((err) => console.log(err));
    res.redirect('/');
  },
};
// info: (req, res) => {
// res.render('users/info.ejs');
// },
// };

module.exports = userController;
