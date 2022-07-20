import { addImageContainer } from "./image-container.js";
import { addTimer } from "./timer.js";
import { addLoader } from "./loader.js";

class PuzzleContainer extends HTMLElement {
  connectedCallback() {
    const imageId = this.getAttribute("image-id");

    const gameTimer = addTimer(this);

    const loader = addLoader(this);

    const imageContainer = addImageContainer({ imageId }, this);

    imageContainer.addEventListener("image-loaded", () => {
      loader.remove();

      this.scrollIntoView();
    });

    imageContainer.addEventListener("shuffle-done", () => {
      gameTimer.start();
    });

    imageContainer.addEventListener("puzzle-solved", () => {
      gameTimer.stop();
    });
  }
}

window.customElements.define("puzzle-container", PuzzleContainer);

export const addPuzzleContainer = ({ imageId }) => {
  const container = document.querySelector(".container");

  const puzzleContainer = document.createElement("puzzle-container");
  puzzleContainer.setAttribute("image-id", imageId);
  container.appendChild(puzzleContainer);

  return puzzleContainer;
};
