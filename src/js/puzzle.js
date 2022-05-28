import { shuffleArray } from "./array.js";
import { resizeImage } from "./image.js";
import {
  makePiece,
  getPieceDimensions,
  getPieceXY,
  movePiece,
  resetPiecePositionXY,
} from "./piece.js";

export const displayPuzzle =
  (container, imageContainer) => (onDisplayed) => (imageId) => {
    const image = new Image();

    image.onload = () => {
      const { width: maxWidth, height: maxHeight } =
        container.getBoundingClientRect();

      resizeImage(maxWidth, maxHeight)(image);

      imageContainer.style.setProperty("--width", `${image.width}px`);
      imageContainer.style.setProperty("--height", `${image.height}px`);

      imageContainer.classList.remove("display-none");

      let firstSelectedPiece = null;

      imageContainer.addEventListener("click", (e) => {
        const { target } = e;

        if (!target.matches(".piece")) {
          return;
        }

        if (!firstSelectedPiece) {
          firstSelectedPiece = target;
          firstSelectedPiece.classList.add("selected");
          return;
        }
        firstSelectedPiece.classList.remove("selected");

        if (firstSelectedPiece === target) {
          firstSelectedPiece = null;
          return;
        }

        const secondSelectedPiece = target;

        const firstSelectedPieceStyle = getComputedStyle(firstSelectedPiece);
        const secondSelectedPieceStyle = getComputedStyle(secondSelectedPiece);

        const firstSelectedPieceCurrentOrder =
          firstSelectedPiece.dataset.currentOrder;

        firstSelectedPiece.style.setProperty(
          "--final-position-x",
          secondSelectedPieceStyle.getPropertyValue("--position-x")
        );

        firstSelectedPiece.style.setProperty(
          "--final-position-y",
          secondSelectedPieceStyle.getPropertyValue("--position-y")
        );

        secondSelectedPiece.style.setProperty(
          "--final-position-x",
          firstSelectedPieceStyle.getPropertyValue("--position-x")
        );

        secondSelectedPiece.style.setProperty(
          "--final-position-y",
          firstSelectedPieceStyle.getPropertyValue("--position-y")
        );

        movePiece(resetPiecePositionXY)(
          firstSelectedPiece,
          {
            positionX: firstSelectedPieceStyle.getPropertyValue("--position-x"),
            positionY: firstSelectedPieceStyle.getPropertyValue("--position-y"),
            finalPositionX:
              secondSelectedPieceStyle.getPropertyValue("--position-x"),
            finalPositionY:
              secondSelectedPieceStyle.getPropertyValue("--position-y"),
          },
          { delay: 0, duration: 300 }
        );

        movePiece(resetPiecePositionXY)(
          secondSelectedPiece,
          {
            positionX:
              secondSelectedPieceStyle.getPropertyValue("--position-x"),
            positionY:
              secondSelectedPieceStyle.getPropertyValue("--position-y"),
            finalPositionX:
              firstSelectedPieceStyle.getPropertyValue("--position-x"),
            finalPositionY:
              firstSelectedPieceStyle.getPropertyValue("--position-y"),
          },
          { delay: 0, duration: 300 }
        );

        firstSelectedPiece.dataset.currentOrder =
          secondSelectedPiece.dataset.currentOrder;
        secondSelectedPiece.dataset.currentOrder =
          firstSelectedPieceCurrentOrder;

        firstSelectedPiece = null;

        const solved = checkGameStatus(imageContainer);

        return solved;
      });

      function checkGameStatus(imageContainer) {
        const pieces = imageContainer.querySelectorAll(".piece");

        for (const piece of pieces) {
          const { order, currentOrder } = piece.dataset;

          if (order !== currentOrder) {
            return false;
          }
        }

        return true;
      }

      const getPieceDimensionsFn = getPieceDimensions(4);
      const getPieceXYFn = getPieceXY(4);

      const [pieceWidth, pieceHeight] = getPieceDimensionsFn(
        image.width,
        image.height
      );

      const indices = [...Array(16).keys()];
      const randomIndices = shuffleArray([...indices]);

      for (let i in indices) {
        const piece = makePiece();

        const [positionX, positionY] = getPieceXYFn(pieceWidth, pieceHeight, i);
        const [finalPositionX, finalPositionY] = getPieceXYFn(
          pieceWidth,
          pieceHeight,
          randomIndices[i]
        );

        piece.style.setProperty("--width", `${pieceWidth}px`);
        piece.style.setProperty("--height", `${pieceHeight}px`);
        piece.style.setProperty("--background-width", `${image.width}px`);
        piece.style.setProperty("--background-height", `${image.height}px`);
        piece.style.setProperty("--position-x", `${positionX}`);
        piece.style.setProperty("--position-y", `${positionY}`);
        piece.style.setProperty("--final-position-x", `${finalPositionX}`);
        piece.style.setProperty("--final-position-y", `${finalPositionY}`);
        piece.style.setProperty("--image-position-x", `${-1 * positionX}px`);
        piece.style.setProperty("--image-position-y", `${-1 * positionY}px`);

        piece.style.setProperty("background-image", `url(${image.src})`);

        piece.dataset.order = i;
        piece.dataset.currentOrder = randomIndices[i];

        movePiece(resetPiecePositionXY)(
          piece,
          {
            positionX,
            positionY,
            finalPositionX,
            finalPositionY,
          },
          { delay: 3000, duration: 500 }
        );

        imageContainer.appendChild(piece);
      }

      onDisplayed && onDisplayed();
    };

    image.src = `img/${imageId}/large.jpg`;
  };
