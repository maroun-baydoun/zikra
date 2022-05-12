export const makePiece = () => {
  const piece = document.createElement("button");
  piece.classList.add("piece");

  return piece;
};

/**
 * @param {number} gridComplexity The number of cells that a grid has per row/column
 * @returns
 */
export const getPieceDimensions =
  (gridComplexity) =>
  /**
   * @param {number} imageWidth
   * @param {number} imageHeight
   */
  (imageWidth, imageHeight) => {
    return [imageWidth / gridComplexity, imageHeight / gridComplexity];
  };

/**
 * @param {number} gridComplexity The number of cells that a grid has per row/column
 * @returns
 */
export const getPieceXY =
  (gridComplexity) =>
  /**
   * @param {number} pieceWidth
   * @param {number} pieceHeight
   * @param {number} pieceIndex
   */
  (pieceWidth, pieceHeight, pieceIndex) => {
    const positionX =
      pieceWidth *
      (pieceIndex - Math.floor(pieceIndex / gridComplexity) * gridComplexity);
    const positionY = pieceHeight * Math.floor(pieceIndex / gridComplexity);

    return [positionX, positionY];
  };

/**
 *
 * @param {HTMLButtonElement} piece
 * @param {*} propertiesToAnimate
 * @param {*} animationTiming
 * @returns The move animation object
 */
export const movePiece =
  (onFinish) =>
  (
    piece,
    { positionX, positionY, finalPositionX, finalPositionY },
    { duration, delay }
  ) => {
    const animation = piece.animate(
      [
        {
          transform: `translate3d(${positionX}px, ${positionY}px, 0)`,
        },

        {
          transform: `translate3d(${finalPositionX}px, ${finalPositionY}px, 0)`,
        },
      ],
      { duration, delay, iterations: 1, fill: "forwards" }
    );

    animation.addEventListener("finish", () => onFinish(piece));

    return animation;
  };

/**
 * @param {HTMLDivElement} piece
 */
export const resetPiecePositionXY = (piece) => {
  const pieceStyle = getComputedStyle(piece);

  piece.style.setProperty(
    "--position-x",
    pieceStyle.getPropertyValue("--final-position-x")
  );
  piece.style.setProperty(
    "--position-y",
    pieceStyle.getPropertyValue("--final-position-y")
  );

  piece.style.removeProperty("--final-position-x");
  piece.style.removeProperty("--final-position-y");
};
