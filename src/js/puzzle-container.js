import { addImageContainer } from "./image-container.js";
import { addTimer, formatSeconds } from "./timer.js";
import { addBackArrow } from "./back-arrow";
import { addPauseButton } from "./pause-button";
import { addLoader } from "./loader.js";
import { setImageScore, getImageScore } from "./score/score-manager.js";

class PuzzleContainer extends HTMLElement {
  connectedCallback() {
    const imageId = this.getAttribute("image-id");

    const backArrow = addBackArrow(this, { href: "/images" });

    const pauseButton = addPauseButton(this);

    const gameTimer = addTimer(this);

    const loader = addLoader(this);

    const imageContainer = addImageContainer({ imageId }, this);

    pauseButton.addEventListener("click", () => {
      const mask = document.createElement("div");
      mask.classList.add("mask");

      const paused = document.createElement("div");
      paused.classList.add("mask-text");
      paused.appendChild(document.createTextNode("Paused"));

      const resumeButton = document.createElement("button");
      resumeButton.classList.add("button", "button-rounded", "button-padded");
      resumeButton.appendChild(document.createTextNode("Continue"));

      resumeButton.addEventListener("click", () => {
        mask.remove();
        gameTimer.start();
      });

      mask.appendChild(paused);
      mask.appendChild(resumeButton);

      document.body.appendChild(mask);

      gameTimer.stop();
    });

    imageContainer.addEventListener("image-loaded", (e) => {
      const { width, height } = e.detail;

      this.style.setProperty("--width", `${width}px`);
      this.style.setProperty("--height", `${height}px`);

      this.setAttribute("loaded", "");

      loader.remove();
    });

    imageContainer.addEventListener("shuffle-done", () => {
      gameTimer.start();
      this.setAttribute("started", "");
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
