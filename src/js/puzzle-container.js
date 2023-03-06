import { addImageContainer } from "./image-container.js";
import { addTimer, formatSeconds } from "./timer.js";
import { addBackArrow } from "./back-arrow";
import { addPauseButton } from "./pause-button";
import { addLoader } from "./loader.js";
import { setImageScore, getImageScore } from "./score/score-manager.js";

class PuzzleContainer extends HTMLElement {
  displayImageContainer() {
    const imageId = this.getAttribute("image-id");

    this.imageContainer = addImageContainer({ imageId }, this);

    this.imageContainer.addEventListener("image-loaded", (e) => {
      const { width, height } = e.detail;

      this.style.setProperty("--width", `${width}px`);
      this.style.setProperty("--height", `${height}px`);

      this.setAttribute("loaded", "");

      this.loader.remove();
    });

    this.imageContainer.addEventListener("shuffle-done", () => {
      this.gameTimer.start();
      this.setAttribute("started", "");
    });

    this.imageContainer.addEventListener("puzzle-solved", () => {
      this.gameTimer.stop();
      this.gameTimer.fadeOut(300, 200);

      this.setAttribute("solved", "");

      const bestTime = getImageScore(imageId);
      if (!bestTime || this.gameTimer.seconds < bestTime) {
        setImageScore(imageId, this.gameTimer.seconds);
      }

      const secondsFormatter = formatSeconds();

      this.imageContainer.displayResult({
        time: secondsFormatter(this.gameTimer.seconds),
        bestTime: secondsFormatter(bestTime),
      });
    });

    this.imageContainer.addEventListener("play-again", () => {
      this.gameTimer.reset();
      this.gameTimer.fadeIn(300, 200);

      this.removeAttribute("started");
      this.removeAttribute("solved");

      this.imageContainer.remove();

      this.displayImageContainer();
    });
  }

  onBeforeUnload(event) {
    event.preventDefault();
    return (event.returnValue = "");
  }

  connectedCallback() {
    window.addEventListener("beforeunload", this.onBeforeUnload);

    this.backArrow = addBackArrow(this, { href: "/images" });

    this.pauseButton = addPauseButton(this);

    this.gameTimer = addTimer(this);

    this.loader = addLoader(this);

    this.pauseButton.addEventListener("click", () => {
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
        this.gameTimer.start();
      });

      mask.appendChild(paused);
      mask.appendChild(resumeButton);

      document.body.appendChild(mask);

      this.gameTimer.stop();
    });

    this.displayImageContainer();
  }

  disconnectedCallback() {
    window.removeEventListener("beforeunload", this.onBeforeUnload);
  }
}

window.customElements.define("puzzle-container", PuzzleContainer);

export const addPuzzleContainer = (container, { imageId }) => {
  const puzzleContainer = document.createElement("puzzle-container");
  puzzleContainer.setAttribute("image-id", imageId);
  container.appendChild(puzzleContainer);

  return puzzleContainer;
};
