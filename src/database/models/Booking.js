module.exports = (sequelize, dataType) => {
  const alias = 'Bookings';
  const cols = {
    product_id: {
      type: dataType.INTEGER.UNSIGNED,
      allowNull: false,
    },
    user_id: {
      type: dataType.INTEGER.UNSIGNED,
      allowNull: false,
    },
    checkin: {
      type: dataType.STRING(45),
    },
    checkout: {
      type: dataType.STRING(45),
    },
    price: {
      type: dataType.STRING(45),
    },
    status: {
      type: dataType.STRING(10),
    },
  };

  const config = {
    tableName: 'Bookings',
    timestamps: false, // ?
  };

  const Booking = sequelize.define(alias, cols, config);

  Bookings.associate = function (models) {
    Bookings.belongsTo(models.Users, {
      as: 'users',
      foreignkey: 'id',
    });
  };
  return Booking;
};
