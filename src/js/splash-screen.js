export const SplashScreenTagName = "za-splash-screen";

const template = document.createElement("template");

template.innerHTML = `
<header>
 <h1>Zikra</h1>
 <h2>Putting the pieces back together</h2>
</header>

<main class="container">
  <div class="buttons-menu">
    <za-link href="/images" class="button button-rounded" padded>Start</za-link>
    <za-link href="/settings" class="button button-rounded" padded>Settings</za-link>
  </div>
</main>`;

class SplashScreen extends HTMLElement {
  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define(SplashScreenTagName, SplashScreen);

export const addSplashScreen = (container) => {
  const splashScreen = document.createElement(SplashScreenTagName);

  container.appendChild(splashScreen);

  return splashScreen;
};

export const removeSplashScreen = () => {
  const splashScreen = document.querySelector(SplashScreenTagName);

  if (!splashScreen) {
    return;
  }

  splashScreen.remove();
};
