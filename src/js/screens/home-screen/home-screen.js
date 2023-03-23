import templateHtml from "./template.html?raw";

import "./style.css";

const HomeScreenTagName = "za-home-screen";

const template = document.createElement("template");

template.innerHTML = templateHtml;

class HomeScreen extends HTMLElement {
  connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
  }
}

export const registerHomeScreen = () => {
  window.customElements.define(HomeScreenTagName, HomeScreen);
};

export const addHomeScreen = (container) => {
  const homeScreen = document.createElement(HomeScreenTagName);

  container.appendChild(homeScreen);

  return homeScreen;
};

export const removeHomeScreen = () => {
  const homeScreen = document.querySelector(HomeScreenTagName);

  if (!homeScreen) {
    return;
  }

  homeScreen.remove();
};
