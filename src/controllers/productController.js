const helpers = require('./helperFunctions');

const productController = {
  index: (req, res) => {
    const products = helpers.fetchProductsFromJson();
    res.render('products/products', { products });
  },
  detailGo: (req, res) => {
    res.render('products/detail');
  },
  search: (req, res) => {
    const search = req.query.city;
    // eslint-disable-next-line max-len
    const ciudadBuscada = helpers.fetchProductsFromJson().filter((p) => p.ciudad.toLowerCase().trim().includes(search.toLowerCase().trim()));
    res.render('products/products-select', { search, ciudadBuscada });
  },
  detail: (req, res) => {
    const property = helpers.fetchProductFromId(Number(req.params.id));
    res.render('products/detail', { property });
  },
  newForm: (req, res) => {
    res.render('products/new');
  },
  new: (req, res) => {
    const property = {
      IdUser: 1, // TO DO cuando tengamos login
      IdProduct: helpers.getNewProductId(),
      ...req.body,
    };
    helpers.addProduct(property);
    res.redirect('users/dashboard');
  },
  editForm: (req, res) => {
    const property = helpers.fetchProductFromId(Number(req.params.id));
    res.render('products/edit', { property });
  },
  edit: (req, res) => {
    const newProperty = {
      ...req.body,
    };
    helpers.editProduct(req.params.id, newProperty);
    res.redirect('users/dashboard');
  },
  delete: (req, res) => {
    helpers.deleteProduct(req.params.id);
    res.redirect('users/dashboard');
  },
};

module.exports = productController;
