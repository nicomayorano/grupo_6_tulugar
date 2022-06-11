module.exports=(sequelize, dataType) =>{
    let alias= 'Amenities';
    let cols ={
        product_id: {
            type: dataType.INTEGER.UNSIGNED,
            allowNull: false
        },
        wifi:{
            type: dataType.TINYINT.UNSIGNED,
            defaultValue: 0
        },
        room_service:{
            type: dataType.TINYINT.UNSIGNED,
            defaultValue: 0
        },
        breakfast:{
            type: dataType.TINYINT.UNSIGNED,
            defaultValue: 0
        },
        pets:{
            type: dataType.TINYINT.UNSIGNED,
            defaultValue: 0
        },
        garage:{
            type: dataType.TINYINT.UNSIGNED,
            defaultValue: 0
        },
        linens:{
            type: dataType.TINYINT.UNSIGNED,
            defaultValue: 0
        },
        heating:{
            type: dataType.TINYINT.UNSIGNED,
            defaultValue: 0
        },
        air_conditioning:{
            type: dataType.TINYINT.UNSIGNED,
            defaultValue: 0
        },
        pool:{
            type: dataType.TINYINT.UNSIGNED,
            defaultValue: 0
        },
        grill:{
            type: dataType.TINYINT.UNSIGNED,
            defaultValue: 0
        },
        fk_products_idx:{
            type: dataType.INTEGER,
            foreignkey: true
        }
    };
    let config = {
        tableName:"amenities",
        timestamps: false
    };

    const Amenities = sequelize.define(alias, cols, config)
    Amenities.associate = function(models){
        Amenities.belongsTo(models.Products, {
            as: "products",
            foreignkey: "id"
        });
    }


    return Amenities
}
////////////////////////////////
 
   // INDEX `fk_amenities_idx` (`product_id` ASC) INVISIBLE,
   // CONSTRAINT `fk_amenities_pid`

   //   REFERENCES `tulugar`.`products` (`id`)
    //  ON DELETE CASCADE
   //   ON UPDATE NO ACTION)