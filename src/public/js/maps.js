/* eslint-disable no-undef */
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
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

function queryPosition() {
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

function loadPageListeners() {
  const body = document.querySelector('body');
  const addressInput = document.querySelector('#address');

  if (window.location.pathname === '/products/edit') body.addEventListener('load', queryPosition);
  addressInput.addEventListener('input', debounce(queryPosition, 500));
}

document.addEventListener('DOMContentLoaded', loadPageListeners);
