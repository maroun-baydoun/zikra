import mutedSvg from "./muted.svg?raw";
import unmutedSvg from "./unmuted.svg?raw";

import styles from "./style.css?raw";
import {
  adoptStyleSheet,
  createAdoptedStyleSheet,
} from "../../dom/adopted-stylesheet.js";

const BgMusicTagName = "za-bg-music";

const styleSheet = createAdoptedStyleSheet(styles);

const html = `
<audio
  src="/audio/bg-music-s.mp3"
  loop
  ></audio>
  <button>
    ${mutedSvg}
  </button>
`;

class BgMusic extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    adoptStyleSheet(shadowRoot, styleSheet);
    shadowRoot.innerHTML = html;

    this.onButtonClicked = this.onButtonClicked.bind(this);
  }

  onButtonClicked() {
    if (!this.audio || !this.button) {
      return;
    }

    if (this.audio.paused) {
      this.audio.play();
      this.button.innerHTML = unmutedSvg;
    } else {
      this.audio.pause();
      this.button.innerHTML = mutedSvg;
    }
  }

  connectedCallback() {
    this.audio = this.shadowRoot.querySelector("audio");
    this.button = this.shadowRoot.querySelector("button");

    this.button?.addEventListener("click", this.onButtonClicked);
  }

  disconnectedCallback() {
    this.button?.removeEventListener("click", this.onButtonClicked);
  }
}

export const registerBgMusic = () => {
  window.customElements.define(BgMusicTagName, BgMusic);
};
