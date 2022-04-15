const productController = {
  index: (req, res) => {
    res.render('products/products.ejs');
  },
  detail: (req, res) => {
    res.render('products/detail.ejs');
  },
  cart: (req, res) => {
    res.render('products/cart.ejs');
  },
  add: (req, res) => {
    res.render('index.ejs'); // TO DO
  },
};

module.exports = productController;
