const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const User = {
  filepath: path.resolve(process.cwd(), 'src', 'data', 'users.json'),
  /**
   * Devuelve todos los usuarios registrados en el json (this.filepath)
   * @returns {Object|Array} Array de todos los usuarios
   */
  fetchAllFromJson() {
    return JSON.parse(fs.readFileSync(this.filepath));
  },
  /**
   * Guarda todos los usuarios en el .json (this.filepath)
   * @param {Object|Array} users Array de todos los usuarios
   */
  saveAllToJson(users) {
    fs.writeFileSync(this.filepathUsers, JSON.stringify(users, null, 2));
  },
  /**
   * // Devuelve un ID único para asignarlo a un producto creado
   * @returns {Number} Nuevo ID
   */
  getNewId() {
    const users = this.fetchAllFromJson();
    // eslint-disable-next-line no-confusing-arrow
    return users.reduce((prev, current) => {
      if (prev.id > current.id) return prev.id;
      return current.id;
    }) + 1;
  },
  /**
   * Recibe un usuario y lo agrega al .json (this.filepath)
   * @param {Object} userNew Usuario a agregar
   */
  add(userNew) {
    const users = this.fetchAllFromJson();
    users.push(userNew);
    this.saveAllToJson(users);
  },
  /**
   * Recibe un email, busca algun usuariousuario registrado con el mismo y lo devuelve
   * @param {String} email Correo electrónico del usuario buscado
   * @returns {Object} Usuario buscado
   */
  getByEmail(email) {
    return this.fetchAllFromJson().find((u) => u.email === email);
  },
  /**
   * Comprueba la password hasheada contra la suministrada por el usuario en intento de login
   * @param {String} email Correo electrónico del usuario
   * @param {String} password Contraseña literal del usuario
   * @returns {Boolean} Verdadero si autentica correctamente, falso caso contrario
   */
  authenticate(email, password) {
    const account = this.getByEmail(email);
    return account && bcrypt.compareSync(password, account.password);
  },
  getIdByUser(user) {
    return this.getUser(user).id;
  },
};

module.exports = User;
