import { addImageContainer } from "./image-container.js";

class PuzzleContainer extends HTMLElement {
  connectedCallback() {
    const imageId = this.getAttribute("image-id");

    const gameTimer = document.createElement("game-timer");
    this.appendChild(gameTimer);

    const imageContainer = addImageContainer({ imageId }, this);

    imageContainer.addEventListener("shuffle-done", () => {
      gameTimer.start();
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