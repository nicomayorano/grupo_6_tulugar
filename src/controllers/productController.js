/* eslint-disable no-console */
const { validationResult } = require('express-validator');
const db = require('../database/index');
const { Users } = require('../database/index');
const { Products } = require('../database/index');

const productController = {
  index: (req, res) => {
    Products.fetchAllFromJson()
      .then((products) => res.render('products/products', { products }))
      .catch((err) => console.error(err));
  },

  search: async (req, res) => {
    const search = req.query.city;
    try {
      const products = await Product.fetchAllFromJson();
      const ciudadBuscada = products.filter((p) => p.city.toLowerCase()
        .trim().includes(search.toLowerCase().trim()));
      return res.render('products/products-select', { search, ciudadBuscada });
    } catch {
      return console.error('Error');
    }
  },

  detail: (req, res) => {
   // Product.getById(Number(req.params.id))
      Products.findByPk(req.params.id)
      .then((property) => res.render('products/detail', { property }))
      .catch((err) => console.error(err));
  },

  cart: (req, res) => {
    Product.getById(Number(req.params.id))
      .then((property) => res.render('products/cart', { property }))
      .catch((err) => console.error(err));
  },

  newForm: (req, res) => res.render('products/new'),

  // eslint-disable-next-line consistent-return
  new: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.errors = errors.mapped();
    }
    if (res.locals.errors) {
      const priorInput = { ...req.body };
      return res.render('products/new', { priorInput });
    }

    const property = {};

    Object.assign(property, {
      id: undefined,
      ...req.body,
      user_id: req.session.user.id,
      max_guests: Number(req.body.max_guests),
      price: Number(req.body.price),
      images: [],
    });

    Product.getNewId()
      .then((value) => {
        property.id = value;
        if (req.files.length) {
          for (let i = 0; i < req.files.length; i += 1) {
            property.images.push(req.files[i].filename);
          }
        } else {
          property.images.push('default.jpg');
        }
        return Product.add(property);
      })
      .then(() => res.redirect('/users'))
      .catch((err) => console.error(err));
  },

  editForm: (req, res) => {
    db.Product.findByPk(Number(req.params.id))
      .then((property) => res.render('products/edit', { property }))
      .catch((err) => console.error(err));
  },

  edit: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.errors = errors.mapped();
    }
    if (res.locals.errors) {
      Product.getById(req.params.id)
        .then((product) => res.render('products/edit', {
          priorInput: {
            ...req.body,
            id: req.params.id,
            images: Object.hasOwn(res.locals.errors, 'image') ? '' : product.images,
          },
        }))
        .catch((err) => console.error(err));
    }

    Product.getById(Number(req.params.id))
      .then((prop) => {
        const property = prop;
        // Elimina del objeto todas las amenidades
        const amenities = ['wifi', 'room_service', 'breakfast', 'pets', 'garage', 'linens', 'heating', 'air_conditioning', 'pool', 'grill', 'province', 'city'];
        for (let i = 0; i < amenities.length; i += 1) {
          delete property[amenities[i]];
        }

        Object.assign(property, {
          ...req.body,
          price: Number(req.body.price),
          max_guests: Number(req.body.max_guests),
        });

        if (req.files.length) {
          Promise.all(Product.removeOldImages(property.images))
            .then(() => console.log('Log: succesfully removed images from disk after product edition'));

          property.images = [];
          for (let i = 0; i < req.files.length; i += 1) {
            property.images.push(req.files[i].filename);
          }
        }
        Product.edit(req.params.id, property);
      })
      .then(() => res.redirect('/users'))
      .catch((err) => console.error(err));
  },

  delete: (req, res) => {
    // Products.getById(req.params.id)
    //  .then((property) => Promise.all(Product.removeOldImages(property.images)))
    //  .then(() => console.log('Log: succesfully removed images from disk after product deletion'))
    //  .catch((err) => console.error(err));
    //Products.remove(Number(req.params.id))
  
    const id = req.params.id;
    Products.update({ deleted: 1 },{ where : {id}})
    .then(() => res.redirect('/users'))
    .catch((err) => console.error(err));
  },
};

module.exports = productController;
