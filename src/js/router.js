import { configureRouter } from "./location.js";

import { addSplashScreen } from "./splash-screen.js";
import { addSettingsScreen } from "./settings-screen.js";
import { displayImageSelector } from "./image-selector.js";
import { addPuzzleContainer } from "./puzzle-container";

export const ROUTES = [
  { name: "home", path: "/" },
  { name: "settings", path: "/settings" },
  { name: "images", path: "/images" },
  {
    name: "image",
    path: "/image/${imageId}",
  },
];

export const goTo = configureRouter(ROUTES)(
  (routeName, parameters) => {
    const body = document.querySelector("body");

    clearContainer(body);

    if (routeName === "home") {
      addSplashScreen(body);
    } else if (routeName === "settings") {
      addSettingsScreen(body);
    } else if (routeName === "images") {
      const container = addContainer(body);
      displayImageSelector(container);
    } else if (routeName === "image") {
      const { imageId } = parameters;

      const container = addContainer(body);
      addPuzzleContainer(container, { imageId });
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

const addContainer = (body) => {
  const container = document.createElement("main");
  container.classList.add("container");

  body.appendChild(container);

  return container;
};
