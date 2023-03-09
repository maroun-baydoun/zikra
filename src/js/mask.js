export const showMask = (children) => {
  const existingMask = document.querySelector("div.mask");

  if (existingMask) {
    throw new Error("A mask exists already");
  }

  const mask = document.createElement("div");
  mask.classList.add("mask");

  mask.append(...children);

  document.body.classList.add("masked");
  document.body.appendChild(mask);

  return () => {
    mask.remove();
    document.body.classList.remove("masked");
  };
};
