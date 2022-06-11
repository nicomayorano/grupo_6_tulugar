module.exports = (sequelize, dataType) => {

    let alias = "Bookings";
    let cols = {
        product_id: {
            type: dataType.INTEGER.UNSIGNED,
            allowNull: false
        },
        user_id: {
            type: dataType.INTEGER.UNSIGNED,
            allowNull: false
        },
        checkin: {
            type: dataType.STRING(45)
        },
        checkout: {
            type: dataType.STRING(45)
        },
        price: {
            type: dataType.STRING(45)
        },
        status: {
            type: dataType.STRING(10)
        }
    } ;

    let config = {
        tableName: "Bookings",
        timestamps: false// ?
    };

    const Booking = sequelize.define(alias, cols, config);
    return Booking;
}