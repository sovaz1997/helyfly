const modal = document.querySelector(".modal");
const modalButtons = document.querySelectorAll(".modal-button");

let activeSlider = 0;

const sliderItems = document.querySelectorAll(".slider-item");
const sliderButtons = document.querySelectorAll(".slider__selector");
const sliderLeftButton = document.querySelector(".slider__button--left");
const sliderRightButton = document.querySelector(".slider__button--right");


const arrayToggle = (arr, className, pos) => {
  for(let i = 0; i < sliderItems.length; ++i) {
    arr[i].classList.toggle(className, i === pos);
  }
}

const updateSliderPosition = () => {
  arrayToggle(sliderItems, "slider-item--active", activeSlider);
  arrayToggle(sliderButtons, "slider__selector--active", activeSlider);
}

updateSliderPosition();

const sliderNext = () => {
  activeSlider += 1;
  activeSlider %= sliderItems.length;
  updateSliderPosition();
}

const sliderPrev = () => {
  activeSlider--;

  if(activeSlider < 0) {
    activeSlider = sliderItems.length - 1;
  }
  updateSliderPosition();
}

sliderLeftButton.addEventListener("click", sliderPrev);
sliderRightButton.addEventListener("click", sliderNext);

const openModal = () => {
  modal.classList.remove("modal--closed");

  const modalClose = modal.querySelector(".modal__close");

  const closeModal = () => {
    modal.classList.add("modal--closed");

    modalClose.removeEventListener("click");
    document.removeEventListener("keydown");
  }

  const escKeyDown = (e) => {
    if(e.code === "Escape") {
      closeModal();
    }
  }

  modalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", escKeyDown);
}


for(let i = 0; i < modalButtons.length; ++i) {
  modalButtons[i].addEventListener("click", openModal);
}