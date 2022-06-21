const bcryptjs = require('bcryptjs');

module.exports = (sequelize, dataTypes) => {
  const alias = 'Users';

  const cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: dataTypes.STRING(12),
      allowNull: false,
    },

    email: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },

    password: {
      type: dataTypes.STRING(60),
      allowNull: false,
      set(value) {
        this.setDataValue('password', bcryptjs.hashSync(value, 10));
      },
    },

    type: {
      type: dataTypes.STRING(14),
      allowNull: true,
    },

    avatar: {
      type: dataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'default.jpg',
    },
  };

  const config = {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    indexes: [
      {
        name: 'uidx_users_email',
        unique: true,
        fields: ['email'],
      },
      {
        name: 'uidx_users_username',
        unique: true,
        fields: ['username'],
      },
    ],
  };

  const User = sequelize.define(alias, cols, config);

  // eslint-disable-next-line func-names
  User.associate = function (models) {
    User.hasMany(models.Bookings, {
      foreignKey: 'user_id',
      as: 'Bookings',
    });

    User.hasMany(models.Products, {
      foreignKey: 'user_id',
      as: 'Products',
    });
  };

  return User;
};
