import templateHtml from "./template.html?raw";
import styles from "./style.css?raw";
import {
  adoptStyleSheet,
  createAdoptedStyleSheet,
} from "../../dom/adopted-stylesheet.js";

export const AboutScreenTagName = "za-about-screen";

const template = document.createElement("template");

template.innerHTML = templateHtml;
const styleSheet = createAdoptedStyleSheet(styles);

class AboutScreen extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    adoptStyleSheet(shadowRoot, styleSheet);
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export const registerAboutScreen = () => {
  window.customElements.define(AboutScreenTagName, AboutScreen);
};

export const addAboutScreen = (container) => {
  const aboutScreen = document.createElement(AboutScreenTagName);

  container.appendChild(aboutScreen);

  return aboutScreen;
};
