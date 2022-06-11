module.exports=(sequelize, dataType) =>{
    let alias= 'Images';
    let cols ={
        product_id: {
            type: dataType.INTEGER.UNSIGNED,
            allowNull: false
        },
        image1:{
            type: dataType.STRING(255),
            defaultValue:'default.jpg'
        },
        image2:{
            type: dataType.STRING(255),
        },
        image3:{
            type: dataType.STRING(255),
        },
        image4:{
            type: dataType.STRING(255),
        },
        image5:{
            type: dataType.STRING(255),
        },
        updated_at:{
            type: dataType.DATE
        },
        fk_products_idx:{
            type: dataType.INTEGER,
            foreignkey: true
        }
    };
    let config = {
        tableName:"images",
        timestamps: false
    };

    const Images = sequelize.define(alias, cols, config);

    
        Images.associate = function(models){
        Images.belongsTo(models.Products, {
            as: "products",
            foreignkey: "id"
        });
    }


    return Images
}



//INDEX `fk_images_idx` (`product_id` ASC) VISIBLE,
//CONSTRAINT `fk_images_pid`
  //REFERENCES `tulugar`.`products` (`id`)
  //ON DELETE CASCADE
//  ON UPDATE NO ACTION)

