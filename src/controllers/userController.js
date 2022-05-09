const helpers = require('./helperFunctions');
const user = require('../models/user');

const userController = {
  dashboard: (req, res) => {
    if(req.session.loggedIn){
    let id= user.getIdByUser(req.session.user);
    const userProperties = helpers.fetchProductsByUserId(id); // Cambia con el login armado
    const { camelCaseToProperCase } = helpers;
    res.render('users/dashboard', { userProperties, camelCaseToProperCase });
    }else{
      res.redirect('users/login');
    }
  },
  registerForm: (req, res) => {
    res.render('users/register');
  },
  loginForm: (req, res) => {
    console.log(req.session.user);
    res.render('users/login');
  },
  //aranca register----------------------------------//
  register: (req, res) => {
    console.log(req.body);
    const userNew = {
      user: 1,
      product: helpers.getNewUserId(),
      //image0: req.files[0].filename,
      //image1: req.files[1].filename,
      //image2: req.files[2].filename,
      ...req.body,
    };
    helpers.addUser(userNew);
    res.render('users/login'); // TO DO
  },
  //termina register-----------------------------//
  login: (req, res) => {
    //console.log(req.body.user)
    //console.log(req.body.pass)
    let username=req.body.user;
    let pass=req.body.pass;

    if(user.verifyUser(username,pass)){
      req.session.loggedIn=true;
      req.session.user=username;      
      console.log(req.session);
      res.redirect('../users');
    }else{
      res.render('users/login');
    }
    //res.render('users/login'); // TO DO
  },
  logout:(req,res)=>{
    req.session.destroy((err)=>{console.log(err)});
    res.redirect('/');
  },
  info: (req, res) => {
    res.render('users/info.ejs');
  },
};

module.exports = userController;
