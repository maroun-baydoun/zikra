import createEvented from "evented-ts";

const settingsEvented = createEvented();

const VERSION = 1;

const KEY = `za-settings-v${VERSION}`;

const _initSettingsState = (initalState) => {
  let settings = _getSettingsFromLocalStorage() || initalState;

  const setSettings = (newSettings) => (settings = newSettings);

  return () => [settings, setSettings];
};

const _getSettings = (settingsState) => () => {
  const [settings] = settingsState();

  return settings;
};

const _setSettings = (settingsState) => (settings) => {
  const [, setSettings] = settingsState();

  window.localStorage.setItem(KEY, JSON.stringify(settings));

  setSettings(settings);

  settingsEvented.fire("settings-update", { settings });
};

const _getSettingsFromLocalStorage = () => {
  const settingsAsString = window.localStorage.getItem(KEY);

  if (!settingsAsString) {
    return null;
  }

  return JSON.parse(settingsAsString);
};

const _settingsManager = () => {
  const initalState = {
    difficulty: "easy",
  };

  const state = _initSettingsState(initalState);

  return {
    getSettings: _getSettings(state),
    setSettings: _setSettings(state),
    onSettingsUpdate: (callback) => {
      settingsEvented.on("settings-update", (event) =>
        callback(event.args.settings)
      );
    },
  };
};

const { getSettings, setSettings, onSettingsUpdate } = _settingsManager();

export { getSettings, setSettings, onSettingsUpdate };
