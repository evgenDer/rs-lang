export const updateInputValue = (value, selector) => {
  const element = document.querySelector(selector);
  element.value = value;
};

export const updateCheckboxValue = (value, selector) => {
  const element = document.querySelector(selector);
  element.checked = value;
};

export const getInputValue = (selector) => document.querySelector(selector).value;

export const getCheckboxValue = (selector) => document.querySelector(selector).checked;
