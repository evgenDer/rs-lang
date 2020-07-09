// classNames - string : 'block element modifier'
// children - array of html elements to append new element
// attrs - array of pairs : [ ['src', './img.jpg'], ['alt', 'img'] ]
// textContent - string : 'text content of a tag'
function createElement(tagName, classNames, children, attrs, textContent) {
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
  return element;
}

function createElementObj ({
  tagName, classNames, children, attrs, textContent, onChange, onClick,
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
    element.innerHTML = textContent;
  }

  if (onChange) {
    element.addEventListener('change', onChange)
  }

  if (onClick) {
    element.addEventListener('click', onClick);
  }

  return element;
}

export { createElement, createElementObj };
