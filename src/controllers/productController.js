const helpers = require('./helperFunctions');

const productController = {
  index: (req, res) => {
    const products = helpers.fetchProductsFromJson();
    res.render('products/products', { products });
  },
  // detailGo: (req, res) => {
  //   res.render('products/:id');
  // },
  search: (req, res) => {
    const search = req.query.city;
    // eslint-disable-next-line max-len
    const ciudadBuscada = helpers.fetchProductsFromJson().filter((p) => p.city.toLowerCase().trim().includes(search.toLowerCase().trim()));
    res.render('products/products-select', { search, ciudadBuscada });
  },
  detail: (req, res) => {
    const property = helpers.fetchProductFromId(Number(req.params.id));
    res.render('products/detail', { property });
  },
  carrito: (req, res) => {
    const property = helpers.fetchProductFromId(Number(req.params.id));
    res.render('products/cart', { property });
  },
  newForm: (req, res) => {
    res.render('products/new');
  },
  new: (req, res) => {
    const property = { 
      IdUser: 1, // TO DO cuando tengamos login
      IdProduct: helpers.getNewProductId(),
      //Si necesariamente no se suben 3 imagenes, da error.
      image0: req.files[0].filename,
      image1: req.files[1].filename,
      image2: req.files[2].filename,
      ...req.body,
    };
    helpers.addProduct(property);
    res.redirect('../users');
  },
  editForm: (req, res) => {
    const property = helpers.fetchProductFromId(Number(req.params.id));
    const { camelCaseToProperCase } = helpers;
    res.render('products/edit', { property, camelCaseToProperCase });
  },
  edit: (req, res) => {
    const newProperty = {
      IdUser: 1, // TO DO cuando tengamos login
      IdProduct: Number(req.params.id),
      image0: req.files[0].filename,
      image1: req.files[1].filename,
      image2: req.files[2].filename,
      ...req.body,
    };
    helpers.editProduct(Number(req.params.id), newProperty);
    res.redirect('../users');
  },
  delete: (req, res) => {
    helpers.deleteProduct(Number(req.params.id));
    res.redirect('../users');
  },
};

module.exports = productController;
