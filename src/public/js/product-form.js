/* eslint-disable no-undef */
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

function enableCityField() {
  document.getElementById('city').removeAttribute('disabled');
}

function uppercaseToPropercase(phr) {
  let acc = '';
  const phrase = phr.trim().toLowerCase();
  acc += phrase[0];
  for (let i = 1; i < phrase.length; i += 1) {
    if (String(phrase[i]) === ' ') {
      phrase[i + 1] = phrase[i + 1].toUpperCase();
    }
    acc += phrase[i];
  }
  return acc;
}

async function displayCities(prom) {
  const { localidades } = await prom;
  const newChildArray = [];
  for (let i = 0; i < localidades.length; i += 1) {
    const li = document.createElement('option');
    const city = uppercaseToPropercase(localidades[i].nombre);
    li.setAttribute('value', city);
    li.innerHTML = city;
    newChildArray.push(li);
  }
  document.getElementById('city-datalist').replaceChildren(...newChildArray);
}

function fetchCities() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const params = new URLSearchParams({
    provincia: document.getElementById('province').value,
    nombre: document.getElementById('city').value,
    orden: 'nombre',
    campos: 'basico',
    max: 10,
    formato: 'json',
  });

  const req = new Request(`https://apis.datos.gob.ar/georef/api/localidades?${params}`, {
    method: 'GET',
    headers,
  });

  fetch(req)
    .then((res) => {
      displayCities(res.json());
    });
}

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

function getTextareaValue() {
  document.getElementById('description').innerHTML = document.getElementById('description').value;
}

window.initMap = initMap;
window.codeAddress = codeAddress;
window.enableCityField = enableCityField;
window.fetchCities = fetchCities;
window.previewImages = previewImages;
window.getTextareaValue = getTextareaValue;
