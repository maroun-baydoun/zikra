export const showDialog = (children, { dismissible = true } = {}) => {
  const dialog = document.createElement("dialog");

  dialog.append(...children);

  if (!dismissible) {
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
    });
  }

  dialog.addEventListener(
    "close",
    () => {
      dialog.remove();
    },
    { once: true },
  );

  document.body.appendChild(dialog);
  dialog.showModal();

  return dialog;
};
