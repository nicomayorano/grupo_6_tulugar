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
    const users = this.findAll();
    const found = users.find((user) => user.id === id);
    return found;
  },

  findByField(field, value) {
    const users = this.findAll();
    const found = users.find((user) => user[field] === value);
    return found;
  },

  createId() {
    const users = this.findAll();
    const last = users.pop();
    if (last) {
      return last.id + 1;
    }
    return 1;
  },

  create(user) {
    const users = this.findAll();
    const newUser = {
      id: this.createId(),
      ...user,
    };
    users.push(newUser);
    fs.writeFileSync(this.fileName, JSON.stringify(users, null, ' '));
    return true;
  },
};

module.exports = User;
