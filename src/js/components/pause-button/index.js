import pauseSvg from "../../../icon/pause.svg?raw";
import "./style.css";

export const PauseButtonTagName = "za-pause-button";

const template = document.createElement("template");

template.innerHTML = `
<button>
${pauseSvg}
</button>`;

class PauseButton extends HTMLElement {
  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
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
