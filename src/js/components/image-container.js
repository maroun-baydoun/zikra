import { shuffleArray } from "../array.js";
import { resizeImage } from "../image.js";
import { makePiece, getPieceDimensions } from "./piece.js";
import { getSettings } from "../settings/settings-manager.js";

class ImageContainer extends HTMLElement {
  constructor() {
    super();

    this.firstSelectedPiece = null;
    this.secondSelectedPiece = null;
  }

  onSelected(event) {
    const { target } = event;

    const piece = target.closest("image-piece");

    if (!piece) {
      return;
    }

    event.preventDefault();

    if (!this.firstSelectedPiece) {
      this.firstSelectedPiece = piece;
      this.firstSelectedPiece.setAttribute("selected", true);
      return;
    }

    this.firstSelectedPiece.removeAttribute("selected");

    if (this.firstSelectedPiece === piece) {
      this.firstSelectedPiece = null;
      return;
    }

    this.secondSelectedPiece = piece;

    this.firstSelectedPiece.switchPosition(this.secondSelectedPiece);

    this.firstSelectedPiece.move(200, 0);
    this.secondSelectedPiece.move(200, 0);

    this.firstSelectedPiece = null;

    this.checkGameStatus();
  }

  checkGameStatus() {
    const pieces = this.querySelectorAll("image-piece");

    for (const piece of pieces) {
      if (!piece.isInCorrectOrder()) {
        return;
      }
    }

    const puzzleSolvedEvent = new CustomEvent("puzzle-solved");
    this.dispatchEvent(puzzleSolvedEvent);
  }

  displayResult({ time, bestTime }, callback) {
    const imageId = this.getAttribute("image-id");
    const isNewBestTime = !!bestTime && time < bestTime;

    const overlay = document.createElement("div");
    overlay.classList.add("pieces-container-overlay");

    const finished = document.createElement("div");
    finished.classList.add("pieces-container-finished");
    finished.appendChild(document.createTextNode("You finished in:"));

    const score = document.createElement("div");
    score.classList.add("pieces-container-score");
    score.appendChild(document.createTextNode(time));

    overlay.appendChild(finished);
    overlay.appendChild(score);

    if (bestTime) {
      const finished = document.createElement("div");
      finished.classList.add("pieces-container-finished");
      finished.appendChild(
        document.createTextNode(
          !isNewBestTime ? "Your best time:" : "Your previous best time:"
        )
      );

      const score = document.createElement("div");
      score.classList.add("pieces-container-score");
      score.appendChild(document.createTextNode(bestTime));

      overlay.appendChild(finished);
      overlay.appendChild(score);
    }

    const playAgainButton = document.createElement("button");
    playAgainButton.classList.add("button", "button-rounded", "button-padded");
    playAgainButton.appendChild(document.createTextNode("Try again!"));

    playAgainButton.addEventListener("click", () => {
      const playAgainEvent = new CustomEvent("play-again");
      this.dispatchEvent(playAgainEvent);
    });

    overlay.appendChild(playAgainButton);

    this.appendChild(overlay);

    const animation = overlay.animate(
      [
        {
          opacity: 1,
        },
      ],
      {
        duration: 300,
        delay: 300,
        iterations: 1,
        fill: "forwards",
        easing: "ease-out",
      }
    );

    animation.addEventListener("finish", () => {
      callback && callback();
    });

    if (isNewBestTime) {
      import("canvas-confetti").then((confetti) => {
        confetti.default();
      });
    }

    return animation;
  }

  getComplexity(difficulty) {
    switch (difficulty) {
      case "easy":
        return 4;
      case "medium":
        return 6;
      case "hard":
        return 8;
      default:
        return 4;
    }
  }

  connectedCallback() {
    const { difficulty } = getSettings();

    const complexity = this.getComplexity(difficulty);

    const image = new Image();

    image.onload = () => {
      const maxWidth = Number.parseFloat(this.getAttribute("max-width"));
      const maxHeight = Number.parseFloat(this.getAttribute("max-height"));

      resizeImage(maxWidth, maxHeight)(image);

      this.setAttribute("loaded", "");

      this.style.setProperty("--width", `${image.width}px`);
      this.style.setProperty("--height", `${image.height}px`);

      const imageLoadedEvent = new CustomEvent("image-loaded", {
        detail: { width: image.width, height: image.height },
      });

      this.dispatchEvent(imageLoadedEvent);

      const getPieceDimensionsFn = getPieceDimensions(complexity);

      const [width, height] = getPieceDimensionsFn(image.width, image.height);

      const {
        width: backgroundWidth,
        height: backgroundHeight,
        src: backgroundImage,
      } = image;

      const indices = [...Array(complexity * complexity).keys()];
      const randomIndices = shuffleArray([...indices]);

      const makePieceForGridComplexity = makePiece(complexity);

      let numberOfPiecesDoneSuffling = 0;

      for (let index in indices) {
        const randomIndex = randomIndices[index];
        const piece = makePieceForGridComplexity({
          width,
          height,
          backgroundWidth,
          backgroundHeight,
          backgroundImage,
          index,
          randomIndex,
        });

        this.appendChild(piece);
        piece.move(300, 1000, () => {
          numberOfPiecesDoneSuffling++;

          if (numberOfPiecesDoneSuffling === complexity * complexity) {
            const shuffleDoneEvent = new CustomEvent("shuffle-done");
            this.dispatchEvent(shuffleDoneEvent);

            this.addEventListener("touchstart", this.onSelected);
            this.addEventListener("click", this.onSelected);
          }
        });
      }
    };

    const imageId = this.getAttribute("image-id");

    import(`../../img/${imageId}/large.webp`).then((src) => {
      image.src = src.default;

      this.style.setProperty("--background-image", `url(${image.src})`);
    });
  }
}

export const registerImageContainer = () => {
  window.customElements.define("image-container", ImageContainer);
};

export const addImageContainer = ({ imageId }, container) => {
  const { width: maxWidth, height: maxHeight } =
    container.getBoundingClientRect();

  const imageContainer = document.createElement("image-container");
  imageContainer.setAttribute("image-id", imageId);
  imageContainer.setAttribute("max-width", maxWidth);
  imageContainer.setAttribute("max-height", maxHeight);

  container.appendChild(imageContainer);

  return imageContainer;
};
