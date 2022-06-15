module.exports = (sequelize, dataTypes) => {
  const alias = 'Products';

  const cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
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
    Product.hasMany(models.Amenities, {
      as: 'amenities',
      foreignKey: 'product_id',
    });

    Product.hasMany(models.Bookings, {
      as: 'bookings',
      foreignKey: 'product_id',
    });

    Product.hasMany(models.Images, {
      as: 'images',
      foreignKey: 'product_id',
    });

    Product.belongsToMany(models.Users, {
      through: 'products_users',
      as: 'ProductsUsers',
      foreignKey: 'product_id',
      otherKey: 'users_id',
      timestamps: false,
      onDelete: 'CASCADE', // ? PERSISTIR?
    });
  };

  return Product;
};
