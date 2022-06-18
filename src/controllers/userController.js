/* eslint-disable consistent-return */
/* eslint-disable no-console */
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const { Users } = require('../database/index');
const { Products } = require('../database/index');

const userController = {
  dashboard: (req, res) => {
    if (req.session.user) {
      res.render('users/dashboard', { userProperties: props });
     /*  Products.findAll({
        include: [{
          association: 'Users',
          where: {
            id: Number(req.session.user.id),
          },
        }],
      } )
        .then((props) => res.render('users/dashboard', { userProperties: props }))
        .catch((error) => console.error(error));*/
    } else {
      return res.redirect('/users/login');
    }
  },

  registerForm: (req, res) => res.render('users/register'),

  loginForm: (req, res) => res.render('users/login'),

  register: (req, res) => {
   /*  const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.locals.errors = errors.mapped();
    }

    if (res.locals.errors) {
      return res.render('users/register', { errors: errors.mapped(), oldData: req.body });
    } */

    Users.create({
      username: req.body.user,
      email: req.body.email,
      password: bcryptjs.hashSync(String(req.body.password), 10),
      type: req.body.type,
      avatar: req.file?.filename,
    })
      .then(() => res.redirect('/users/login'))
      .catch((error) => console.error(error));
  },

  login: async(req, res) => {

    
    
    //await Promise.all(validations.map(validation => validation.run(req)));
     //const errors = await new Promise(resolve => {resolve(validationResult(req))});
     //let errors;
     try{
     const errors= await validationResult(req);
     console.log("errors" +errors);
     if (!errors.isEmpty()) {
      return res.render('users/login', { errors: errors.mapped(), oldData: req.body });
    }
      }catch(ex){
        console.log("ex" +ex);
      }
    
   
 
    let user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    req.session.usuario=user;  

    console.log("User usando await: " + user );
    let found= false;
    Users.findOne({
      where: {
        email: req.body.email,
      },
    }).then((result) => {

        //const user = result;
        //console.log(result);
        user=result.dataValues;

        console.log("adentro" + user);
        req.session.usuario=user;  
        //delete user.password;
        //console.log(user);
        found=true;
        //console.log(user.dataValues);
        //req.session.usuario12 = {name
        //:"hola"};
      });
      //.catch((error) => console.error(error));
      console.log("afuera" + user);
      if(found) req.session.usuario=user;    
      console.log("login");
      console.dir(req.session);
    

      
    //res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 60 });
     if (req.body.remember_login === 'on') {
      res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 60 });
    } 

    return res.redirect('/');
  },

  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy((err) => console.log(err));
    return res.redirect('/');
  },

  info: (req, res) => res.render('users/info'),

  viajero: (req, res) => res.render('users/viajero'),
};

module.exports = userController;
