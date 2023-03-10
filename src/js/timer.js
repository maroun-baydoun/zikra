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

    this.format = formatSeconds();
  }

  disconnectedCallback() {
    this.stop();
  }

  start() {
    this.lastTime = new Date().getTime();

    const timer = () => {
      this.animationHandler = window.requestAnimationFrame(timer);

      const now = new Date().getTime();

      this.displayTime();

      if (now - this.lastTime >= 1000) {
        this.lastTime = now;
        this.seconds++;

        this.displayTime();
      }
    };

    timer();
  }

  stop() {
    if (this.animationHandler === null) {
      return;
    }

    window.cancelAnimationFrame(this.animationHandler);
  }

  reset() {
    this.stop();

    this.seconds = 0;
    this.displayTime();
  }

  displayTime() {
    this.innerHTML = this.format(this.seconds);
  }
}

window.customElements.define("game-timer", Timer);

export const addTimer = (container) => {
  const gameTimer = document.createElement("game-timer");
  container.appendChild(gameTimer);

  return gameTimer;
};
