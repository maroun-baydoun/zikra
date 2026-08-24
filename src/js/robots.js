export const setRobots = (content) => {
  const selector = 'meta[name="robots"]';
  const existingMeta = document.head.querySelector(selector);

  if (!content) {
    existingMeta?.remove();
    return;
  }

  const robotsMeta = existingMeta || document.createElement("meta");
  robotsMeta.setAttribute("name", "robots");
  robotsMeta.setAttribute("content", content);

  if (!existingMeta) {
    document.head.appendChild(robotsMeta);
  }
};
