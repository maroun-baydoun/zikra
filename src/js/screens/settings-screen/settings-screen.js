import { getSettings, setSettings } from "../../settings/settings-manager";
import { goTo } from "../../location/router";
import templateHtml from "./template.html?raw";
import styles from "./style.css?raw";
import {
  adoptStyleSheet,
  createAdoptedStyleSheet,
} from "../../dom/adopted-stylesheet.js";

export const SettingsScreenTagName = "za-settings-screen";

const template = document.createElement("template");

template.innerHTML = templateHtml;
const styleSheet = createAdoptedStyleSheet(styles);

class SettingsScreen extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    adoptStyleSheet(shadowRoot, styleSheet);
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.onSubmit = this.onSubmit.bind(this);
    this.onSaveButtonClicked = this.onSaveButtonClicked.bind(this);
  }

  /**
   * @param {SubmitEvent} event
   */
  onSubmit(event) {
    event.preventDefault();

    const difficulty = event.target.difficulty.value;

    const settings = { difficulty };

    setSettings(settings);

    goTo("/");
  }

  onSaveButtonClicked() {
    const form = this.shadowRoot.querySelector("form");

    if (!form) {
      return;
    }

    if ("requestSubmit" in HTMLFormElement.prototype) {
      form.requestSubmit();
    } else {
      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.style.display = "none";
      form.appendChild(submitButton);
      submitButton.click();
      form.removeChild(submitButton);
    }
  }

  connectedCallback() {
    const form = this.shadowRoot.querySelector("form");
    const saveButton = this.shadowRoot.querySelector("za-button");

    form?.addEventListener("submit", this.onSubmit);
    saveButton?.addEventListener("click", this.onSaveButtonClicked);

    const { difficulty } = getSettings();

    const difficultyRadio = this.shadowRoot.querySelector(
      `#settings-difficulty-${difficulty}`,
    );

    if (difficultyRadio) {
      difficultyRadio.checked = true;
    }
  }

  disconnectedCallback() {
    const form = this.shadowRoot.querySelector("form");
    const saveButton = this.shadowRoot.querySelector("za-button");

    form?.removeEventListener("submit", this.onSubmit);
    saveButton?.removeEventListener("click", this.onSaveButtonClicked);
  }
}

export const registerSettingsScreen = () => {
  window.customElements.define(SettingsScreenTagName, SettingsScreen);
};

export const addSettingsScreen = (container) => {
  const settingsScreen = document.createElement(SettingsScreenTagName);

  container.appendChild(settingsScreen);

  return settingsScreen;
};
