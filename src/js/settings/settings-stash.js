import { createStash } from "../stash/createStash";
import { createStorage } from "../stash/indexed-db-storage";

const VERSION = 1;

export const settingsStash = createStash(
  createStorage(`za-settings-v${VERSION}`),
  {
    difficulty: "easy",
  }
);
