module.exports = (sequelize, dataTypes) => {
  const alias = 'Products';

  const cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },

    max_guests: {
      type: dataTypes.TINYINT.UNSIGNED,
      allowNull: true,
    },

    price: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    description: {
      type: dataTypes.TEXT,
      allowNull: true,
    },

    province: {
      type: dataTypes.STRING(45),
      allowNull: true,
    },

    city: {
      type: dataTypes.STRING(100),
      allowNull: true,
    },

    address: {
      type: dataTypes.STRING,
      allowNull: true,
    },

    type: {
      type: dataTypes.STRING(45),
      allowNull: true,
    },
  };

  const config = {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  };

  const Product = sequelize.define(alias, cols, config);

  // eslint-disable-next-line func-names
  Product.associate = function (models) {
    Product.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'Users',
      onDelete: 'NO ACTION',
    });

    Product.hasMany(models.Amenities, {
      foreignKey: 'product_id',
      as: 'Amenities',
    });

    Product.hasMany(models.Bookings, {
      foreignKey: 'product_id',
      as: 'Bookings',
    });

    Product.hasMany(models.Images, {
      foreignKey: 'product_id',
      as: 'Images',
    });
  };

  return Product;
};
