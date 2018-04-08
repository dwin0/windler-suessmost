export const getById = id => document.getElementById(id);
export const onClick = (element, fn) => element.addEventListener('click', fn);
export const addClass = (element, className) => element.classList.add(className);
export const removeClass = (element, className) => element.classList.remove(className);
