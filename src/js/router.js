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

export const goTo = configureRouter(ROUTES)(
  (routeName, parameters) => {
    const container = document.querySelector(".container");
    clearContainer(container);

    if (routeName === "home") {
      const imageSelector = displayImageSelector();

      imageSelector.addEventListener("image-selected", (event) => {
        const { detail: imageId } = event;

        goTo(`/image/${imageId}`);
      });
    } else if (routeName === "image") {
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
