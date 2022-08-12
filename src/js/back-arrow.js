import arrowLeftSvg from "../icon/arrow-left.svg?raw";

export const BackArrowTagName = "za-back-arrow";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    za-link {
        display: inline-block;
        width:35px;
      }

    svg {
        fill: var(--color-black);
    }
  </style>
  <za-link>
  ${arrowLeftSvg}
  </za-link>`;

class BackArrow extends HTMLElement {
  connectedCallback() {
    const href = this.getAttribute("href");

    this.appendChild(template.content.cloneNode(true));

    const link = this.querySelector("za-link");
    link.setAttribute("href", href);
  }
}

export const register = () => {
  window.customElements.define(BackArrowTagName, BackArrow);
};

export const addBackArrow = (container, { href }) => {
  const backArrow = document.createElement(BackArrowTagName);
  backArrow.setAttribute("href", href);

  container.appendChild(backArrow);

  return backArrow;
};
