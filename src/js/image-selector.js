import { IMAGE_IDS } from "./image-ids.js";
import { addLink } from "./link.js";
import { formatSeconds } from "./timer";
import { getImageScore } from "./score/score-manager.js";

class ImageSelector extends HTMLElement {
  connectedCallback() {
    const secondsFormatter = formatSeconds();

    IMAGE_IDS.forEach((imageId) => {
      const card = document.createElement("div");
      card.classList.add("image-card");

      const image = document.createElement("img");
      image.loading = "lazy";

      image.onload = () => {
        image.animate([{ opacity: 1 }], {
          duration: 200,
          fill: "forwards",
          easing: "ease-out",
        });
      };

      import(`../img/${imageId}/medium.webp`).then((src) => {
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
      });
      playButton.classList.add("button", "button-rounded");

      this.appendChild(card);
    });
  }
}

window.customElements.define("image-selector", ImageSelector);

export const displayImageSelector = (container) => {
  const imageSelector = document.createElement("image-selector");

  container.appendChild(imageSelector);

  return imageSelector;
};
