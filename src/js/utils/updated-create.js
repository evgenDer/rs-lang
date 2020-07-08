// classNames - string : 'block element modifier'
// children - array of html elements to append new element
// attrs - array of pairs : [ ['src', './img.jpg'], ['alt', 'img'] ]
// textContent - string : 'text content of a tag'
function createElement({
  tagName, classNames, children, attrs, textContent, onClick, onChange,
}) {
  const element = document.createElement(tagName);

  if (classNames) {
    element.classList.add(...classNames.split(' '));
  }

  if (children && children.length) {
    children.forEach((child) => {
      element.append(child);
    });
  }

  if (attrs && attrs.length) {
    attrs.forEach(([attrName, attrVal]) => {
      element.setAttribute(attrName, attrVal);
    });
  }

  if (textContent) {
    element.textContent = textContent;
  }

  if (onClick) {
    if (Array.isArray(onClick)) {
      onClick.forEach((item) => {
        element.addEventListener('click', item);
      });
    } else {
      element.addEventListener('click', onClick);
    }
  }

  if (onChange) {
    element.addEventListener('change', onChange);
  }

  return element;
}


// eslint-disable-next-line import/prefer-default-export
export { createElement };
