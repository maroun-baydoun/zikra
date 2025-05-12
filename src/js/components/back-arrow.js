import arrowLeftSvg from "../../icon/arrow-left.svg?raw";

export const BackArrowTagName = "za-back-arrow";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    za-link {
        display: inline-block;
        width:35px;
    }
   
    za-link svg {
        fill: var(--color-off-white);
    }

     za-link:hover svg {
        fill: var(--color-white);
    }
  </style>
  <za-link focusable="true">
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

export const registerBackArrow = () => {
  window.customElements.define(BackArrowTagName, BackArrow);
};

export const addBackArrow = (container, { href }) => {
  const backArrow = document.createElement(BackArrowTagName);
  backArrow.setAttribute("href", href);

  container.appendChild(backArrow);

  return backArrow;
};
