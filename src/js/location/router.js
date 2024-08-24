import { configureRouter } from "./location.js";
import { setTitle } from "../title";

import { addHomeScreen } from "../screens/home-screen/home-screen.js";
import { addSettingsScreen } from "../screens/settings-screen/settings-screen.js";
import { displayImageSelector } from "../components/image-selector.js";
import { addPuzzleScreen } from "../screens/puzzle-screen/puzzle-screen";

import metada from "../../img/metadata.json";

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
      setTitle("Zikra - Putting the pieces back together", false);
      addHomeScreen(body);
    } else if (routeName === "settings") {
      setTitle("Settings");
      addSettingsScreen(body);
    } else if (routeName === "images") {
      setTitle("Select an image");
      const container = addContainer(body);
      displayImageSelector(container);
    } else if (routeName === "image") {
      const { imageId } = parameters;

      const imageMetadata = metada[imageId];

      if (imageMetadata && imageMetadata.title) {
        setTitle(imageMetadata.title);
      }

      const container = addContainer(body);
      addPuzzleScreen(container, { imageId });
    }
  },
  () => {},
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
