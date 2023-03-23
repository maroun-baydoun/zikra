import createEvented from "evented-ts";

export const createStash = (storage, initialState) => {
  let state = initialState;
  let initialisedFromStorage = false;

  storage
    .initialState()
    .then((storedState) => {
      if (typeof storedState !== "undefined") {
        updateState(storedState);
      }
    })
    .finally(() => {
      initialisedFromStorage = true;
    });

  const stashEventManager = createEvented();

  const updateState = (newState) => {
    const willUpdate = state !== newState;
    if (!willUpdate) {
      return;
    }

    storage.update(newState).then(() => {
      state = newState;
      stashEventManager.fire("update", newState);
    });
  };

  return {
    update: (newState) => {
      if (typeof newState === "function") {
        const updatedState = newState(state);
        updateState(updatedState);
      } else {
        updateState(newState);
      }
    },
    onUpdate: (callback) => {
      callback(state);
      stashEventManager.on("update", (e) => callback(e.args));
    },
    read: () => state,
  };
};
