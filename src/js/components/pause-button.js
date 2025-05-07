import pauseSvg from "../../icon/pause.svg?raw";

export const PauseButtonTagName = "za-pause-button";

const template = document.createElement("template");

template.innerHTML = `
<style>
  button {
    background: none;
    border: 0;
    cursor: pointer;
    width:35px;
  }

  button:focus-visible {
    outline: 2px solid var(--color-outline);
    outline-offset: 2px;
  }

 svg {
    fill: var(--color-black);
 }
</style>
<button>
${pauseSvg}
</button>`;

class PauseButton extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true),
    );
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
