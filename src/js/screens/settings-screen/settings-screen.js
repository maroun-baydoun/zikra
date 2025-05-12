import { getSettings, setSettings } from "../../settings/settings-manager";
import { goTo } from "../../location/router";

import "./style.css";

import templateHtml from "./template.html?raw";

export const SettingsScreenTagName = "za-settings-screen";

const template = document.createElement("template");

template.innerHTML = templateHtml;

class SettingsScreen extends HTMLElement {
  constructor() {
    super();

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
    const form = this.querySelector("form");

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
    this.appendChild(template.content.cloneNode(true));

    this.querySelector("form")?.addEventListener("submit", this.onSubmit);
    this.querySelector("za-button")?.addEventListener(
      "click",
      this.onSaveButtonClicked,
    );

    const { difficulty } = getSettings();

    const difficultyRadio = document.getElementById(
      `settings-difficulty-${difficulty}`,
    );

    if (difficultyRadio) {
      difficultyRadio.checked = true;
    }
  }

  disconnectedCallback() {
    this.querySelector("form")?.removeEventListener("submit", this.onSubmit);

    this.querySelector("za-button")?.removeEventListener(
      "click",
      this.onSaveButtonClicked,
    );
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
