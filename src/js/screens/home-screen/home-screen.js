import templateHtml from "./template.html?raw";
import styles from "./style.css?raw";
import {
  adoptStyleSheet,
  createAdoptedStyleSheet,
} from "../../dom/adopted-stylesheet.js";

const HomeScreenTagName = "za-home-screen";

const template = document.createElement("template");

template.innerHTML = templateHtml;
const styleSheet = createAdoptedStyleSheet(styles);

class HomeScreen extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    adoptStyleSheet(shadowRoot, styleSheet);
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export const registerHomeScreen = () => {
  window.customElements.define(HomeScreenTagName, HomeScreen);
};

export const addHomeScreen = (container) => {
  const homeScreen = document.createElement(HomeScreenTagName);

  container.appendChild(homeScreen);

  return homeScreen;
};

export const removeHomeScreen = () => {
  const homeScreen = document.querySelector(HomeScreenTagName);

  if (!homeScreen) {
    return;
  }

  homeScreen.remove();
};
