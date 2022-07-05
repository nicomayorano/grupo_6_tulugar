// eslint-disable-next-line func-names
// window.onload = function () {
// const form = document.querySelector('.form');
// // form.type.focus();//
// form.addEventListener('submit', (event) => {
//   const errors = [];
//   const selectType = document.querySelector('#typeProp');
//   const maxGuests = document.querySelector('#max_guests');
//   const price = document.querySelector('#price');
//   const description = document.querySelector('#description');
// //   const ulErrors = document.querySelector('.frontErrors');
//   if (!selectType.value) {
// //     errors.push('Debes seleccionar el tipo de tu propiedad');
// //     selectType.classList.add('errorsValidationFront');
//   } else {
//     selectType.classList.add('is-valid');
//     selectType.classList.remove('selectType.classList');
//   }
// //   // eslint-disable-next-line eqeqeq
//   if (maxGuests.value == '' || maxGuests.value <= 0) {
//     errors.push('Indicar la cantidad maxima de personas permitida en tu //propiedad');
// //   } else {
// //     selectType.classList.add('is-valid');
//   }
//   // eslint-disable-next-line eqeqeq
//   if (price.value == '') {
//     errors.push('Ponle un valor a la estadia por noche');
//   } else {
//     selectType.classList.add('is-valid');
//   }
//   if (description.value.length > 20) {
//     errors.push('La descripcion es muy corta');
//   } else {
//     selectType.classList.add('is-valid');
//   }//
//   if (errors.length > 0) {
//       console.log(errors)
//      event.preventDefaul();
//      e.stopPropagation();
//      ulErrors.classList.add('errorsValidationFront');
//      for (const e of errors) {
//        ulErrors.innerHTML += `<li>${e}</li>`;
//      }
//    } else {
//      alert('Tu propiedad se ha cargado correctamente');
//    }
//  });
// };
window.addEventListener('load', () => {
  let typeFalse = false;
  let maxGuestsFalse = false;
  let priceFalse = false;
  let descriptionFalse = false;
  let provinceFalse = false;
  let cityFalse = false;
  let addressFalse = false;

  const type = document.querySelector('#select-type');
  const maxGuestsValidation = document.querySelector('#maxGuestsValidation');
  const maxGuests = document.querySelector('#max_guests');
  const priceValidation = document.querySelector('#priceValidation');
  const price = document.querySelector('#price');
  const description = document.querySelector('#description');
  const province = document.querySelector('#province');
  const cityValidation = document.querySelector('#cityValidation');
  const city = document.querySelector('#city');
  const addressValidation = document.querySelector('#addressValidation');
  const address = document.querySelector('#address');

  type.addEventListener('blur', function () {
    const inputValue = this.value;
    if (inputValue.trim() == '') {
      this.style.border = '#b7312d 2px solid';
      typeFalse = false;
    } else {
      type.style.border = 'green 2px solid';
      typeFalse = true;
    }
  });

  maxGuests.addEventListener('blur', function () {
    const inputValue = this.value;
    if (inputValue.trim() == '') {
      this.style.border = '#b7312d 2px solid';
      maxGuestsValidation.innerHTML = 'Debes definir la cantidad maxima de personas permitidas en tu inmueble';
      this.style.color = '#b7312d';
      maxGuestsFalse = false;
    } else {
      maxGuests.style.border = 'green 2px solid';
      maxGuestsFalse = true;
    }
  });

  price.addEventListener('blur', function () {
    const inputValue = this.value;
    if (inputValue.trim() == '') {
      this.style.border = '#b7312d 2px solid';
      priceValidation.innerHTML = 'Debes definir la cantidad maxima de personas permitidas en tu inmueble';
      this.style.color = '#b7312d';
      priceFalse = false;
    } else {
      price.style.border = 'green 2px solid';
      priceFalse = true;
    }
  });
  description.addEventListener('blur', function () {
    const inputValue = this.value;
    if (inputValue.trim() == '') {
      this.style.border = '#b7312d 2px solid';
      description.innerHTML = 'Debes completar la descripcion del inmueble con al menos 20 caracteres';
      this.style.color = '#b7312d';
      descriptionFalse = false;
    } else if (inputValue !== '' && description.value.length > 20) {
      description.innerHTML = '';
      description.style.border = 'solid 2px green';
      descriptionFalse = true;
      this.style.color = 'grey';
    }
  });

  province.addEventListener('blur', function () {
    const inputValue = this.value;
    if (inputValue.trim() == '') {
      this.style.border = '#b7312d 2px solid';
      provinceFalse = false;
    } else {
      province.style.border = 'green 2px solid';
      provinceFalse = true;
    }
  });

  city.addEventListener('blur', function () {
    const inputValue = this.value;
    if (inputValue.trim() == '') {
      this.style.border = '#b7312d 2px solid';
      cityValidation.innerHTML = 'Debes escribir el nombre de la ciudad';
      this.style.color = '#b7312d';
      cityFalse = false;
    } else {
      city.style.border = 'green 2px solid';
      cityFalse = true;
    }
  });

  address.addEventListener('blur', function () {
    const inputValue = this.value;
    if (inputValue.trim() == '') {
      this.style.border = '#b7312d 2px solid';
      addressValidation.innerHTML = 'Debes escribir la direccion de la propiedad';
      this.style.color = '#b7312d';
      addressFalse = false;
    } else {
      address.style.border = 'green 2px solid';
      addressFalse = true;
      this.style.color = 'grey';
    }
  });
});
