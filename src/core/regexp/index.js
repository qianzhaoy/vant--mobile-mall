export const idCard = val =>
  /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(val);

export const mobile = val => /^1[0-9]{10}$/.test(val);

export const address = val => {
  const value = val.trim();
  return value.length >= 5 && value.length <= 100;
};

export const userName = val => /^[a-zA-Z0-9_\u4e00-\u9fa5]{3,20}$/.test(val);
