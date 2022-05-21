function setFirstCarouselChildAsActive() {
  const carouselInners = document.getElementsByClassName('carousel-inner');
  for (let i = 0; i < carouselInners.length; i += 1) {
    carouselInners[i].children[0].setAttribute('class', 'carousel-item active');
  }
}
window.setFirstCarouselChildAsActive = setFirstCarouselChildAsActive;
