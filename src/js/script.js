"use strict";

var modal = document.querySelector(".modal");
var modalButtons = document.querySelectorAll(".modal-button");
var activeSlider = 0;
var sliderItems = document.querySelectorAll(".slider-item");
var sliderButtons = document.querySelectorAll(".slider__selector");
var sliderLeftButton = document.querySelector(".slider__button--left");
var sliderRightButton = document.querySelector(".slider__button--right");

var arrayToggle = function arrayToggle(arr, className, pos) {
  for (var i = 0; i < sliderItems.length; ++i) {
    arr[i].classList.toggle(className, i === pos);
  }
};

var updateSliderPosition = function updateSliderPosition() {
  arrayToggle(sliderItems, "slider-item--active", activeSlider);
  arrayToggle(sliderButtons, "slider__selector--active", activeSlider);
};

updateSliderPosition();

var sliderNext = function sliderNext() {
  activeSlider += 1;
  activeSlider %= sliderItems.length;
  updateSliderPosition();
};

var sliderPrev = function sliderPrev() {
  activeSlider--;

  if (activeSlider < 0) {
    activeSlider = sliderItems.length - 1;
  }

  updateSliderPosition();
};

sliderLeftButton.addEventListener("click", sliderPrev);
sliderRightButton.addEventListener("click", sliderNext);

var openModal = function openModal() {
  modal.classList.remove("modal--closed");
  var modalClose = modal.querySelector(".modal__close");

  var closeModal = function closeModal() {
    modal.classList.add("modal--closed");
    modalClose.removeEventListener("click");
    document.removeEventListener("keydown");
  };

  var escKeyDown = function escKeyDown(e) {
    if (e.code === "Escape") {
      closeModal();
    }
  };

  modalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", escKeyDown);
};

for (var i = 0; i < modalButtons.length; ++i) {
  modalButtons[i].addEventListener("click", openModal);
}