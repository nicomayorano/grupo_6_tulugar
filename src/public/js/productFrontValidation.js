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
});
