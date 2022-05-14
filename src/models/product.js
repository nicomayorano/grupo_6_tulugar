const path = require('path');
const fs = require('fs');

const Product = {
  filepath: path.resolve(process.cwd(), 'src', 'data', 'products.json'),
  /**
   * Devuelve todos los productos almacenados en el json (this.filepath)
   * @returns {Object|Array} Array de objetos representando todos los productos
   */
  fetchAllFromJson() {
    return JSON.parse(fs.readFileSync(this.filepath));
  },
  /**
   * Recibe un array de todos los productos y los almacena en el .json (this.filepath)
   * @param {Object|Array} products Array de objetos representando todos los productos
   */
  saveAllToJson(products) {
    fs.writeFileSync(this.filepath, JSON.stringify(products, null, 2));
  },
  /**
   * Recibe una ID de producto y devuele solo ese producto
   * @param {Number} id Id de producto
   * @returns {Object} Objeto que representa el producto buscado
   */
  getById(id) {
    const product = this.fetchAllFromJson();
    return product.find((p) => p.id === id);
  },
  /**
   * Recibe una ID de usuario (pasarla con Number(id)) y devuelve un array de todos sus productos
   * @param {Number} userId ID de usuario
   * @returns {Object|Array} Array de objetos representativos de todos los prroductos del usuario
   */
  getAllByUserId(userId) {
    return this.fetchAllFromJson().filter((p) => p.user_id === userId);
  },
  /**
   * Devuelve un ID único para asignarlo a un producto creado
   * @returns {Number} Nuevo ID
   */
  getNewId() {
    const products = this.fetchAllFromJson();
    // eslint-disable-next-line no-confusing-arrow
    return products.reduce((prev, current) => {
      if (prev.id > current.id) return prev.id;
      return current.id;
    }) + 1;
  },
  /**
   * Recibe un producto y lo agrega al .json (this.filepath)
   * @param {Object} product Representa un producto
   */
  add(product) {
    const products = this.fetchAllFromJson();
    products.push(product);
    this.saveAllToJson(products);
  },
  /**
   * Recibe ID y producto editado, lo ubica y actualiza en el .json (this.filepath)
   * Podría implementarse que busque el ID dentro del producto editado
   * Eso depende de cómo se decida implementar el controlador, entonces la dejé más genérica
   * @param {Number} id ID de producto
   * @param {Object} edited Producto a actualizar
   */
  edit(id, edited) {
    const products = this.fetchAllFromJson();
    const found = products.findIndex((p) => p.id === id);
    if (found !== -1) {
      products[found] = { ...edited };
      this.saveAllToJson(products);
    }
  },
  /**
   * Recibe ID de producto y lo elimina del .json (this.filepath)
   * @param {Number} id ID de producto a eliminar
   */
  remove(id) {
    const products = this.fetchAllFromJson();
    const found = products.findIndex((p) => p.id === id);
    if (found !== -1) {
      products.splice(found, 1);
      this.saveAllToJson(products);
    }
  },
};

module.exports = Product;
