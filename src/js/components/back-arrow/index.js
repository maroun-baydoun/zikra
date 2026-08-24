import arrowLeftSvg from "../../../icon/arrow-left.svg?raw";
import styles from "./style.css?raw";
import {
  adoptStyleSheet,
  createAdoptedStyleSheet,
} from "../../dom/adopted-stylesheet.js";

export const BackArrowTagName = "za-back-arrow";

const styleSheet = createAdoptedStyleSheet(styles);
const icon = arrowLeftSvg.replace("<svg ", '<svg fill="currentColor" ');

const template = document.createElement("template");

template.innerHTML = `
  <za-link focusable="true">
    ${icon}
  </za-link>`;

class BackArrow extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    adoptStyleSheet(shadowRoot, styleSheet);
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const href = this.getAttribute("href");
    const link = this.shadowRoot.querySelector("za-link");

    link.setAttribute("href", href);
  }
}

export const registerBackArrow = () => {
  window.customElements.define(BackArrowTagName, BackArrow);
};

export const addBackArrow = (container, { href }) => {
  const backArrow = document.createElement(BackArrowTagName);
  backArrow.setAttribute("href", href);

  container.appendChild(backArrow);

  return backArrow;
};
