import { getSettings, setSettings } from "../settings/settings-manager.js";
import { settingsStash } from "../settings/settings-stash.js";
import { goTo } from "../router";

export const SettingsScreenTagName = "za-settings-screen";

const template = document.createElement("template");

template.innerHTML = `
  <za-back-arrow href="/"></za-back-arrow>
  <form class="settings-form">
    <fieldset class="settings-section">
      <legend>Difficulty</legend>
      <div class="settings-choices">
        <div class="settings-choice">
          <input type="radio" name="difficulty" value="easy" id="settings-difficulty-easy" class="settings-choice-radio"></input>
          <label class="settings-choice-label" for="settings-difficulty-easy">Easy</label>
        </div>
        <div class="settings-choice">
          <input type="radio" name="difficulty" value="medium" id="settings-difficulty-medium" class="settings-choice-radio"></input>
          <label class="settings-choice-label" for="settings-difficulty-medium">Medium</label>
        </div>
        <div class="settings-choice">
          <input type="radio" name="difficulty" value="hard" id="settings-difficulty-hard" class="settings-choice-radio"></input>
          <label class="settings-choice-label" for="settings-difficulty-hard">Hard</label>
        </div>
      </div>
    </fieldset>
    <button class="button button-dark button-rounded button-padded">Save</button>
  </form>`;

class SettingsScreen extends HTMLElement {
  /**
   * @param {SubmitEvent} event
   */
  onSubmit(event) {
    event.preventDefault();

    const difficulty = event.target.difficulty.value;

    const settings = { difficulty };

    settingsStash.update((oldSettings) => ({ ...oldSettings, ...settings }));

    setSettings(settings);

    goTo("/");
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    const form = this.querySelector("form");
    form.addEventListener("submit", this.onSubmit);

    settingsStash.onUpdate((settings) => {
      const { difficulty } = settings;

      const difficultyRadio = document.getElementById(
        `settings-difficulty-${difficulty}`
      );

      if (difficultyRadio) {
        difficultyRadio.checked = true;
      }
    });
  }
}

window.customElements.define(SettingsScreenTagName, SettingsScreen);

export const addSettingsScreen = (container) => {
  const settingsScreen = document.createElement(SettingsScreenTagName);

  container.appendChild(settingsScreen);

  return settingsScreen;
};
