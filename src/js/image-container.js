import { shuffleArray } from "./array.js";
import { resizeImage } from "./image.js";
import { makePiece, getPieceDimensions } from "./piece.js";

class ImageContainer extends HTMLElement {
  constructor() {
    super();

    this.firstSelectedPiece = null;
    this.secondSelectedPiece = null;
  }

  onClicked(event) {
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

    this.firstSelectedPiece.move(300, 0);
    this.secondSelectedPiece.move(300, 0);

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

    alert("You won");
  }

  connectedCallback() {
    const image = new Image();

    image.onload = () => {
      const maxWidth = Number.parseFloat(this.getAttribute("max-width"));
      const maxHeight = Number.parseFloat(this.getAttribute("max-height"));

      resizeImage(maxWidth, maxHeight)(image);

      this.style.setProperty("--width", `${image.width}px`);
      this.style.setProperty("--height", `${image.height}px`);

      this.addEventListener("click", this.onClicked);

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

        this.appendChild(piece);
        piece.move(300, 1000, () => {
          numberOfPiecesDoneSuffling++;

          if (numberOfPiecesDoneSuffling === 16) {
            const shuffleDoneEvent = new CustomEvent("shuffle-done");
            this.dispatchEvent(shuffleDoneEvent);
          }
        });
      }
    };

    const imageId = this.getAttribute("image-id");

    import(`../img/${imageId}/large.jpg`).then((src) => {
      image.src = src.default;
    });
  }
}

window.customElements.define("image-container", ImageContainer);

export const addImageContainer = ({ imageId }, container) => {
  const { width: maxWidth, height: maxHeight } =
    container.getBoundingClientRect();

  const imageContainer = document.createElement("image-container");
  imageContainer.classList.add("image-container");
  imageContainer.setAttribute("image-id", imageId);
  imageContainer.setAttribute("max-width", maxWidth);
  imageContainer.setAttribute("max-height", maxHeight);

  container.appendChild(imageContainer);

  return imageContainer;
};
