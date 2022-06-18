module.exports = (sequelize, dataTypes) => {
  const alias = 'Bookings';

  const cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    product_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },

    user_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Users',
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
    tableName: 'bookings',
    timestamps: false,
    indexes: [
      {
        name: 'idx_bookings_uid_pid',
        fields: ['user_id', 'product_id'],
      },
    ],
  };

  const Booking = sequelize.define(alias, cols, config);

  // eslint-disable-next-line func-names
  Booking.associate = function (models) {
    Booking.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'Users',
    });

    Booking.belongsTo(models.Products, {
      foreignKey: 'product_id',
      as: 'Products',
    });
  };

  return Booking;
};
