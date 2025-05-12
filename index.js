import "./src/css/style.css";
import "./src/js/location/router.js";

import { registerButton } from "./src/js/components/button";
import { registerLink } from "./src/js/components/link";
import { registerBackArrow } from "./src/js/components/back-arrow";
import { registerBgMusic } from "./src/js/components/bg-music";
import { registerTimer } from "./src/js/components/timer";
import { registerLoader } from "./src/js/components/loader";
import { registerPauseButton } from "./src/js/components/pause-button";
import { registerPiece } from "./src/js/components/piece";
import { registerImageSelector } from "./src/js/components/image-selector";
import { registerImageContainer } from "./src/js/components/image-container";

import { registerHomeScreen } from "./src/js/screens/home-screen/home-screen";
import { registerSettingsScreen } from "./src/js/screens/settings-screen/settings-screen";
import { registerPuzzleScreen } from "./src/js/screens/puzzle-screen/puzzle-screen";

registerButton();
registerLink();
registerBackArrow();
registerBgMusic();
registerTimer();
registerLoader();
registerPauseButton();
registerPiece();
registerImageSelector();
registerImageContainer();

registerHomeScreen();
registerSettingsScreen();
registerPuzzleScreen();
