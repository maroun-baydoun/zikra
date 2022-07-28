const VERSION = 1;

const KEY = `za-scores-v${VERSION}`;

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

  window.localStorage.setItem(KEY, JSON.stringify(scores));

  setScores(scores);
};

const _getScoresFromLocalStorage = () => {
  const scoresAsString = window.localStorage.getItem(KEY);

  if (!scoresAsString) {
    return {};
  }

  return JSON.parse(scoresAsString);
};

const _scoresManager = () => {
  const state = _initScoresState();

  return {
    getImageScore: _getImageScore(state),
    setImageScore: _setImageScore(state),
  };
};

const { getImageScore, setImageScore } = _scoresManager();

export { getImageScore, setImageScore };
