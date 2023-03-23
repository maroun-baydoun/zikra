import { get, set } from "idb-keyval";

export const createStorage = (name) => {
  return {
    initialState: () => {
      return get(name).catch();
    },
    update: (state) => {
      return set(name, state).catch(console.error);
    },
  };
};
