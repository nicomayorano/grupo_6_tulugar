/* eslint-disable no-console */
const bcryptjs = require('bcryptjs');
const { Admins } = require('../database/index');

const adminController = {
  login: (req, res) => res.render('admin/admin'),

  auth: (req, res) => {
    Admins.findOne({
      where: {
        name: String(req.body.name),
      },
    })
      .then((admin) => {
        if (admin && bcryptjs.compareSync(req.body.password, admin.get({ plain: true }).password)) {
          res.redirect('http://localhost:3001');
        } else {
          res.render('admin/admin', { error: 'Credenciales incorrectas' });
        }
      })
      .catch((error) => console.error(error));
  },
};

module.exports = adminController;
