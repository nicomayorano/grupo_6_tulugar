/* eslint-disable no-undef */

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

function searchFromInput() {
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
const addressInput = document.querySelector('#address');
addressInput.addEventListener('input', searchFromInput);

function searchFromDatabase() {
  const 
}
