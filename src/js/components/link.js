import { goTo } from "../location/router.js";

export const LinkTagName = "za-link";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    a {
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;
      color: inherit;
      flex:1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host([padded]) a {
      padding: calc(var(--spacing) * 0.75) var(--spacing);
    }

    a:focus-visible, a:focus {
      outline: 0;
    }

    a[focusable="true"]:focus-visible {
      outline: 2px solid var(--color-outline);
      outline-offset: 2px;
    }

  </style>
  <a>
    <slot></slot>
  </a>`;

class Link extends HTMLElement {
  static get observedAttributes() {
    return ["href", "focusable"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true),
    );
  }

  connectedCallback() {
    const anchor = this.shadowRoot.querySelector("a");
    const href = this.getAttribute("href");
    const focusable = Boolean(this.getAttribute("focusable"));

    if (href) {
      anchor.setAttribute("href", href);
    }

    if (focusable) {
      anchor.setAttribute("focusable", "true");
    }

    this.addEventListener("click", this.onClicked);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "href") {
      const anchor = this.shadowRoot.querySelector("a");

      if (newValue) {
        anchor.setAttribute("href", newValue);
      } else {
        anchor.removeAttribute("href");
      }
    }
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

export const registerLink = () => {
  window.customElements.define(LinkTagName, Link);
};

export const addLink = (container, { child, href, padded }) => {
  const link = document.createElement(LinkTagName);
  link.setAttribute("href", href);
  padded && link.setAttribute("padded", true);
  link.appendChild(child);

  container.appendChild(link);

  return link;
};
