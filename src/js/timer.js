class Timer extends HTMLElement {
  constructor() {
    super();

    this.dateTimeFormat = new Intl.DateTimeFormat("default", {
      minute: "numeric",
      second: "numeric",
    });

    this.seconds = 0;
  }

  connectedCallback() {}

  start() {
    this.lastTime = new Date().getTime();

    const timer = () => {
      window.requestAnimationFrame(timer);

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

  displayTime() {
    const date = new Date(this.seconds * 1000);

    this.innerHTML = this.dateTimeFormat.format(date);
  }
}

window.customElements.define("game-timer", Timer);

export const addTimer = () => {
  const container = document.querySelector(".container");

  const gameTimer = document.createElement("game-timer");
  container.appendChild(gameTimer);

  return gameTimer;
};
