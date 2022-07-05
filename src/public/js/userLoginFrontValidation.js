/* eslint-disable no-self-assign */
window.addEventListener('load', () => {
  let emailFalse = false;
  let passwordFalse = false;

  const form = document.querySelector('form');
  const email = document.querySelector('#email');
  const errorMessageEmail = document.querySelector('#errorM');
  const password = document.querySelector('#password');
  const errorMessagePass = document.querySelector('#errorP');
  const button = document.querySelector('#ingresa-button');

  email.addEventListener('change', function () {
    const inputValue = this.value;
    if (inputValue.trim() == '' || !inputValue.includes('@')) {
      email.style.border = 'red 2px dashed';
      errorMessageEmail.innerText = 'Debes escribir tu email';
      emailFalse = true;
      button.style.backgroundColor = 'grey';
      button.style.cursor = 'not-allowed';
    } else {
      email.style.border = 'green 2px solid';
      errorMessageEmail.innerText = '';
      button.style = button.style;
    }
  });

  password.addEventListener('change', function () {
    const inputValue = this.value;
    if (inputValue.trim() == '') {
      errorMessagePass.innerText = 'Debes escribir tu contraña';
      password.style.border = 'red 2px dashed';
      passwordFalse = true;
      button.style.backgroundColor = 'grey';
      button.style.cursor = 'not-allowed';
    } else {
      password.style.border = 'green 2px solid';
      errorMessagePass.innerText = '';
      button.style = button.style;
    }
  });

  form.addEventListener('submit', (event) => {
    if (emailFalse || passwordFalse) {
      event.preventDefault();
    }
  });
});
