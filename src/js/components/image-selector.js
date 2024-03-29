import { IMAGE_IDS } from "../image-ids.js";
import { addLink } from "./link.js";
import { formatSeconds } from "./timer";
import { getImageScore } from "../score/score-manager.js";
import { addBackArrow } from "./back-arrow";

class ImageSelector extends HTMLElement {
  connectedCallback() {
    const secondsFormatter = formatSeconds();

    addBackArrow(this, { href: "/" });

    const imagesGrid = document.createElement("div");
    imagesGrid.classList.add("images-grid");

    this.appendChild(imagesGrid);

    IMAGE_IDS.forEach((imageId) => {
      const card = document.createElement("div");
      card.classList.add("image-card");

      const image = document.createElement("img");
      image.loading = "lazy";

      image.onload = () => {
        image
          .animate([{ opacity: 1 }], {
            duration: 200,
            fill: "forwards",
            easing: "ease-out",
          })
          .addEventListener("finish", () => {
            card.setAttribute("image-loaded", "");
          });
      };

      import(`../../img/${imageId}/medium.webp`).then((src) => {
        image.src = src.default;
      });

      const overlay = document.createElement("div");
      overlay.classList.add("image-card-overlay");

      card.appendChild(image);
      card.appendChild(overlay);

      const score = getImageScore(imageId);

      if (score) {
        const bestScore = document.createElement("div");
        bestScore.classList.add("image-card-best-score");
        bestScore.appendChild(document.createTextNode("Your best score:"));

        const scoreDisplay = document.createElement("div");
        scoreDisplay.classList.add("image-card-score");
        scoreDisplay.appendChild(
          document.createTextNode(secondsFormatter(score))
        );

        overlay.appendChild(bestScore);
        overlay.appendChild(scoreDisplay);
      } else {
        const bestScore = document.createElement("div");
        bestScore.classList.add("image-card-best-score");
        bestScore.appendChild(document.createTextNode("No best score yet"));

        overlay.appendChild(bestScore);
      }

      const playButton = addLink(overlay, {
        child: document.createTextNode("Play!"),
        href: `/image/${imageId}`,
        padded: true,
      });
      playButton.classList.add("button", "button-rounded");

      imagesGrid.appendChild(card);
    });
  }
}

export const registerImageSelector = () => {
  window.customElements.define("image-selector", ImageSelector);
};

export const displayImageSelector = (container) => {
  const imageSelector = document.createElement("image-selector");

  container.appendChild(imageSelector);

  return imageSelector;
};
