import { goTo } from "./router.js";

export const LinkTagName = "za-link";

const template = document.createElement("template");

template.innerHTML = `
<style>
a {
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;

  color: inherit;
}
</style>
<a>
<slot></slot>
</a>
`;

class Link extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );
  }

  connectedCallback() {
    const anchor = this.shadowRoot.querySelector("a");
    const href = this.getAttribute("href");

    anchor.setAttribute("href", href);

    this.addEventListener("click", this.onClicked);
  }

  onClicked(event) {
    event.preventDefault();

    const href = this.getAttribute("href");

    if (!href) {
      return;
    }

    goTo(href);
  }
}

export const register = () => {
  window.customElements.define(LinkTagName, Link);
};

export const addLink = (container, { child, href }) => {
  const link = document.createElement(LinkTagName);
  link.setAttribute("href", href);
  link.appendChild(child);

  container.appendChild(link);

  return link;
};
