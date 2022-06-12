module.exports = (sequelize, dataTypes) => {
  const alias = 'Bookings';

  const cols = {
    product_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'id',
      },
    },

    user_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },

    checkin: {
      type: dataTypes.DATEONLY,
      allowNull: false,
    },

    checkout: {
      type: dataTypes.DATEONLY,
      allowNull: false,
    },

    price: {
      type: dataTypes.INTEGER,
      allowNull: true,
    },

    status: {
      type: dataTypes.STRING(10),
      allowNull: true,
    },
  };

  const config = {
    tableName: 'Bookings',
    timestamps: false,
    indexes: [
      {
        name: 'fk_bookings_idx',
        fields: ['user_id', 'product_id'],
      },
    ],
  };

  const Booking = sequelize.define(alias, cols, config);

  // eslint-disable-next-line func-names
  Booking.associate = function (models) {
    Booking.belongsTo(models.Users, {
      as: 'users',
      foreignKey: 'user_id',
    });

    Booking.belongsTo(models.Products, {
      as: 'products',
      foreignKey: 'product_id',
    });
  };

  return Booking;
};
