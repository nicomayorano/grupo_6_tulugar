// eslint-disable-next-line func-names
window.onload = function () {
  const form = document.querySelector('.form');

  form.type.focus();

  form.addEventListener('submit', (event) => {
    const errors = [];

    const selectType = document.querySelector('#typeProp');
    const maxGuests = document.querySelector('#max_guests');
    const price = document.querySelector('#price');
    const description = document.querySelector('#description');
    const ulErrors = document.querySelector('.frontErrors');

    if (!selectType.value) {
      errors.push('Debes seleccionar el tipo de tu propiedad');
      selectType.classList.add('errorsValidationFront');
    } else {
      selectType.classList.add('is-valid');
      selectType.classList.remove('selectType.classList');
    }

    // eslint-disable-next-line eqeqeq
    if (maxGuests.value == '' || maxGuests.value <= 0) {
      errors.push('Indicar la cantidad maxima de personas permitida en tu propiedad');
    } else {
      selectType.classList.add('is-valid');
    }

    // eslint-disable-next-line eqeqeq
    if (price.value == '') {
      errors.push('Ponle un valor a la estadia por noche');
    } else {
      selectType.classList.add('is-valid');
    }

    if (description.value.length > 20) {
      errors.push('La descripcion es muy corta');
    } else {
      selectType.classList.add('is-valid');
    }

    if (errors.length > 0) {
        console.log(errors)
      event.preventDefaul();
      e.stopPropagation();
      ulErrors.classList.add('errorsValidationFront');
      for (const e of errors) {
        ulErrors.innerHTML += `<li>${e}</li>`;
      }
    } else {
      alert('Tu propiedad se ha cargado correctamente');
    }
  });
};
