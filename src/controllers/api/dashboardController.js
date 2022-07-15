/* eslint-disable no-console */
const { Products } = require('../../database/index');

const cardProps = [
    {
      title: 'TOTAL DE PRODUCTOS',
      color: 'primary',
      quantity: 125,
      icon: 'fas fa-home',
    },
    {
      title: 'TOTAL DE USUARIOS',
      color: 'success',
      quantity: 11,
      icon: 'fas fa-user',
    },
    {
      title: 'TOTAL DE CATEGORIAS',
      color: 'warning',
      quantity: 9,
      icon: 'fas fa-clipboard',
    }
  ];


const dashboardController = {
  metrics: (req, res) => {
    res.json(cardProps);
  },
};

module.exports = dashboardController;