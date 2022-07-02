/* eslint-disable no-undef */
/* eslint-disable no-console */

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function upperCaseToProperCase(phr) {
  let acc = '';
  let next = false;
  const phrase = phr.trim().toLowerCase();
  acc += phrase[0].toUpperCase();
  for (let i = 1; i < phrase.length; i += 1) {
    if (next) {
      acc += phrase[i].toUpperCase();
      next = false;
    } else {
      if (phrase[i] === ' ') next = true;
      acc += phrase[i];
    }
  }
  return acc;
}

function addOptionsToArray(values) {
  const newChildArray = [];
  if (Array.isArray(values) && values.length) {
    for (let i = 0; i < values.length; i += 1) {
      const opt = document.createElement('option');
      opt.setAttribute('value', String(values[i]));
      opt.innerHTML = String(values[i]);
      newChildArray.push(opt);
    }
  }
  return newChildArray;
}

async function displayCities(prom) {
  const nombres = [];
  for (let i = 0; i < prom.cantidad; i += 1) {
    nombres.push(upperCaseToProperCase(prom.localidades[i].nombre));
  }
  const options = addOptionsToArray(nombres);
  document.querySelector('#city-datalist').replaceChildren(...options);
}

function fetchCities() {
  const city = document.querySelector('#city').value;
  if (city.length > 3) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const params = new URLSearchParams({
      provincia: document.querySelector('#province').value,
      nombre: document.querySelector('#city').value,
      orden: 'nombre',
      campos: 'basico',
      max: 5,
      formato: 'json',
    });

    const req = new Request(`https://apis.datos.gob.ar/georef/api/localidades?${params}`, {
      method: 'GET',
      headers,
    });

    fetch(req)
      .then((res) => res.json())
      .then((res) => {
        displayCities(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function previewImages() {
  document.querySelector('#submit-preview-images').replaceChildren();
  const images = document.querySelector('#images');
  for (let i = 0; i < images.files.length; i += 1) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'preview-image-wrapper');
    wrapper.setAttribute('id', `preview-image-wrapper${i}`);
    document.querySelector('#submit-preview-images').appendChild(wrapper);
    const image = document.createElement('img');
    image.setAttribute('class', 'preview');
    image.setAttribute('src', URL.createObjectURL(images.files[i]));
    document.querySelector(`#preview-image-wrapper${i}`).appendChild(image);
  }
}

function displayImagesForm() {
  // eslint-disable-next-line no-alert
  if (window.confirm('Si continúa se perderán las imágenes guardadas. ¿Desea continuar?')) {
    const button = document.querySelector('#edit-form-images-button');
    button.addEventListener('click', (e) => {
      e.preventDefault();
    });
    button.style.display = 'none';
    const imagesWrapper = document.querySelector('#edit-form-images-wrapper');
    imagesWrapper.style.display = 'block';
    document.querySelector('#submit-preview-images').replaceChildren();
  }
}

function enableCityField() {
  document.querySelector('#city').removeAttribute('disabled');
}

let map;
let marker;
let geocoder;

function initMap() {
  geocoder = new google.maps.Geocoder();
  const defaultLocation = new google.maps.LatLng(-34.603851, -58.381775);
  map = new google.maps.Map(document.querySelector('#map'), {
    zoom: 10,
    center: defaultLocation,
    mapTypeControl: false,
    streetViewControl: false,
  });
  marker = new google.maps.Marker({
    map,
    position: defaultLocation,
  });
}
window.initMap = initMap;

function inputPositioning() {
  const address = `${document.querySelector('#address').value} ${document.querySelector('#city').value} ${document.querySelector('#province').value}`;
  geocoder.geocode({ address }, (results, status) => {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      map.setZoom(16);
      marker.setPosition(results[0].geometry.location);
    } else {
      // eslint-disable-next-line no-alert
      alert(`Geocode was not successful for the following reason: ${status}`);
    }
  });
}

const body = document.querySelector('body');
if (window.location.pathname.includes('/edit')) body.onload = inputPositioning;

// On page load listeners --------------------------------------------------
function loadPageListeners() {
  const cityInput = document.querySelector('#city');
  const imagesInput = document.querySelector('#images');
  const editImagesButton = document.querySelector('#edit-form-images-button');
  const provinceInput = document.querySelector('#province');
  const addressInput = document.querySelector('#address');

  cityInput.addEventListener('input', debounce(fetchCities, 500));
  imagesInput.addEventListener('change', previewImages);
  if (window.location.pathname.includes('/edit')) editImagesButton.addEventListener('click', displayImagesForm);
  if (window.location.pathname.includes('/edit')) body.addEventListener('pageshow', enableCityField);
  if (window.location.pathname === '/products/new') provinceInput.addEventListener('input', enableCityField);
  addressInput.addEventListener('input', debounce(inputPositioning, 500));
}
document.addEventListener('DOMContentLoaded', loadPageListeners);
