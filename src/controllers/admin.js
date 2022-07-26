/* eslint-disable consistent-return */
/* eslint-disable no-console */

//const { validationResult } = require('express-validator');
// const { admin } = require('../database/models/Admin');

const adminController = {

  loginAdm: (req, res) => res.render('admin/admin'),

  dashboard: (req, res) => res.redirect('http://localhost:3001/')
};

module.exports = adminController;
