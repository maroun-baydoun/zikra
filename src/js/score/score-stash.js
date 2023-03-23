import { createStash } from "../stash/createStash";
import { createStorage } from "../stash/indexed-db-storage";

const VERSION = 1;

export const scoreStash = createStash(
  createStorage(`za-scores-v${VERSION}`),
  {}
);
