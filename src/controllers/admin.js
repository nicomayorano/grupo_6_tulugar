/* eslint-disable no-console */
const { Admins } = require('../database/index');

const adminController = {
  login: (req, res) => res.render('admin/admin'),

  auth: (req, res) => {
    Admins.findOne({
      where: {
        name: String(req.body.name),
      },
    })
      .then((result) => {
        if (result) {
          res.redirect('http://localhost:3001/');
        } else {
          res.render('admin/admin');
        }
      })
      .catch((error) => console.error(error));
  },
};

module.exports = adminController;
