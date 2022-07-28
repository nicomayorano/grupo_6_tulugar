/* eslint-disable no-undef */
const INPUT_ERROR = '0 0 0.5rem #b7312d';

function badInput(elem, errorField, errorText = '') {
  const input = elem;
  input.focus();
  input.style.boxShadow = INPUT_ERROR;
  const span = document.querySelector(`#${errorField}`);
  span.innerText = errorText;
}

function goodInput(elem, error) {
  const input = elem;
  input.style.boxShadow = 'none';
  const span = document.querySelector(`#${error}`);
  span.innerText = '';
}

window.addEventListener('load', () => {
  const maxGuests = document.querySelector('#max_guests');
  maxGuests.addEventListener('change', () => {
    if (!validator.isInt(maxGuests.value, { gt: 0, lt: 16 })) {
      badInput(maxGuests, 'guests-error', 'Entre 1 y 15 huéspedes');
    } else {
      goodInput(maxGuests, 'guests-error');
    }
  });

  const price = document.querySelector('#price');
  price.addEventListener('change', () => {
    if (!validator.isInt(price.value, { gt: 0 })) {
      badInput(price, 'price-error', 'Debe ser mayor a cero');
    } else {
      goodInput(price, 'price-error');
    }
  });

  const description = document.querySelector('#description');
  description.addEventListener('change', () => {
    if (!validator.isLength(description.value, { min: 20, max: 200 })) {
      badInput(description, 'description-error', 'Debe contener entre 20 y 200 caracteres');
    } else {
      goodInput(description, 'description-error');
    }
  });

  const images = document.querySelector('#images');
  const validTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp', 'image/webp', 'image/gif'];
  images.addEventListener('change', () => {
    for (let i = 0; i < images.files.length; i += 1) {
      if (!validTypes.includes(images.files[i].type)) {
        badInput(images, 'image-error', `Imagen ${i + 1}: formato incorrecto`);
      } else {
        goodInput(images, 'image-error');
      }
    }
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const typeSelect = document.querySelector('#select-type');
    if (!typeSelect.value) {
      badInput(typeSelect, 'type-error', 'Debe seleccionar un tipo');
      typeSelect.addEventListener('input', () => {
        goodInput(typeSelect, 'type-error');
      });
    }

    if (!validator.isInt(maxGuests.value, { gt: 0, lt: 16 })) {
      badInput(maxGuests, 'guests-error', 'Entre 1 y 15 huéspedes');
      maxGuests.addEventListener('input', () => {
        goodInput(maxGuests, 'guests-error');
      });
    }

    if (!validator.isInt(price.value, { gt: 0 })) {
      badInput(price, 'price-error', 'Debe ser mayor a cero');
      price.addEventListener('input', () => {
        goodInput(price, 'price-error');
      });
    }

    if (!validator.isLength(description.value, { min: 20, max: 200 })) {
      badInput(description, 'description-error', 'Debe contener entre 20 y 200 caracteres');
      description.addEventListener('input', () => {
        goodInput(description, 'description-error');
      });
    }

    const provinceSelect = document.querySelector('#province');
    if (!provinceSelect.value) {
      badInput(provinceSelect, 'province-error', 'Debe seleccionar una provincia');
      provinceSelect.addEventListener('input', () => {
        goodInput(provinceSelect, 'province-error');
      });
    }

    const city = document.querySelector('#city');
    if (!city.value) {
      badInput(city, 'city-error', 'Debe seleccionar una ciudad');
      city.addEventListener('input', () => {
        goodInput(city, 'city-error');
      });
    }

    const address = document.querySelector('#address');
    if (!address.value) {
      badInput(address, 'address-error', 'Debe seleccionar una dirección');
      address.addEventListener('input', () => {
        goodInput(address, 'address-error');
      });
    }

    for (let i = 0; i < images.files.length; i += 1) {
      if (!validTypes.includes(images.files[i].type)) {
        badInput(images, 'image-error', `Imagen ${i + 1}: formato incorrecto`);
      } else {
        goodInput(images, 'image-error');
      }
    }

    if (
      typeSelect.value
      && validator.isInt(maxGuests.value, { gt: 0, lt: 16 })
      && validator.isInt(price.value, { gt: 0 })
      && validator.isLength(description.value, { min: 20, max: 200 })
      && provinceSelect.value
      && city.value
      && address.value) {
      form.submit();
    }
  });
});
