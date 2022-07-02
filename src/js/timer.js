class Timer extends HTMLElement {
  connectedCallback() {
    this.seconds = 0;

    const dateTimeFormat = new Intl.DateTimeFormat("default", {
      minute: "numeric",
      second: "numeric",
    });
    let lastTime = new Date().getTime();

    const timer = () => {
      window.requestAnimationFrame(timer);

      const now = new Date().getTime();

      if (now - lastTime >= 1000) {
        lastTime = now;
        this.seconds++;

        const date = new Date(this.seconds * 1000);

        this.innerHTML = dateTimeFormat.format(date);
      }
    };

    timer();
  }
}

window.customElements.define("game-timer", Timer);

export const addTimer = () => {
  const container = document.querySelector(".container");

  const gameTimer = document.createElement("game-timer");
  container.appendChild(gameTimer);

  return gameTimer;
};
