import pauseSvg from "../../../icon/pause.svg?raw";
import styles from "./style.css?raw";
import {
  adoptStyleSheet,
  createAdoptedStyleSheet,
} from "../../dom/adopted-stylesheet.js";

export const PauseButtonTagName = "za-pause-button";

const styleSheet = createAdoptedStyleSheet(styles);

const template = document.createElement("template");

template.innerHTML = `
<button>
${pauseSvg}
</button>`;

class PauseButton extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    adoptStyleSheet(shadowRoot, styleSheet);
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export const registerPauseButton = () => {
  window.customElements.define(PauseButtonTagName, PauseButton);
};

export const addPauseButton = (container) => {
  const pauseButton = document.createElement(PauseButtonTagName);

  container.appendChild(pauseButton);

  return pauseButton;
};
