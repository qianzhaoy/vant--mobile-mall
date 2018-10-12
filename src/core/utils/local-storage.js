export const getLocalStorage = (...args) => {
  const storage = {};
  args.forEach((arg) => {
    storage[arg] = window.localStorage.getItem(arg) || '';
  });
  return storage;
};

export const setLocalStorage = (data) => {
  Object.keys(data).forEach((prop) => {
    const el = data[prop];
    window.localStorage.setItem(prop, el);
  });
};

export const removeLocalStorage = (...args) => {
  args.forEach((arg) => {
    window.localStorage.removeItem(arg);
  });
};
