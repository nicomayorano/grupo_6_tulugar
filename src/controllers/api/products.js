/* eslint-disable no-console */
const { Products } = require('../../database/index');

const productController = {
  list: (req, res) => {
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
          products.push(elem.get({ plain: true }));
        });
        res.json({ products });
      })
      .catch((err) => console.error(err));
  },
  detail: (req, res) => {
    Products.findByPk(req.params.id, {
      include: [{
        association: 'Images',
        attributes: { exclude: ['product_id', 'updated_at'] },
      }, {
        association: 'Amenities',
        attributes: { exclude: ['product_id', 'updated_at'] },
      }],
    })
      .then((property) => res.json(property.get({ plain: true })))
      .catch((err) => console.error(err));
  },
};

module.exports = productController;
