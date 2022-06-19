/* eslint-disable no-console */
const { validationResult } = require('express-validator');
const { Products, Op } = require('../database/index');
const amenities = ['wifi', 'room_service', 'breakfast', 'pets', 'garage', 'linens', 'heating', 'air_conditioning', 'pool', 'grill', 'province', 'city'];

const productController = {
  index: (req, res) => {
    Products.findAll()
      .then((products) => res.render('products/products', { products: products.dataValues }))
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



   /*  Object.assign(property, {
      id: undefined,
      ...req.body,
      user_id: req.session.user.id,
      max_guests: Number(req.body.max_guests),
      price: Number(req.body.price)
     // images: [],
    }); */


    console.dir(property);


    Products.create({     
      user_id: req.session.user.id,
      max_guests: req.body.max_guests,
      price: Number(req.body.price),
      description: req.body.description,
      province: req.body.province,
      city: req.body.city,
      address:req.body.address,
      type:req.body.type,
      amenities: {wifi: true},
    }, {
      include: [{
        include: [ User.Addresses ]
      }]
    })
      .then(() => res.redirect('/users'))
      .catch((error) => console.error(error));
  
     
     

    
   /*  Product.getNewId()
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
      .catch((err) => console.error(err)); */
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
    for (let i = 0; i < amenities.length; i += 1) {
      if (req.body[amenities[i]] === 'on') {
        Object.defineProperty(obj, amenities[i], {
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
    Products.update({ deleted: 1 },{ where : {id}})
    .then(() => res.redirect('/users'))
    .catch((err) => console.error(err));
  },
};

module.exports = productController;
