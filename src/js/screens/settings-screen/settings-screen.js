import { getSettings, setSettings } from "../../settings/settings-manager.js";
import { goTo } from "../../location/router";

import "./style.css";

import templateHtml from "./template.html?raw";

export const SettingsScreenTagName = "za-settings-screen";

const template = document.createElement("template");

template.innerHTML = templateHtml;

class SettingsScreen extends HTMLElement {
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

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    const form = this.querySelector("form");
    form.addEventListener("submit", this.onSubmit);

    const { difficulty } = getSettings();

    const difficultyRadio = document.getElementById(
      `settings-difficulty-${difficulty}`,
    );

    if (difficultyRadio) {
      difficultyRadio.checked = true;
    }
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
