import mutedSvg from "./muted.svg?raw";
import unmutedSvg from "./unmuted.svg?raw";

import styles from "./style.css?raw";

const BgMusicTagName = "za-bg-music";

const html = `
<style>
  ${styles}
</style>
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
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = html;

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
