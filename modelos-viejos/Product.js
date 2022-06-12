/* eslint-disable no-console */
const path = require('path');
const { rm, writeFile, readFile } = require('fs/promises');

const Product = {
  filepath: path.resolve(process.cwd(), 'src', 'data', 'products.json'),
  imgPath: path.resolve(process.cwd(), 'src', 'public', 'productsImages'),
  /**
   * Devuelve todos los productos almacenados en el json (this.filepath)
   * @returns {Promise} Resuelve a un array de objetos que representa todos los productos
   */
  fetchAllFromJson() {
    return readFile(this.filepath)
      .then((products) => JSON.parse(products))
      .catch((err) => console.error(err));
  },
  /**
   * Recibe un array de todos los productos y los almacena en el .json (this.filepath)
   * @param {[Object]} products Array de objetos representando todos los productos
   * @returns {Promise} Devuelve una promesa de guardar los productos en el .json
   */
  saveAllToJson(products) { // REvisaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaar
    return writeFile(this.filepath, JSON.stringify(products, null, 2));
  },
  /**
   * Recibe una ID de producto y resuelve a ese producto
   * @param {Number} id Id de producto
   * @returns {Promise} Resuelve a un objeto que representa el producto buscado
   */
  getById(id) {
    return this.fetchAllFromJson()
      .then((prods) => prods.find((p) => p.id === Number(id)))
      .catch((err) => console.error(err));
  },
  /**
   * Recibe una ID de usuario y resuelve a un array de todos sus productos
   * @param {Number} userId ID de usuario
   * @returns {Promise} Resuelve a un array de objetos de todos los productos del usuario
   */
  getAllByUserId(userId) {
    return this.fetchAllFromJson()
      .then((prods) => prods.filter((p) => p.user_id === Number(userId)))
      .catch((err) => console.error(err));
  },
  /**
   * Devuelve un ID único para asignarlo a un producto en creación
   * @returns {Promise} Resuelve a un ID
   */
  getNewId() {
    return this.fetchAllFromJson()
      .then((prods) => prods.reduce((prev, current) => {
        if (prev.id > current.id) return prev.id;
        return current.id;
      }, 0) + 1)
      .catch((err) => console.error(err));
  },
  /**
   * Recibe un producto y lo agrega al .json (this.filepath)
   * @param {Object} product Representa un producto
   * @returns {Promise} Devuelve una promesa de agregar el objeto al json
   */
  add(product) {
    return this.fetchAllFromJson()
      .then((prods) => {
        prods.push(product);
        return this.saveAllToJson(prods);
      })
      .then(() => console.log('Successfully added product to .json'))
      .catch((err) => console.error(err));
  },
  /**
   * Recibe ID y producto editado, lo ubica y actualiza en el .json (this.filepath)
   * @param {Number} id ID de producto
   * @param {Object} edited Producto a actualizar
   * @returns {Promise} Devuelve una promesa de editar un objeto del json
   */
  edit(id, edited) {
    return this.fetchAllFromJson()
      .then((prods) => {
        const products = prods;
        const found = products.findIndex((p) => p.id === Number(id));
        if (found !== -1) {
          products[found] = { ...edited };
          return this.saveAllToJson(products);
        }
        throw new Error('El producto a editar no fue encontrado');
      })
      .then(() => console.log('Successfully edited product on .json'))
      .catch((err) => console.error(err));
  },
  /**
   * Recibe ID de producto y lo elimina del .json (this.filepath)
   * @param {Number} id ID de producto a eliminar
   */
  remove(id) {
    return this.fetchAllFromJson()
      .then((prods) => {
        const products = prods;
        const found = products.findIndex((p) => p.id === id);
        if (found !== -1) {
          products.splice(found, 1);
          return this.saveAllToJson(products);
        }
        throw new Error('El producto a eliminar no fue encontrado');
      })
      .then(() => console.log('Successfully removed product from .json'))
      .catch((err) => console.error(err));
  },
  /**
   * Remueve las imágenes que no deben persistir por edición o eliminación del producto
   * @param {[String]} arr Array con el nombre de los archivos a eliminar
   * @returns {[Promise<Pending>]}
   * @async
   */
  removeOldImages(arr) {
    const promArray = [];
    if (arr.length) {
      for (let i = 0; i < arr.length; i += 1) {
        // eslint-disable-next-line no-continue
        if (arr[i] === 'default.jpg') continue;
        promArray.push(rm(path.resolve(this.imgPath, arr[i])));
      }
    }
    return promArray;
  },
};

module.exports = Product;
