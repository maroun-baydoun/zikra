import {
  displayImages,
  onImageSelected,
  hideImageSelector,
} from "./image-selector.js";

import { displayPuzzle } from "./puzzle.js";

window.addEventListener("DOMContentLoaded", () => {
  const imageSelector = document.querySelector(".image-selector");
  const container = document.querySelector(".container");
  const imageContainer = document.querySelector(".image-container");

  displayImages(imageSelector);
  onImageSelected(imageSelector)((imageId) => {
    hideImageSelector(imageSelector);

    displayPuzzle(container, imageContainer)(() => {})(imageId);
  });
});
