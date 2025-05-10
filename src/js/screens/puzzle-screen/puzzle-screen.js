import { Mediaq } from "mediaq";
import { addImageContainer } from "../../components/image-container.js";
import { addTimer, formatSeconds } from "../../components/timer.js";
import { addPauseButton } from "../../components/pause-button";
import { addLoader } from "../../components/loader.js";
import { setImageScore, getImageScore } from "../../score/score-manager.js";
import { showMask } from "../../mask.js";

import "./style.css";

class PuzzleScreen extends HTMLElement {
  constructor() {
    super();

    this.onMediaQueryMatchUpdate = this.onMediaQueryMatchUpdate.bind(this);
    this.onPlayAgain = this.onPlayAgain.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
  }

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

      this.setAttribute("solved", "");
      this.removeAttribute("started");

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

    this.imageContainer.addEventListener("play-again", this.onPlayAgain);
  }

  onPlayAgain() {
    this.gameTimer.reset();

    this.removeAttribute("started");
    this.removeAttribute("solved");

    this.imageContainer.remove();

    this.displayImageContainer();
  }

  onBeforeUnload(event) {
    event.preventDefault();
    return (event.returnValue = "");
  }

  onMediaQueryMatchUpdate({ name, matches }) {
    if (name === "landscape") {
      if (matches) {
        const turn = document.createElement("div");
        turn.classList.add("mask-text");
        turn.appendChild(
          document.createTextNode("You can only play in portrait"),
        );
        try {
          const dismiss = showMask([turn]);
          this.dismissMask = dismiss;
          this.gameTimer.stop();
        } catch {}
      } else {
        if (this.dismissMask) {
          this.dismissMask();
          this.gameTimer.start();
        }
      }
    }
  }

  onVisibilityChange() {
    if (window.document.visibilityState === "hidden") {
      this.pause();
    }
  }

  pause() {
    if (this.hasAttribute("solved")) {
      return;
    }

    const paused = document.createElement("div");
    paused.classList.add("mask-text");
    paused.appendChild(document.createTextNode("Paused"));

    const resumeButton = document.createElement("za-button");
    resumeButton.setAttribute("padded", true);
    resumeButton.setAttribute("rounded", true);
    resumeButton.append("Continue");

    resumeButton.addEventListener("click", () => {
      if (this.dismissMask) {
        this.dismissMask();
      }
      this.gameTimer.start();
    });

    const playAgainButton = document.createElement("za-button");
    playAgainButton.setAttribute("padded", true);
    playAgainButton.setAttribute("rounded", true);
    playAgainButton.append("Try again!");

    playAgainButton.addEventListener("click", () => {
      if (this.dismissMask) {
        this.dismissMask();
      }
      this.onPlayAgain();
    });

    const giveUpButton = document.createElement("za-button");
    giveUpButton.setAttribute("href", "/images");
    giveUpButton.setAttribute("padded", true);
    giveUpButton.setAttribute("rounded", true);
    giveUpButton.append("Give up");

    try {
      const dismiss = showMask([
        paused,
        resumeButton,
        playAgainButton,
        giveUpButton,
      ]);
      this.dismissMask = dismiss;

      this.gameTimer.stop();
    } catch {}
  }

  connectedCallback() {
    this.mediaq = Mediaq({
      onUpdate: this.onMediaQueryMatchUpdate,
      mediaQueries: [
        {
          name: "landscape",
          media:
            "screen and (max-device-width: 1024px) and (orientation: landscape)",
        },
      ],
    });

    window.addEventListener("beforeunload", this.onBeforeUnload);
    window.document.addEventListener(
      "visibilitychange",
      this.onVisibilityChange,
    );

    this.pauseButton = addPauseButton(this);

    this.gameTimer = addTimer(this);

    this.loader = addLoader(this);

    this.mediaq.start();

    this.pauseButton.addEventListener("click", () => {
      this.pause();
    });

    this.displayImageContainer();
  }

  disconnectedCallback() {
    this.mediaq?.stop();
    window.removeEventListener("beforeunload", this.onBeforeUnload);
    window.document.removeEventListener(
      "visibilitychange",
      this.onVisibilityChange,
    );
  }
}

export const registerPuzzleScreen = () => {
  window.customElements.define("puzzle-screen", PuzzleScreen);
};

export const addPuzzleScreen = (container, { imageId }) => {
  const puzzleScreen = document.createElement("puzzle-screen");
  puzzleScreen.setAttribute("image-id", imageId);
  container.appendChild(puzzleScreen);

  return puzzleScreen;
};
