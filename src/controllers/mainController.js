const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
  index: (req, res) => {
    res.render('index.ejs');
  },
  buscar: (req, res) => {
    const search = req.query.city;
    // eslint-disable-next-line max-len
    const ciudadBuscada = products.filter((p) => p.city.toLowerCase().trim().includes(search.toLowerCase().trim()));
    res.render('products/products-select', { search, ciudadBuscada });
  },
};

module.exports = mainController;
