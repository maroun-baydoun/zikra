import arrowLeftSvg from "../icon/arrow-left.svg?raw";

export const BackArrowTagName = "za-back-arrow";

const template = document.createElement("template");

template.innerHTML = `
<style>
 a {
    display: inline-block;
    width:35px;
  }

 svg {
    fill: var(--color-black);

 }
</style>
<a href="/">
${arrowLeftSvg}
</a>
`;

class BackArrow extends HTMLElement {
  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define(BackArrowTagName, BackArrow);

export const addBackArrow = (container) => {
  const backArrow = document.createElement(BackArrowTagName);

  container.appendChild(backArrow);

  return backArrow;
};
