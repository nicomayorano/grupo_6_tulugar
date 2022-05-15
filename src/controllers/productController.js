const Product = require('../models/Product');
const User = require('../models/User');
const { googleMaps } = require('../../config');
const helpers = require('../helpers');

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
      user_id: User.getByEmail(req.session.user).id,
      ...req.body,
      images: [],
    };
    if (req.files.length) {
      for (let i = 0; i < req.files.length; i += 1) {
        property.images.push(req.files[i].filename);
      }
    }
    Product.add(property);
    res.redirect('../users');
  },
  editForm: (req, res) => {
    const property = Product.getById(req.params.id);
    res.render('products/edit', { property, googleMaps });
  },
  edit: (req, res) => {
    const property = Product.getById(req.params.id);
    // Elimina del objeto todas las amenidades
    const amenities = ['wifi', 'room_service', 'breakfast', 'pets', 'garage', 'linens', 'heating', 'air_conditioning', 'pool', 'grill', 'province', 'city'];
    for (let i = 0; i < amenities.length; i += 1) {
      delete property[amenities[i]];
    }
    helpers.removeOldProductsImages(property.images);
    property.images = [];
    Object.assign(property, req.body);

    if (req.files.length) {
      for (let i = 0; i < req.files.length; i += 1) {
        property.images.push(req.files[i].filename);
      }
    }
    Product.edit(req.params.id, property);
    res.redirect('../users');
  },
  delete: (req, res) => {
    const property = Product.getById(req.params.id);
    helpers.removeOldProductsImages(property.images);
    Product.remove(Number(req.params.id));
    res.redirect('../users');
  },
};

module.exports = productController;
