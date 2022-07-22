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

const animateContainer = () => {
  const container = document.querySelector(".container");
  const { top: orginalTop } = container.getBoundingClientRect();

  const animate = (targetTop) => () => {
    container.animate(
      [
        {
          transform: `translateY(${-targetTop}px)`,
        },
      ],
      { duration: 200, delay: 200, fill: "forwards", easing: "ease-in" }
    );
  };

  return [animate(orginalTop), animate(0)];
};

const [pullContainerUp, pullContainerDown] = animateContainer();

export const goTo = configureRouter(ROUTES)(
  (routeName, parameters) => {
    const container = document.querySelector(".container");
    clearContainer(container);

    if (routeName === "home") {
      pullContainerDown();
      const imageSelector = displayImageSelector();

      imageSelector.addEventListener("image-selected", (event) => {
        const { detail: imageId } = event;

        goTo(`/image/${imageId}`);
      });
    } else if (routeName === "image") {
      pullContainerUp();
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
