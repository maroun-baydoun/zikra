export const showMask = (children) => {
  const mask = document.createElement("div");
  mask.classList.add("mask");

  mask.append(children);

  document.body.classList.add("masked");
  document.body.appendChild(mask);

  return () => {
    mask.remove();
    document.body.classList.remove("masked");
  };
};
