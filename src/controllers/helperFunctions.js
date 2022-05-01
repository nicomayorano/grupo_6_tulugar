const path = require('path');
const fs = require('fs');

const helpers = {
  filepath: path.resolve(process.cwd(), 'src', 'data', 'products.json'),
  fetchProductsFromJson() {
    return JSON.parse(fs.readFileSync(this.filepath));
  },
  fetchProductFromId(id) {
    const product = this.fetchProductsFromJson();
    return product.find((p) => p.IdProduct === id);
  },
  fetchProductsByUserId(userId) {
    return this.fetchProductsFromJson().filter((p) => p.IdUser === userId);
  },
  updateProductsOnJson(products) {
    fs.writeFileSync(this.filepath, JSON.stringify(products));
  },
  getNewProductId() {
    const products = this.fetchProductsFromJson();
    // eslint-disable-next-line no-confusing-arrow
    return products.reduce((prev, current) => {
      if (prev.IdProduct > current.IdProduct) return prev.IdProduct;
      return current.IdProduct;
    }) + 1;
  },
  addProduct(product) {
    const products = this.fetchProductsFromJson();
    products.push(product);
    this.updateProductsOnJson(products);
  },
  editProduct(id, edited) {
    const products = this.fetchProductsFromJson();
    const found = products.findIndex((p) => p.IdProduct === id);
    if (found !== -1) {
      products[found] = edited;
      this.updateProductsOnJson(products);
    }
  },
  deleteProduct(id) {
    const products = this.fetchProductsFromJson();
    const found = products.findIndex((p) => p.IdProduct === id);
    if (found !== -1) {
      products.splice(found, 1);
      this.updateProductsOnJson(products);
    }
  },
};

module.exports = helpers;
