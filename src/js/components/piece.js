import { getFloatAttribute, getIntAttribute } from "../dom/attribute.js";

class Piece extends HTMLElement {
  resetXY() {
    this.positionX = this.finalPositionX;
    this.positionY = this.finalPositionY;
  }

  move(duration, delay, callback) {
    const animation = this.animate(
      [
        {
          transform: `translate3d(${this.positionX}px, ${this.positionY}px, 0)`,
        },

        {
          transform: `translate3d(${this.finalPositionX}px, ${this.finalPositionY}px, 0)`,
        },
      ],
      { duration, delay, iterations: 1, fill: "forwards", easing: "ease-in" },
    );

    animation.addEventListener("finish", () => {
      this.resetXY();
      callback && callback();
    });

    return animation;
  }

  switchPosition(otherPiece) {
    const { positionX, positionY, currentOrder } = this;
    const {
      positionX: otherPositionX,
      positionY: otherPositionY,
      currentOrder: otherCurrentOrder,
    } = otherPiece;

    this.finalPositionX = otherPositionX;
    this.finalPositionY = otherPositionY;
    this.currentOrder = otherCurrentOrder;

    otherPiece.finalPositionX = positionX;
    otherPiece.finalPositionY = positionY;
    otherPiece.currentOrder = currentOrder;
  }

  isInCorrectOrder() {
    return this.order === this.currentOrder;
  }

  connectedCallback() {
    this.width = getFloatAttribute(this, "width");
    this.height = getFloatAttribute(this, "height");
    this.order = getIntAttribute(this, "order");
    this.currentOrder = getIntAttribute(this, "current-order");
    this.positionX = getFloatAttribute(this, "position-x");
    this.positionY = getFloatAttribute(this, "position-y");
    this.finalPositionX = getFloatAttribute(this, "final-position-x");
    this.finalPositionY = getFloatAttribute(this, "final-position-y");
    this.backgroundImage = this.getAttribute("background-image");
    this.backgroundWidth = this.getAttribute("background-width");
    this.backgroundHeight = this.getAttribute("background-height");

    this.style.setProperty("--width", `${this.width}px`);
    this.style.setProperty("--height", `${this.height}px`);
    this.style.setProperty("--position-x", `${this.positionX}`);
    this.style.setProperty("--position-y", `${this.positionY}`);

    const button = document.createElement("button");

    button.style.setProperty("--width", `${this.width}px`);
    button.style.setProperty("--height", `${this.height}px`);
    button.style.setProperty("--background-width", `${this.backgroundWidth}px`);
    button.style.setProperty(
      "--background-height",
      `${this.backgroundHeight}px`,
    );
    button.style.setProperty(
      "background-image",
      `url(${this.backgroundImage})`,
    );

    button.style.setProperty("--image-position-x", `${-1 * this.positionX}px`);
    button.style.setProperty("--image-position-y", `${-1 * this.positionY}px`);

    this.appendChild(button);
  }
}

export const registerPiece = () => {
  window.customElements.define("image-piece", Piece);
};

export const makePiece = (gridComplexity) => {
  const getPieceXYFn = getPieceXY(gridComplexity);

  return ({
    width,
    height,
    backgroundWidth,
    backgroundHeight,
    backgroundImage,
    index,
    randomIndex,
  }) => {
    const piece = document.createElement("image-piece");

    const [positionX, positionY] = getPieceXYFn(width, height, index);
    const [finalPositionX, finalPositionY] = getPieceXYFn(
      width,
      height,
      randomIndex,
    );

    piece.setAttribute("width", width);
    piece.setAttribute("height", height);
    piece.setAttribute("background-width", backgroundWidth);
    piece.setAttribute("background-height", backgroundHeight);
    piece.setAttribute("background-image", backgroundImage);
    piece.setAttribute("position-x", positionX);
    piece.setAttribute("position-y", positionY);
    piece.setAttribute("final-position-x", finalPositionX);
    piece.setAttribute("final-position-y", finalPositionY);
    piece.setAttribute("order", index);
    piece.setAttribute("current-order", randomIndex);

    return piece;
  };
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
