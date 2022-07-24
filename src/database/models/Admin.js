const bcryptjs = require('bcryptjs');

module.exports = (sequelize, dataTypes) => {
  const alias = 'Admins';

  const cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: dataTypes.STRING(12),
      allowNull: false,
    },

    password: {
      type: dataTypes.STRING(60),
      allowNull: false,
      set(value) {
        this.setDataValue('password', bcryptjs.hashSync(value, 10));
      },
    },
  };

  const config = {
    tableName: 'admins',
    timestamps: false,
    deletedAt: false,
    indexes: [
      {
        name: 'uidx_admins_name',
        unique: true,
        fields: ['name'],
      },
    ],
  };

  const Admin = sequelize.define(alias, cols, config);

  // eslint-disable-next-line func-names

  return Admin;
};