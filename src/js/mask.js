export const showMask = (children) => {
  const existingMask = document.querySelector("dialog");

  if (existingMask) {
    throw new Error("A mask exists already");
  }

  const dialog = document.createElement("dialog");

  dialog.append(...children);

  document.body.appendChild(dialog);

  dialog.showModal();

  return () => {
    dialog.close();
    dialog.remove();
  };
};
