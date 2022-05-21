/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-undef */

// Helpers -----------------------------------------------------------------
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

// Google Maps API ---------------------------------------------------------
let map;
let marker;
let geocoder;
function initMap() {
  geocoder = new google.maps.Geocoder();
  const defaultLocation = new google.maps.LatLng(-34.603851, -58.381775);
  map = new google.maps.Map(document.getElementById('map'), {
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
function codeAddress() {
  const address = `${document.getElementById('address').value} ${document.getElementById('city').value} ${document.getElementById('province').value}`;
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
window.initMap = initMap;
window.codeAddress = codeAddress;

// Fetch cities ------------------------------------------------------------
function enableCityField() {
  document.getElementById('city').removeAttribute('disabled');
}
window.enableCityField = enableCityField;

async function displayCities(prom) {
  const nombres = [];
  for (let i = 0; i < prom.cantidad; i += 1) {
    nombres.push(upperCaseToProperCase(prom.localidades[i].nombre));
  }
  const options = addOptionsToArray(nombres);
  document.getElementById('city-datalist').replaceChildren(...options);
}
function fetchCities() {
  const city = document.getElementById('city').value;
  if (city.length > 3) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const params = new URLSearchParams({
      provincia: document.getElementById('province').value,
      nombre: document.getElementById('city').value,
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

// Product images preview --------------------------------------------------
function previewImages() {
  document.getElementById('submit-preview-images').replaceChildren();
  const images = document.getElementById('images');
  for (let i = 0; i < images.files.length; i += 1) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'preview-image-wrapper');
    wrapper.setAttribute('id', `preview-image-wrapper${i}`);
    document.getElementById('submit-preview-images').appendChild(wrapper);
    const image = document.createElement('img');
    image.setAttribute('class', 'preview');
    image.setAttribute('src', URL.createObjectURL(images.files[i]));
    document.getElementById(`preview-image-wrapper${i}`).appendChild(image);
  }
}
function stopLink(event) {
  event.preventDefault();
}
function displayImagesForm() {
  if (window.confirm('Si continúa se perderán las imágenes guardadas. ¿Desea continuar?')) {
    const button = document.getElementById('edit-form-images-button');
    button.addEventListener('click', stopLink);
    button.style.display = 'none';
    const imagesWrapper = document.getElementById('edit-form-images-wrapper');
    imagesWrapper.style.display = 'block';
    document.getElementById('submit-preview-images').replaceChildren();
  }
}
window.previewImages = previewImages;
window.displayImagesForm = displayImagesForm;

// On page load listeners --------------------------------------------------
function loadPageListeners() {
  const city = document.getElementById('city');
  city.addEventListener('input', debounce(fetchCities, 500));
}
document.addEventListener('DOMContentLoaded', loadPageListeners);
