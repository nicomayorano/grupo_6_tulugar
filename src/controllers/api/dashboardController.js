/* eslint-disable no-console */
const { Products } = require('../../database/index');
const { Users } = require('../../database/index');

const cardProps = [
  {
    title: 'TOTAL DE PRODUCTOS',
    color: 'primary',
    quantity: 0,
    icon: 'fas fa-home',
  },
  {
    title: 'TOTAL DE USUARIOS',
    color: 'success',
    quantity: 0,
    icon: 'fas fa-user',
  },
  {
    title: 'TOTAL DE CATEGORIAS',
    color: 'warning',
    quantity: 7,
    icon: 'fas fa-clipboard',
  }
]; 


const dashboardController = {
  metrics: async(req, res) => {

    let countProducts = await Products.count();
    let countUsers = await Users.count();
    cardProps[0].quantity=countProducts;
    cardProps[1].quantity=countUsers;
    //console.log("Cuenta: " + countProducts + "Users: " + countUsers);
    res.json(cardProps);
  },

  lastRecord:async(req, res) =>{
    const products = await Products.findAll(); 
    res.json(products[products.length-1].dataValues);
  }
};

module.exports = dashboardController;