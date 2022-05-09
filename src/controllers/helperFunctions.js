const path = require('path');
const fs = require('fs');

const helpers = {
  filepath: path.resolve(process.cwd(), 'src', 'data', 'products.json'),
  // Devuelve un array de todos los productos (objetos)
  fetchProductsFromJson() {
    return JSON.parse(fs.readFileSync(this.filepath));
  },
  // Recibe una ID de producto (pasarla con Number(id)) y devuele solo ese producto (objeto)
  fetchProductFromId(id) {
    const product = this.fetchProductsFromJson();
    return product.find((p) => p.IdProduct === id);
  },
  // Recibe una ID de usuario (pasarla con Number(id)) y devuelve un array de sus productos
  fetchProductsByUserId(userId) {
    return this.fetchProductsFromJson().filter((p) => p.IdUser === userId);
  },
  // Recibe un array de todos los productos (objetos) y los guarda en el .json
  updateProductsOnJson(products) {
    fs.writeFileSync(this.filepath, JSON.stringify(products, null, 2));
  },
  // Devuelve un ID nuevo para asignarlo a un producto creado
  getNewProductId() {
    const products = this.fetchProductsFromJson();
    // eslint-disable-next-line no-confusing-arrow
    return products.reduce((prev, current) => {
      if (prev.IdProduct > current.IdProduct) return prev.IdProduct;
      return current.IdProduct;
    }) + 1;
  },
  // Recibe un producto (objeto) y lo agrega al .json
  addProduct(product) {
    const products = this.fetchProductsFromJson();
    products.push(product);
    this.updateProductsOnJson(products);
  },
  // Recibe ID y producto editado, y actualiza el mismo en el .json
  // Podría implementarse que busque el ID dentro del producto editado
  // Eso depende de cómo se decida implementar el controlador, entonces la dejé más genérica
  editProduct(id, edited) {
    const products = this.fetchProductsFromJson();
    const found = products.findIndex((p) => p.IdProduct === id);
    if (found !== -1) {
      products[found] = { ...edited };
      this.updateProductsOnJson(products);
    }
  },
  // Recibe ID de producto y lo elimina del JSON
  deleteProduct(id) {
    const products = this.fetchProductsFromJson();
    const found = products.findIndex((p) => p.IdProduct === id);
    if (found !== -1) {
      products.splice(found, 1);
      this.updateProductsOnJson(products);
    }
  },
  // Recibe una string. Devuelve la misma pero con la primera letra en mayúscula y agrega un espacio
  // antes de las mayúsculas subsiguientes. Ej.: bedAndBreakfast(input), Bed And Breakfast (output)
  camelCaseToProperCase(word) {
    let ans = '';
    ans += word[0].toUpperCase();
    for (let i = 1; i < word.length; i += 1) {
      if (word.charCodeAt(i) < 90) {
        ans += ` ${word[i]}`;
      } else {
        ans += word[i];
      }
    }
    return ans;
  },
  //=-=-=-==-=-=-=-=-=-=-=-==-=-=-=-=-- USERS HELPERS-=-=-=-=-=-=-=-=--//
  filepathUsers: path.resolve(process.cwd(), 'src', 'data', 'users.json'),
  // Devuelve un array de todos los usuarios
  fetchUsersFromJson() {
    return JSON.parse(fs.readFileSync(this.filepathUsers));
  },
  // Recibe un array de todos los Usuarios  y los guarda en el .json
  updateUsersOnJson(users) {
    fs.writeFileSync(this.filepathUsers, JSON.stringify(users, null, 2));
  },
  // Genera nuevo id Users.
  getNewUserId() {
    const users = this.fetchUsersFromJson();
    // eslint-disable-next-line no-confusing-arrow
    return users.reduce((prev, current) => {
      if (prev.IdUser > current.IdUser) return prev.IdUser;
      return current.IdUser;
    }) + 1;
  },
  // Recibe un usuario y lo agrega al .json
  addUser(userNew) {
    const users = this.fetchUsersFromJson();
    users.push(userNew);
    this.updateUsersOnJson(users);
  },
};

module.exports = helpers;
