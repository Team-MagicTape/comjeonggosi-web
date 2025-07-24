let openFn: () => void = () => {};
let closeFn: () => void = () => {};

export const login = {
  open: () => openFn(),
  close: () => closeFn(),
};

export const registerLoginModal = (open: () => void, close: () => void) => {
  openFn = open;
  closeFn = close;
};
