import hourglassSvg from "../icon/hourglass.svg?raw";

class Loader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = hourglassSvg;
  }
}

window.customElements.define("game-loader", Loader);

export const addLoader = (container) => {
  const loader = document.createElement("game-loader");

  container.appendChild(loader);

  return loader;
};
