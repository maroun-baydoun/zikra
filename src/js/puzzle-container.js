import { addImageContainer } from "./image-container.js";
import { addTimer, formatSeconds } from "./timer.js";
import { addBackArrow } from "./back-arrow";
import { addLoader } from "./loader.js";
import { setImageScore, getImageScore } from "./score/score-manager.js";

class PuzzleContainer extends HTMLElement {
  connectedCallback() {
    const imageId = this.getAttribute("image-id");

    const backArrow = addBackArrow(this);

    const gameTimer = addTimer(this);

    const loader = addLoader(this);

    const imageContainer = addImageContainer({ imageId }, this);

    imageContainer.addEventListener("image-loaded", (e) => {
      const { width, height } = e.detail;

      this.style.setProperty("--width", `${width}px`);
      this.style.setProperty("--height", `${height}px`);

      this.setAttribute("loaded", "");

      loader.remove();
    });

    imageContainer.addEventListener("shuffle-done", () => {
      gameTimer.start();
    });

    imageContainer.addEventListener("puzzle-solved", () => {
      gameTimer.stop();
      gameTimer.fadeOut(300, 200);

      const bestTime = getImageScore(imageId);
      if (!bestTime || gameTimer.seconds < bestTime) {
        setImageScore(imageId, gameTimer.seconds);
      }

      const secondsFormatter = formatSeconds();

      imageContainer.displayResult({
        time: secondsFormatter(gameTimer.seconds),
        bestTime: secondsFormatter(bestTime),
      });
    });
  }
}

window.customElements.define("puzzle-container", PuzzleContainer);

export const addPuzzleContainer = (container, { imageId }) => {
  const puzzleContainer = document.createElement("puzzle-container");
  puzzleContainer.setAttribute("image-id", imageId);
  container.appendChild(puzzleContainer);

  return puzzleContainer;
};
