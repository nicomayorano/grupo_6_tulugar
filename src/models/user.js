const fs = require('fs');
const path = require('path');

const User = {
  fileName: path.resolve(process.cwd(), 'src', 'data', 'users.json'),

  getData() {
    return JSON.parse(fs.readFileSync(this.fileName));
  },

  findAll() {
    return this.getData();
  },

  findByPk(id) {
    const todosUsuarios = this.findAll();
    const usuarioEncontrado = todosUsuarios.find((usuario) => usuario.id === id);
    return usuarioEncontrado;
  },

  findByCampos(campo, text) {
    const todosUsuarios = this.findAll();
    const usuarioEncontrado = todosUsuarios.find((usuario) => usuario[campo] === text);
    return usuarioEncontrado;
  },
  // para buscar y verificar email, a la hora de usar el login o no registrar dos users con el mismo

  crearId() {
    const todosUsuarios = this.findAll();
    const ultimo = todosUsuarios.pop();
    if (ultimo) {
      return ultimo.id + 1;
    }
    return 1;
  },

  create(datosDelUsuario) {
    const todosUsuarios = this.findAll();
    const nuevoUsuario = {
      id: this.crearId(),
      ...datosDelUsuario,
    };
    todosUsuarios.push(nuevoUsuario);
    fs.writeFileSync(this.fileName, JSON.stringify(todosUsuarios, null, ' '));
    return true;
  },
};

module.exports = User;
