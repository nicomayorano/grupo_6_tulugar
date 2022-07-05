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

async function databasePositioning() {
  const rawData = await fetch(`/api${window.location.pathname}`);
  const data = await rawData.json();
  const address = `${data.address} ${data.city} ${data.province}`;
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

function setFirstItemAsActive() {
  const carouselInners = document.querySelector('.carousel-inner');
  if (carouselInners instanceof Element) {
    carouselInners.children[0].setAttribute('class', 'carousel-item active');
  } else {
    for (let i = 0; i < carouselInners.length; i += 1) {
      carouselInners[i].children[0].setAttribute('class', 'carousel-item active');
    }
  }
}

const body = document.querySelector('body');
const main = document.querySelector('main');
main.onload = setFirstItemAsActive;
body.onload = databasePositioning;
