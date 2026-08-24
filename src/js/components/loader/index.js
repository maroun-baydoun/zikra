import hourglassSvg from "../../../icon/hourglass.svg?raw";
import styles from "./style.css?raw";
import {
  adoptStyleSheet,
  createAdoptedStyleSheet,
} from "../../dom/adopted-stylesheet.js";

const styleSheet = createAdoptedStyleSheet(styles);

class Loader extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    adoptStyleSheet(shadowRoot, styleSheet);
    shadowRoot.innerHTML = hourglassSvg;
  }
}

export const registerLoader = () => {
  window.customElements.define("game-loader", Loader);
};

export const addLoader = (container) => {
  const loader = document.createElement("game-loader");

  container.appendChild(loader);

  return loader;
};
