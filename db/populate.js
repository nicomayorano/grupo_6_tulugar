/* eslint-disable guard-for-in */
const fs = require('fs');
const path = require('path');
const { Products } = require('../src/database/index');

const AMENITIES = ['wifi', 'room_service', 'breakfast', 'pets', 'garage', 'linens', 'heating', 'air_conditioning', 'pool', 'grill'];
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'products.json')));

for (let i = 0; i < data.length; i += 1) {
  // crear objeto con imagenes
  const imagenes = {};
  for (let j = 0; j < data[i].images.length; j += 1) {
    Object.defineProperty(imagenes, `image${j + 1}`, {
      value: data[i].images[j],
      enumerable: true,
    });
  }

  // crear objeto con amenidades
  const amenidades = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in data[i]) {
    if (AMENITIES.includes(prop)) {
      Object.defineProperty(amenidades, prop, {
        value: 1,
        enumerable: true,
      });
    }
  }

  Products.create({
    user_id: i + 1,
    max_guests: data[i].max_guests,
    price: data[i].price,
    description: data[i].description,
    province: data[i].province,
    city: data[i].city,
    address: data[i].address,
    type: data[i].type,
    Images: imagenes,
    Amenities: amenidades,
  }, {
    include: [{
      association: 'Images',
    }, {
      association: 'Amenities',
    }],
  })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Producto creado');
    });
}
