import templateHtml from "./template.html?raw";
import styles from "./style.css?raw";
import {
  adoptStyleSheet,
  createAdoptedStyleSheet,
} from "../../dom/adopted-stylesheet.js";

export const NotFoundScreenTagName = "za-not-found-screen";

const template = document.createElement("template");

template.innerHTML = templateHtml;
const styleSheet = createAdoptedStyleSheet(styles);

class NotFoundScreen extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    adoptStyleSheet(shadowRoot, styleSheet);
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export const registerNotFoundScreen = () => {
  window.customElements.define(NotFoundScreenTagName, NotFoundScreen);
};

export const addNotFoundScreen = (container) => {
  const notFoundScreen = document.createElement(NotFoundScreenTagName);

  container.appendChild(notFoundScreen);

  return notFoundScreen;
};
