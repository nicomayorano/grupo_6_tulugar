const fs = require('fs');
const path = require('path');

const propiedadesFilePath = path.join(__dirname, '../data/products.json');
const propiedades = JSON.parse(fs.readFileSync(propiedadesFilePath, 'utf-8'));

const productController = {
  index: (req, res) => {
    res.render('products/products.ejs');
  },
  detail: (req, res) => {
    let PropiedadId = Number(req.params.id);
    let detallePropiedad = propiedades.find((p) => p.id === PropiedadId);
    res.render('/products/detail', { propiedad: detallePropiedad });
  },
  cart: (req, res) => {
    res.render('products/cart.ejs');
  },
  add: (req, res) => {
    res.render('index.ejs'); // TO DO
  },
};

module.exports = productController;
