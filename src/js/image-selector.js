import { IMAGE_IDS } from "./image-ids.js";
import { addLink } from "./link.js";

class ImageSelector extends HTMLElement {
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

      const playButton = addLink(back, {
        child: document.createTextNode("Play!"),
        href: `/image/${imageId}`,
      });
      playButton.classList.add("button", "button-full-width");

      back.appendChild(playButton);

      inner.appendChild(front);
      inner.appendChild(back);

      button.appendChild(inner);

      this.appendChild(button);
    });
  }
}

window.customElements.define("image-selector", ImageSelector);

export const displayImageSelector = (container) => {
  const imageSelector = document.createElement("image-selector");

  container.appendChild(imageSelector);

  return imageSelector;
};
