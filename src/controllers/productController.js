/* eslint-disable no-console */
const { validationResult } = require('express-validator');
<<<<<<< HEAD
const { Products, Amenities } = require('../database/index');
const amenities = ['wifi', 'room_service', 'breakfast', 'pets', 'garage', 'linens', 'heating', 'air_conditioning', 'pool', 'grill'];
=======
const { Products, Op } = require('../database/index');

const AMENITIES = ['wifi', 'room_service', 'breakfast', 'pets', 'garage', 'linens', 'heating', 'air_conditioning', 'pool', 'grill'];
>>>>>>> cb4d5461306b7176490a468cbbd2213d9cd4e13e

const productController = {
  index: (req, res) => {
    const products = [];
    Products.findAll({
      attributes: '',
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

  cart: (req, res) => {
    Products.findByPk(req.params.id)
      .then((property) => res.render('products/cart', { property: property?.dataValues }))
      .catch((err) => console.error(err));
  },

  newForm: (req, res) => res.render('products/new'),

  // eslint-disable-next-line consistent-return
  new: async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.errors = errors.mapped();
    }

    if (res.locals.errors) {
      const priorInput = { ...req.body };
      return res.render('products/new', { priorInput });
    }
    let images = [];
    if (req.files.length == 0) {
      images.push({ image: 'default.jpg' });
    } else {
      for (var i = 0; i < req.files.length; i++) {
        // console.log("file " + req.files[i].filename);
        images.push({ image: req.files[i].filename });
      }
    }
    const proAmenities = {};
    for (let i = 0; i < amenities.length; i += 1) {
      if (req.body[amenities[i]] === 'on') {
        console.log(amenities[i]);

        Object.defineProperty(proAmenities, amenities[i], {
          value: true,
          enumerable: true,
        });
      }
    }

    let prod = await Products.create({
      user_id: req.session.user.id,
      max_guests: req.body.max_guests,
      price: Number(req.body.price),
      description: req.body.description,
      province: req.body.province,
      city: req.body.city,
      address: req.body.address,
      type: req.body.type,
      Images: images
    }, {
      include: {
        association: 'Images',
      }
    });
    await Amenities.create({
      product_id: prod.id,
      ...proAmenities
    });
    res.redirect('/users');


  },

  editForm: (req, res) => {
    Products.findByPk(req.params.id)
      .then((property) => res.render('products/edit', { property: property?.dataValues }))
      .catch((err) => console.error(err));
  },

  edit: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.errors = errors.mapped();
    }
    if (res.locals.errors) {
      Products.findByPk(req.params.id)
        .then((product) => res.render('products/edit', {
          priorInput: {
            ...req.body,
            id: req.params.id,
            images: Object.hasOwn(res.locals.errors, 'images') ? '' : product.dataValues.images,
          },
        }))
        .catch((err) => console.error(err));
    }

    const obj = {};
    for (let i = 0; i < AMENITIES.length; i += 1) {
      if (req.body[AMENITIES[i]] === 'on') {
        Object.defineProperty(obj, AMENITIES[i], {
          value: true,
          enumerable: true,
        });
      }
    }

    Products.update({
      ...req.body,
      amenities: obj,
      images: req?.files,
    }, {
      where: {
        id: req.params.id,
      },
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
    Products.update({ deleted: 1 }, { where: { id } })
      .then(() => res.redirect('/users'))
      .catch((err) => console.error(err));
  },
};

module.exports = productController;
