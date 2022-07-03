function setFirstCarouselChildAsActive() {
  const carouselInners = document.querySelectorAll('.carousel-inner');
  if (carouselInners instanceof Element) {
    carouselInners.children[0].setAttribute('class', 'carousel-item active');
  } else {
    for (let i = 0; i < carouselInners.length; i += 1) {
      carouselInners[i].children[0].setAttribute('class', 'carousel-item active');
    }
  }
}

const body = document.querySelector('body');
body.onload = setFirstCarouselChildAsActive;
