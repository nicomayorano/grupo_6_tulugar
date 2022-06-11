module.exports = (sequelize, dataType) => {
  const alias = 'Products';
  const cols = {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    max_guests: {
      type: dataType.TINYINT.UNSIGNED,
      allowNull: false,
    },
    price: {
      type: dataType.TINYINT.UNSIGNED,
      allowNull: false,
    },
    description: {
      type: dataType.STRING,
    },
    province: {
      type: dataType.STRING(45),
    },
    city: {
      type: dataType.STRING(100),
    },
    address: {
      type: dataType.STRING,
    },
    type: {
      type: dataType.STRING(45),
    },
    created_at: {
      type: dataType.DATE,
    },
    updated_at: {
      type: dataType.DATE,
    },
  };
  const config = {
    tableName: 'products',
    // timestamps: false
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = function (models) {
    Product.belongsTo(models.Amenities, {
      as: 'imenities',
      foreignkey: 'amenities_id',
      timestamps: false,
    });

    Product.belongsTo(models.Images, {
      as: 'images',
      foreignkey: 'images_id',
    });
  };

  return Product;
};
