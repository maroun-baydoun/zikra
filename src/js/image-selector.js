import { IMAGE_IDS } from "./image-ids.js";

export const displayImages = (imageSelector) => {
  IMAGE_IDS.forEach((imageId) => {
    const button = document.createElement("button");
    button.dataset.imageId = imageId;

    const image = document.createElement("img");
    image.src = `img/${imageId}/medium.jpg`;

    button.appendChild(image);
    imageSelector.appendChild(button);
  });
};

export const onImageSelected = (imageSelector) => (callback) => {
  imageSelector.addEventListener("click", (e) => {
    const { target } = e;

    const button = target.closest("button");

    if (!button) {
      return;
    }

    callback && callback(button.dataset.imageId);
  });
};

export const hideImageSelector = (imageSelector) => {
  imageSelector.classList.add("display-none");
};
