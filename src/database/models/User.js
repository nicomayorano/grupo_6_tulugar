module.exports = (sequelize, dataType) => {
  const alias = 'Users';
  const cols = {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: dataType.STRING(12),
      allowNull: false,
    },
    email: {
      type: dataType.STRING(255),
      allowNull: false,
    },
    password: {
      allowNull: false,
      type: dataType.STRING(6),
    },
    created_at: {
      allowNull: false,
      type: dataType.DATE,
    },
    updated_at: {
      type: dataType.DATE,
    },
    type: {
      type: dataType.STRING(14),
    },
    avatar: {
      type: dataType.STRING(255),
      defaultValue: 'default.jpg',
    },
  };

  const config = {
    tableName: 'Users',
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.belongsTo(models.Booking, {
      as: 'Bookings',
      foreignkey: 'user_id',
      timestamps: false,
    });
  };

  return User;
};
