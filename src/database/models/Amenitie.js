module.exports = (sequelize, dataTypes) => {
  const alias = 'Amenities';

  const cols = {
    product_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'id',
      },
    },

    wifi: {
      type: dataTypes.TINYINT.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },

    room_service: {
      type: dataTypes.TINYINT.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },

    breakfast: {
      type: dataTypes.TINYINT.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },

    pets: {
      type: dataTypes.TINYINT.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },

    garage: {
      type: dataTypes.TINYINT.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },

    linens: {
      type: dataTypes.TINYINT.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },

    heating: {
      type: dataTypes.TINYINT.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },

    air_conditioning: {
      type: dataTypes.TINYINT.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },

    pool: {
      type: dataTypes.TINYINT.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },

    grill: {
      type: dataTypes.TINYINT.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },
  };

  const config = {
    tableName: 'amenities',
    timestamps: true,
    createdAt: false,
    updatedAt: 'updated_at',
    deletedAt: false,
    indexes: [
      {
        name: 'fk_amenities_uidx',
        unique: true,
        fields: ['product_id'],
      },
    ],
  };

  const Amenities = sequelize.define(alias, cols, config);

  // eslint-disable-next-line func-names
  Amenities.associate = function (models) {
    Amenities.belongsTo(models.Products, {
      foreignKey: 'product_id',
      as: 'product',
      onDelete: 'CASCADE',
    });
  };

  return Amenities;
};
