const User = require('../models/User');
const Product = require('../models/Product');

//implementaciones para usar desde el controller//
const bcryptjs = require('bcryptjs');

// FIN implementaciones para usar desde el controller//
const userController = {
  dashboard: (req, res) => {
    if (req.session.loggedIn) {
      const { id } = User.getByEmail(req.session.user);
      const userProperties = Product.getAllByUserId(id);
      res.render('users/dashboard', { userProperties });
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
  //  const userNew = {
  //    user: 1,
  //    product: User.getNewId(),
  //    ...req.body,
  //  };
  //  User.add(userNew);
  let emailRegistrado = 
      User.findByCampos('email', req.body.email);
    if(emailRegistrado){
return res.render('users/register');
// Si el email ya esta en uso, remite de nuevo a la pagina de registro
}
   
    let usuarioACrear= {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10),
      Repeatpassword: bcryptjs.hashSync(req.body.Repeatpassword, 10),
      imagenDePerfil: req.file.filename,
    }
    User.create(usuarioACrear);
   return res.redirect('/');
  },
  //lo de arriba GUARDA el registro nuevo, creandole un id, haseha contrasena y guarda la foto de usuario

  login: (req, res) => {
   // const { user, email, pass } = req.body;
   // if (User.authenticate(user, pass)) {
    //  req.session.loggedIn = true;
    //  req.session.user = user;
    //  req.session.email = email;
  //   res.redirect('../users');
  //} else {
let usuarioALoguear = 
User.findByCampos('email', req.body.email);
if(usuarioALoguear){
  let passwordVerific = bcryptjs.compareSync(req.body.password, usuarioALoguear.password);
  if(passwordVerific){
    return res.redirect('/');
  }
  return res.render('users/register');
}

// Filtra el loggin SOLO por Email.
},
  }
  //logout: (req, res) => {
 //   req.session.destroy((err) => console.log(err));
  //  res.redirect('/');
 // },
 // info: (req, res) => {
   // res.render('users/info.ejs');
  //},
//};

module.exports = userController;
