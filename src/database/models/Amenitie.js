module.exports = (sequelize, dataTypes) => {
  const alias = 'Amenities';

  const cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },/* 
    product_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Products',
        key: 'id',
      },
    }, */

    service: {
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
    deletedAt: false/* ,
    indexes: [
      {
        name: 'uidx_amenities_pid',
        unique: true,
        fields: ['id'],
      },
    ], */
  };

  const Amenitie = sequelize.define(alias, cols, config);

  // eslint-disable-next-line func-names
/*   Amenitie.associate = function (models) {
    Amenitie.belongsTo(models.Products, {
      foreignKey: 'product_id',
      as: 'Products',
      onDelete: 'NO ACTION',
    });
  }; */

  return Amenitie;
};
