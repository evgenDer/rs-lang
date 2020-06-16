export const updateInputValue = (value, selector) => {
  const element = document.querySelector(selector);
  element.value = value;
};

export const updateCheckboxValue = (value, selector) => {
  const element = document.querySelector(selector);
  element.checked = value;
};
