/* eslint-disable no-console */
const { validationResult } = require('express-validator');
const { rm } = require('fs/promises');
const db = require('../database/index');
const {
  Products, Op, Images, Amenities,
} = require('../database/index');

const AMENITIES = ['wifi', 'room_service', 'breakfast', 'pets', 'garage', 'linens', 'heating', 'air_conditioning', 'pool', 'grill'];

const productController = {
  index: (req, res) => {
    const products = [];
    Products.findAll({
      include: [{
        association: 'Images',
        attributes: { exclude: ['product_id', 'updated_at'] },
      }, {
        association: 'Amenities',
        attributes: { exclude: ['product_id', 'updated_at'] },
      }],
    })
      .then((result) => {
        result.forEach((elem) => {
          products.push(elem.dataValues);
        });
        res.render('products/products', { products });
      })
      .catch((err) => console.error(err));
  },

  search: (req, res) => {
    Products.findAll({
      where: {
        city: {
          [Op.iLike]: req.query.city,
        },
      },
      include: [{
        association: 'Images',
        attributes: { exclude: ['product_id', 'updated_at'] },
      }],
    })
      .then((result) => res.render('products/products-select', { search: String(req.query.city), ciudadBuscada: result?.dataValues }))
      .catch((error) => console.error(error));
  },

  detail: (req, res) => {
    Products.findByPk(req.params.id)
      .then((property) => res.render('products/detail', { property: property?.dataValues }))
      .catch((err) => console.error(err));
  },

  // detail: async (req, res) => {
  //   const property = await Products.findByPk(req.params.id);
  //  res.render('products/detail', { property } );
  // },

  cart: (req, res) => {
    Products.findByPk(req.params.id)
      .then((property) => res.render('products/cart', { property: property?.dataValues }))
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
      if (req.files) {
        for (let i = 0; i < req.files.length; i += 1) {
          rm(req.files[i].path);
        }
      }
      const priorInput = { ...req.body };
      return res.render('products/new', { priorInput });
    }

    const images = {};
    for (let i = 0; i < req.files?.length; i += 1) {
      Object.defineProperty(images, `image${i + 1}`, {
        value: req.files[i].filename,
        enumerable: true,
      });
    }

    const amenities = {};
    for (let i = 0; i < AMENITIES.length; i += 1) {
      if (req.body[AMENITIES[i]] === 'on') {
        Object.defineProperty(amenities, AMENITIES[i], {
          value: 1,
          enumerable: true,
        });
      }
    }

    Products.create({
      user_id: req.session.user.id,
      ...req.body,
      Images: images,
      Amenities: amenities,
    }, {
      include: [{
        association: 'Images',
      }, {
        association: 'Amenities',
      }],
    })
      .then(() => res.redirect('/users'))
      .catch((error) => console.error(error));
  },

  editForm: (req, res) => {
    Products.findByPk(req.params.id, {
      include: [{
        association: 'Images',
        attributes: { exclude: ['product_id', 'updated_at'] },
      }, {
        association: 'Amenities',
      }],
    })
      .then((property) => res.render('products/edit', { property: property?.dataValues }))
      .catch((err) => console.error(err));
  },

  edit: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.errors = errors.mapped();
    }

    if (res.locals.errors) {
      if (req.files) {
        for (let i = 0; i < req.files.length; i += 1) {
          rm(req.files[i].path);
        }
      }

      Images.findByPk(req.params.id, {
        attributes: { exclude: ['product_id', 'updated_at'] },
      })
        .then((product) => {
          const images = [];
          const allImages = Object.entries(product.dataValues);
          for (let i = 0; i < allImages.length; i += 1) {
            images.push(allImages[i][1]);
          }

          res.render('products/edit', {
            priorInput: {
              ...req.body,
              id: req.params.id,
              images: Object.hasOwn(res.locals.errors, 'images') ? '' : images,
            },
          });
        })
        .catch((err) => console.error(err));
    }

    const amenities = {};
    for (let i = 0; i < AMENITIES.length; i += 1) {
      if (req.body[AMENITIES[i]] === 'on') {
        Object.defineProperty(amenities, AMENITIES[i], {
          value: 1,
          enumerable: true,
        });
      } else {
        Object.defineProperty(amenities, AMENITIES[i], {
          value: 0,
          enumerable: true,
        });
      }
    }

    const images = {};
    for (let i = 0; i < req.files?.length; i += 1) {
      Object.defineProperty(images, `image${i + 1}`, {
        value: req.files[i].filename,
        enumerable: true,
      });
    }

    const promises = [];
    promises.push(Products.update({
      ...req.body,
    }, {
      where: {
        id: req.params.id,
      },
    }));

    promises.push(Amenities.update({
      ...amenities,
    }, {
      where: {
        product_id: req.params.id,
      },
    }));

    promises.push(Images.update({
      ...images,
    }, {
      where: {
        product_id: req.params.id,
      },
    }));

    Promise.all(promises)
      .then(() => res.redirect('/users'))
      .catch((error) => console.error(error));
  },

  delete: (req, res) => {
    const { id } = req.params;
    // funciona con el paranoid, hace borrado logico modificando el valor de deleted_at
    Products.destroy({ where: { id } })
      .then(() => res.redirect('/users'))
      .catch((err) => console.error(err));
  },
};

module.exports = productController;
