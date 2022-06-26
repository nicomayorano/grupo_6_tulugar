const { Products } = require('../../database/index');

const productController = {
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
