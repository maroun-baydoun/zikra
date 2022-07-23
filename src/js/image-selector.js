import { IMAGE_IDS } from "./image-ids.js";

class ImageSelector extends HTMLElement {
  onImageSelected(event) {
    event.preventDefault();

    const { target } = event;

    const isBackOfCardClicked = target.closest(".image-card-back") !== null;

    if (!isBackOfCardClicked) {
      return true;
    }

    const card = target.closest(".image-card");

    if (!card) {
      return;
    }

    const imageId = card.dataset.imageId;

    const imageSelectedEvent = new CustomEvent("image-selected", {
      detail: imageId,
    });

    this.dispatchEvent(imageSelectedEvent);
  }

  connectedCallback() {
    IMAGE_IDS.forEach((imageId) => {
      const button = document.createElement("button");
      button.dataset.imageId = imageId;
      button.classList.add("image-card");

      const inner = document.createElement("div");
      inner.classList.add("image-card-inner");

      const front = document.createElement("div");
      front.classList.add("image-card-front");

      const back = document.createElement("div");
      back.classList.add("image-card-back");

      const image = document.createElement("img");

      import(`../img/${imageId}/medium.webp`).then((src) => {
        image.src = src.default;
      });

      front.appendChild(image);

      const playButton = document.createElement("button");
      playButton.classList.add("play-button");
      playButton.appendChild(document.createTextNode("Play!"));

      back.appendChild(playButton);

      inner.appendChild(front);
      inner.appendChild(back);

      button.appendChild(inner);

      this.appendChild(button);
    });

    this.addEventListener("click", this.onImageSelected);
  }
}

window.customElements.define("image-selector", ImageSelector);

export const displayImageSelector = (container) => {
  const imageSelector = document.createElement("image-selector");

  container.appendChild(imageSelector);

  return imageSelector;
};
