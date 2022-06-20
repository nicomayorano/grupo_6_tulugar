module.exports = (sequelize, dataTypes) => {
  const alias = 'Images';

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
    image: {
      type: dataTypes.STRING(255),
      defaultValue: 'default.jpg',
    }
  };

  const config = {
    tableName: 'images',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updated_at',
    deletedAt: false,
   /*  indexes: [
      {
        name: 'uidx_images_pid',
        unique: true,
        fields: ['product_id'],
      },
    ], */
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
