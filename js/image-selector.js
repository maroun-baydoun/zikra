import { IMAGE_IDS } from "./image-ids.js";

class ImageSelector extends HTMLElement {
  onImageSelected(clickEvent) {
    const { target } = clickEvent;

    const button = target.closest("button");

    if (!button) {
      return;
    }

    const imageId = button.dataset.imageId;

    const imageSelectedEvent = new CustomEvent("image-selected", {
      detail: imageId,
    });

    this.dispatchEvent(imageSelectedEvent);
  }

  connectedCallback() {
    IMAGE_IDS.forEach((imageId) => {
      const button = document.createElement("button");
      button.dataset.imageId = imageId;

      const image = document.createElement("img");
      image.src = `/img/${imageId}/medium.jpg`;

      button.appendChild(image);

      this.appendChild(button);
    });

    this.addEventListener("click", this.onImageSelected);
  }
}

window.customElements.define("image-selector", ImageSelector);

export const displayImageSelector = () => {
  const container = document.querySelector(".container");

  const imageSelector = document.createElement("image-selector");
  imageSelector.classList.add("image-selector");

  container.appendChild(imageSelector);

  return imageSelector;
};

export const removeImageSelector = () => {
  const imageSelector = document.querySelector("image-selector");

  if (!imageSelector) {
    return;
  }

  imageSelector.remove();
};
