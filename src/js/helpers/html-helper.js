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

export const setClassesToElement = (selector, ...classes) => {
  const element = document.querySelector(selector);
  element.classList.add(...classes);
};

export const removeClassesFromElement = (selector, ...classes) => {
  const element = document.querySelector(selector);
  element.classList.remove(...classes);
};


export const hideElement = (element) => {
  element.classList.add('hidden');
}

export const showElement = (element) => {
  element.classList.remove('hidden');
}

export function removeChild(parentNode) {
  if (parentNode) {
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.lastChild);
    }
  }
}
