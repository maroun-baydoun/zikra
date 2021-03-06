import { shuffleArray } from "./array.js";
import { resizeImage } from "./image.js";
import { makePiece, getPieceDimensions } from "./piece.js";

class ImageContainer extends HTMLElement {
  constructor() {
    super();

    this.firstSelectedPiece = null;
    this.secondSelectedPiece = null;
  }

  onSelected(event) {
    event.preventDefault();

    const { target } = event;

    const piece = target.closest("image-piece");

    if (!piece) {
      return;
    }

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

    this.flip(400, 1000);
  }

  flip(duration, delay, callback) {
    const inner = this.querySelector(".pieces-container-inner");

    if (!inner) {
      return;
    }

    const animation = inner.animate(
      [
        {
          transform: "none",
        },

        {
          transform: "rotateY(180deg)",
        },
      ],
      { duration, delay, iterations: 1, fill: "forwards" }
    );

    animation.addEventListener("finish", () => {
      callback && callback();
    });

    return animation;
  }

  displayResult({ time }) {
    const back = this.querySelector(".pieces-container-back");

    if (!back) {
      return;
    }

    const finished = document.createElement("div");
    finished.classList.add("pieces-container-finished");
    finished.appendChild(document.createTextNode("You finished in:"));

    const score = document.createElement("div");
    score.classList.add("pieces-container-score");
    score.appendChild(document.createTextNode(time));

    back.appendChild(finished);
    back.appendChild(score);
  }

  connectedCallback() {
    const image = new Image();

    const inner = document.createElement("div");
    inner.classList.add("pieces-container-inner");

    const front = document.createElement("div");
    front.classList.add("pieces-container-front");

    const back = document.createElement("div");
    back.classList.add("pieces-container-back");

    inner.appendChild(front);
    inner.appendChild(back);

    this.appendChild(inner);

    image.onload = () => {
      const maxWidth = Number.parseFloat(this.getAttribute("max-width"));
      const maxHeight = Number.parseFloat(this.getAttribute("max-height"));

      resizeImage(maxWidth, maxHeight)(image);

      this.style.setProperty("--width", `${image.width}px`);
      this.style.setProperty("--height", `${image.height}px`);

      const getPieceDimensionsFn = getPieceDimensions(4);

      const [width, height] = getPieceDimensionsFn(image.width, image.height);

      const {
        width: backgroundWidth,
        height: backgroundHeight,
        src: backgroundImage,
      } = image;

      const indices = [...Array(16).keys()];
      const randomIndices = shuffleArray([...indices]);

      const makePieceForGridComplexity = makePiece(4);

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

        front.appendChild(piece);
        piece.move(300, 1000, () => {
          numberOfPiecesDoneSuffling++;

          if (numberOfPiecesDoneSuffling === 16) {
            const shuffleDoneEvent = new CustomEvent("shuffle-done");
            this.dispatchEvent(shuffleDoneEvent);

            this.addEventListener("touchstart", this.onSelected);
            this.addEventListener("click", this.onSelected);
          }
        });
      }

      const imageLoadedEvent = new CustomEvent("image-loaded");
      this.dispatchEvent(imageLoadedEvent);
    };

    const imageId = this.getAttribute("image-id");

    import(`../img/${imageId}/large.webp`).then((src) => {
      image.src = src.default;

      this.style.setProperty("--background-image", `url(${image.src})`);
    });
  }
}

window.customElements.define("image-container", ImageContainer);

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
