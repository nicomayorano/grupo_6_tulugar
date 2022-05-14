const helpers = require('../helpers');
const Product = require('../models/product');
const { googleMaps } = require('../../config');

const productController = {
  index: (req, res) => {
    const products = Product.fetchAllFromJson();
    res.render('products/products', { products });
  },
  search: (req, res) => {
    const search = req.query.city;
    // eslint-disable-next-line max-len
    const ciudadBuscada = Product.fetchAllFromJson().filter((p) => p.city.toLowerCase().trim().includes(search.toLowerCase().trim()));
    res.render('products/products-select', { search, ciudadBuscada });
  },
  detail: (req, res) => {
    const property = Product.getById(Number(req.params.id));
    res.render('products/detail', { property });
  },
  carrito: (req, res) => {
    const property = Product.getById(Number(req.params.id));
    res.render('products/cart', { property });
  },
  newForm: (req, res) => {
    res.render('products/new', { googleMaps });
  },
  new: (req, res) => {
    const property = {
      id: Product.getNewId(),
      user_id: 1,
      ...req.body,
    };
    if (req.files !== undefined) {
      for (let i = 0; i < req.files; i += 1) {
        Object.defineProperty(property, `image${i + 1}`, {
          value: req.files[i].filename,
        });
      }
    }
    Product.add(property);
    res.redirect('../users');
  },
  editForm: (req, res) => {
    const property = Product.getById(Number(req.params.id));
    const { camelCaseToProperCase } = helpers;
    res.render('products/edit', { property, camelCaseToProperCase });
  },
  edit: (req, res) => {
    const newProperty = {
      id: Number(req.params.id),
      user_id: 1,
      ...req.body,
    };
    if (req.files !== undefined) {
      for (let i = 0; i < req.files; i += 1) {
        Object.defineProperty(newProperty, `image${i + 1}`, {
          value: req.files[i].filename,
        });
      }
    }
    Product.edit(Number(req.params.id), newProperty);
    res.redirect('../users');
  },
  delete: (req, res) => {
    Product.remove(Number(req.params.id));
    res.redirect('../users');
  },
};

module.exports = productController;
