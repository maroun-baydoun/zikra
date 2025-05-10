import styles from "./style.css?raw";

const html = `
    <style>
        ${styles}
    </style>
    <slot></slot>
`;

const ButtonTagName = "za-button";

class Button extends HTMLElement {
  static get styleAttributes() {
    return ["padded", "rounded", "transparent"];
  }

  static get observedAttributes() {
    return [...Button.styleAttributes, "href"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = html;

    this.onSlotChanged = this.onSlotChanged.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  createElement() {
    if (this.element) {
      this.element.remove();
    }

    const href = this.getAttribute("href");

    if (href) {
      const link = document.createElement("za-link");
      link.setAttribute("href", href);
      link.setAttribute("tabIndex", 0);
      this.shadowRoot.appendChild(link);

      return link;
    }

    const button = document.createElement("button");
    this.shadowRoot.appendChild(button);
    return button;
  }

  updateElementClasses() {
    const padded = this.hasAttribute("padded");
    const rounded = this.hasAttribute("rounded");
    const transparent = this.hasAttribute("transparent");

    this.element?.classList.add("button");
    this.element?.classList.toggle("button-padded", padded);
    this.element?.classList.toggle("button-rounded", rounded);
    this.element?.classList.toggle("button-transparent", transparent);
  }

  onSlotChanged(event) {
    const nodes = event.target?.assignedNodes();

    if (!nodes) {
      return;
    }

    this.element.append(...nodes);
  }

  onMouseEnter() {
    this.element?.setAttribute("mouse-enter", "true");
  }

  onMouseLeave() {
    this.element?.removeAttribute("mouse-enter");
  }

  connectedCallback() {
    this.element = this.createElement();
    this.updateElementClasses();

    const slots = this.shadowRoot.querySelectorAll("slot");

    slots[0]?.addEventListener("slotchange", this.onSlotChanged);

    this.element.addEventListener("mouseenter", this.onMouseEnter);
    this.element.addEventListener("mouseleave", this.onMouseLeave);
  }

  disconnectedCallback() {
    const slots = this.shadowRoot.querySelectorAll("slot");

    slots[0]?.removeEventListener("slotchange", this.onSlotChanged);

    this.element?.removeEventListener("mouseenter", this.onMouseEnter);
    this.element?.removeEventListener("mouseleave", this.onMouseLeave);
    this.element?.remove();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (Button.styleAttributes.includes(name)) {
      this.updateElementClasses();
    }

    if (name === "href") {
      if (!!oldValue && !!newValue) {
        this.element.setAttribute("href", newValue);
      } else {
        this.element = this.createElement();
      }
    }
  }
}

export const registerButton = () => {
  window.customElements.define(ButtonTagName, Button);
};
