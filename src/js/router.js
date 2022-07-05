import { configureRouter } from "./location.js";

import { displayImageSelector, removeImageSelector } from "./image-selector.js";
import { addImageContainer } from "./image-container.js";
import { addTimer } from "./timer.js";
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
      //addTimer();
      //addImageContainer({ imageId });
    }
  },
  () => {}
);
