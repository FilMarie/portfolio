const TOTAL_SLIDES = 24;

function openSliderModal(currentSlideId) {
  window.currentSlideId = currentSlideId;

  const body = document.querySelector("body");
  body.style.overflow = 'hidden';

  const slider = document.querySelector('#slider')
  slider.classList.add('open');

  const slide = document.querySelector(`[data-slide-id="${currentSlideId}"]`);
  slide.classList.add('active');
}

function closeSliderModal() {
  const { currentSlideId } = window;
  const body = document.querySelector("body");
  body.style.overflow = 'initial';

  const slider = document.querySelector('#slider')
  slider.classList.remove('open');

  let slide = document.querySelector(`[data-slide-id="${currentSlideId}"]`);
  slide.classList.remove('active');
}

function addSlideImageTags() {
  const allSlides = [...Array(TOTAL_SLIDES).keys()];
  window.allSlides = allSlides;
  const slideContainer = document.querySelector('#slides');
  allSlides.forEach((slideId) => {
    const slide = document.createElement('img');
    const src = `./img/portfolio/slides/${slideId}.png`;
    slide.setAttribute('src', src);
    slide.setAttribute('class', 'slide');
    slide.setAttribute('data-slide-id', slideId.toString());
    slideContainer.append(slide);
  })
}

function setDisabledControls() {
  const { currentSlideId } = window;
  const prev = document.querySelector('#prev');
  const next = document.querySelector('#next');
  if (currentSlideId % 2 === 0) {
    prev.classList.add('disabled');
    next.classList.remove('disabled');

  }
  if ((currentSlideId + 1) % 2 === 0) {
    next.classList.add('disabled');
    prev.classList.remove('disabled');
  }
}

function showPrevSlide() {
  const { currentSlideId } = window;
  let slide = document.querySelector(`[data-slide-id="${currentSlideId}"]`);
  slide.classList.remove('active');

  let slideId;
  if (currentSlideId === 0) {
    slideId = TOTAL_SLIDES - 1;
  } else {
    slideId = currentSlideId - 1;
  }

  window.currentSlideId = slideId;
  slide = document.querySelector(`[data-slide-id="${slideId}"]`);
  slide.classList.add('active');
  setDisabledControls()
}

function showNextSlide() {
  const { currentSlideId } = window;
  let slide = document.querySelector(`[data-slide-id="${currentSlideId}"]`);
  slide.classList.remove('active');

  let slideId;
  if (currentSlideId === TOTAL_SLIDES - 1) {
    slideId = 0;
  } else {
    slideId = currentSlideId + 1;
  }

  window.currentSlideId = slideId;
  slide = document.querySelector(`[data-slide-id="${slideId}"]`);
  slide.classList.add('active');
  setDisabledControls()
}


(function main() {
  addSlideImageTags();
  const buttons = document.querySelectorAll('.review');
  buttons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      openSliderModal(index * 2);
      setDisabledControls();
    })
  })

  const closeBtn = document.querySelector('#close');
  closeBtn.addEventListener('click', closeSliderModal);

  const prevBtn = document.querySelector('#prev');
  prevBtn.addEventListener('click', showPrevSlide);

  const nextBtn = document.querySelector('#next');
  nextBtn.addEventListener('click', showNextSlide);
})()
