import { getSettings, onSettingsUpdate } from "../settings/settings-manager.js";

const VERSION = 1;

const key = () => {
  const { difficulty } = getSettings();

  return `za-scores-${difficulty}-v${VERSION}`;
};

const _initScoresState = () => {
  let scores = _getScoresFromLocalStorage();

  const setScores = (newScores) => (scores = newScores);

  return () => [scores, setScores];
};

const _getImageScore = (scoresState) => (imageId) => {
  const [scores] = scoresState();

  return scores[imageId];
};

const _setImageScore = (scoresState) => (imageId, score) => {
  const [existingScores, setScores] = scoresState();

  const scores = { ...existingScores, [imageId]: score };

  window.localStorage.setItem(key(), JSON.stringify(scores));

  setScores(scores);
};

const _getScoresFromLocalStorage = () => {
  const scoresAsString = window.localStorage.getItem(key());

  if (!scoresAsString) {
    return {};
  }

  return JSON.parse(scoresAsString);
};

const _scoresManager = () => {
  const state = _initScoresState();
  const [, setScores] = state();

  return {
    getImageScore: _getImageScore(state),
    setImageScore: _setImageScore(state),
    setScores,
  };
};

const { getImageScore, setImageScore, setScores } = _scoresManager();

onSettingsUpdate(() => {
  let scores = _getScoresFromLocalStorage();

  setScores(scores);
});

export { getImageScore, setImageScore };
