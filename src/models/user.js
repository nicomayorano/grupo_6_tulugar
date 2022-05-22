const fs = require('fs');
const path = require('path');

const User = {
  fileName: path.resolve(process.cwd(), 'src', 'data', 'users.json'),

  getData: function () {
    return JSON.parse(fs.readFileSync(this.fileName));

  },
  findAll: function () {
    return this.getData();
  },

  findByPk: function (id) {
    let todosUsuarios = this.findAll();
    let usuarioEncontrado = todosUsuarios.find(usuario => usuario.id === id);
    return usuarioEncontrado;
  },

  findByCampos: function (campo, text) {
    let todosUsuarios = this.findAll();
    let usuarioEncontrado = todosUsuarios.find(usuario => usuario[campo] === text);
    return usuarioEncontrado;
  },
  // para buscar y verificar e mail, a la hora de usar el loggin o no registrar dos usuarios con el mismo mail.

  crearId: function(){
    let todosUsuarios = this.findAll();
    let ultimo= todosUsuarios.pop();
    if(ultimo){ 
    return ultimo.id + 1;
    } else{ 
    return 1 ;
    }
  },

  create: function (datosDelUsuario){
    let todosUsuarios = this.findAll();
    let nuevoUsuario ={
        id: this.crearId(),
        ...datosDelUsuario
    }
    todosUsuarios.push(nuevoUsuario);
    fs.writeFileSync(this.fileName, JSON.stringify(todosUsuarios, null, ' '));
    return true
  }
};

module.exports = User;