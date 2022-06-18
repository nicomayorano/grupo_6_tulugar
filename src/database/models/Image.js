module.exports = (sequelize, dataTypes) => {
  const alias = 'Images';

  const cols = {
    product_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Products',
        key: 'id',
      },
    },

    image1: {
      type: dataTypes.STRING(255),
      defaultValue: 'default.jpg',
    },

    image2: {
      type: dataTypes.STRING(255),
    },

    image3: {
      type: dataTypes.STRING(255),
    },

    image4: {
      type: dataTypes.STRING(255),
    },

    image5: {
      type: dataTypes.STRING(255),
    },
  };

  const config = {
    tableName: 'images',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updated_at',
    deletedAt: false,
    indexes: [
      {
        name: 'uidx_images_pid',
        unique: true,
        fields: ['product_id'],
      },
    ],
  };

  const Image = sequelize.define(alias, cols, config);

  // eslint-disable-next-line func-names
  Image.associate = function (models) {
    Image.belongsTo(models.Products, {
      foreignKey: 'product_id',
      as: 'Products',
      onDelete: 'NO ACTION',
    });
  };

  return Image;
};
