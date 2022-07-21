import { configureRouter } from "./location.js";

import { displayImageSelector, removeImageSelector } from "./image-selector.js";
import { addPuzzleContainer } from "./puzzle-container";

export const ROUTES = [
  { name: "home", path: "/" },
  {
    name: "image",
    path: "/image/${imageId}",
  },
];

const animateHeader = () => {
  const header = document.querySelector("header");
  const { fontSize: originalHeaderFontSize } = window.getComputedStyle(header);

  const animate = (targetFontSize) => () => {
    header.animate(
      [
        {
          fontSize: targetFontSize,
        },
      ],
      { duration: 200, delay: 200, fill: "forwards" }
    );
  };

  return [animate(originalHeaderFontSize), animate(0)];
};

const [expandHeader, shrinkHeader] = animateHeader();

export const goTo = configureRouter(ROUTES)(
  (routeName, parameters) => {
    const container = document.querySelector(".container");
    clearContainer(container);

    if (routeName === "home") {
      expandHeader();

      const imageSelector = displayImageSelector();

      imageSelector.addEventListener("image-selected", (event) => {
        const { detail: imageId } = event;

        goTo(`/image/${imageId}`);
      });
    } else if (routeName === "image") {
      shrinkHeader();
      removeImageSelector();
      const { imageId } = parameters;
      addPuzzleContainer({ imageId });
    }
  },
  () => {}
);

const clearContainer = (container) => {
  if (!container) {
    return;
  }

  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
};
