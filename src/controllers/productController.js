const { validationResult } = require('express-validator');
const Product = require('../models/Product');
const User = require('../models/User');

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
    res.render('products/new');
  },
  new: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const property = {
        id: Product.getNewId(),
        user_id: User.getByEmail(req.session.user).id,
        type: req.body.type,
        max_guests: Number(req.body.max_guests),
        price: Number(req.body.price),
        description: req.body.description,
        images: [],
        province: req.body.province,
        city: req.body.city,
        address: req.body.address,
      };
      if (req.files.length) {
        for (let i = 0; i < req.files.length; i += 1) {
          property.images.push(req.files[i].filename);
        }
      } else {
        property.images.push('default.jpg');
      }
      Product.add(property);
      res.render('users/dashboard');
    }
    const priorInput = { ...req.body };
    const { id } = User.getByEmail(req.session.user);
    const userProperties = Product.getAllByUserId(id);
    res.render('products/new', { errors: errors.mapped(), priorInput, userProperties });
  },
  editForm: (req, res) => {
    const property = Product.getById(req.params.id);
    res.render('products/edit', { property });
  },
  edit: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const property = Product.getById(req.params.id);
      // Elimina del objeto todas las amenidades
      const amenities = ['wifi', 'room_service', 'breakfast', 'pets', 'garage', 'linens', 'heating', 'air_conditioning', 'pool', 'grill', 'province', 'city'];
      for (let i = 0; i < amenities.length; i += 1) {
        delete property[amenities[i]];
      }
      Object.assign(property, req.body);
      property.price = Number(req.body.price);
      property.max_guests = Number(req.body.max_guests);

      if (req.files.length) {
        Product.removeOldImages(property.images);
        property.images = [];
        for (let i = 0; i < req.files.length; i += 1) {
          property.images.push(req.files[i].filename);
        }
      }
      Product.edit(req.params.id, property);
      const { id } = User.getByEmail(req.session.user);
      const userProperties = Product.getAllByUserId(id);
      res.render('users/dashboard', { userProperties });
    }
    res.render('products/edit', { errors: errors.mapped(), priorInput: req.body });
  },
  delete: (req, res) => {
    const property = Product.getById(req.params.id);
    Product.removeOldImages(property.images);
    Product.remove(Number(req.params.id));
    res.redirect('/users');
  },
};

module.exports = productController;
