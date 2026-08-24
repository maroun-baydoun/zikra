import styles from "./style.css?raw";
import {
  adoptStyleSheet,
  createAdoptedStyleSheet,
} from "../../dom/adopted-stylesheet.js";

const styleSheet = createAdoptedStyleSheet(styles);

export const formatSeconds = () => {
  const dateTimeFormat = new Intl.DateTimeFormat("default", {
    minute: "numeric",
    second: "numeric",
  });

  return (seconds) => {
    if (typeof seconds === "undefined") {
      return "";
    }
    const date = new Date(seconds * 1000);

    return dateTimeFormat.format(date);
  };
};

class Timer extends HTMLElement {
  constructor() {
    super();

    this.seconds = 0;
    this.animationHandler = null;
    this.onAnimationFrame = this.onAnimationFrame.bind(this);
    this.format = formatSeconds();

    const shadowRoot = this.attachShadow({ mode: "open" });
    adoptStyleSheet(shadowRoot, styleSheet);
  }

  disconnectedCallback() {
    this.stop();
  }

  start() {
    if (this.animationHandler !== null) {
      return;
    }

    this.lastTime = performance.now();
    this.displayTime();
    this.animationHandler = window.requestAnimationFrame(this.onAnimationFrame);
  }

  onAnimationFrame(now) {
    const elapsed = now - this.lastTime;
    const elapsedSeconds = Math.floor(elapsed / 1000);

    if (elapsedSeconds > 0) {
      this.lastTime += elapsedSeconds * 1000;
      this.seconds += elapsedSeconds;
      this.displayTime();
    }

    this.animationHandler = window.requestAnimationFrame(this.onAnimationFrame);
  }

  stop() {
    if (this.animationHandler === null) {
      return;
    }

    window.cancelAnimationFrame(this.animationHandler);
    this.animationHandler = null;
  }

  reset() {
    this.stop();

    this.seconds = 0;
    this.displayTime();
  }

  displayTime() {
    this.shadowRoot.textContent = this.format(this.seconds);
  }
}

export const registerTimer = () => {
  window.customElements.define("game-timer", Timer);
};

export const addTimer = (container) => {
  const gameTimer = document.createElement("game-timer");
  container.appendChild(gameTimer);

  return gameTimer;
};
