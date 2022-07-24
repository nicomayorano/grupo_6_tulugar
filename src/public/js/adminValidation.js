window.addEventListener('load', () => {
  const formulario = document.querySelector('form.adminForm');
  const nombre = document.querySelector('input.name');
  const password = document.querySelector('input.password');
  formulario.addEventListener('submit', (event) => {
    if (nombre.value !== 'admin' && password.value !== '123') {
      event.preventDefault();
    }
  });
});
