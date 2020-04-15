const html = document.querySelector('html');
const checkbox = document.querySelector('input[name="theme"]');

const getStyle = (element, style) => window.getComputedStyle(element).getPropertyValue(style);

const initialColors = {
  bg: getStyle(html, '--bg'),
  bgPanel: getStyle(html, '--bg-panel'),
  colorHeadings: getStyle(html, '--color-headings'),
  colorText: getStyle(html, '--color-text'),
}

const darkMode = {
  bg: "#333333",
  bgPanel: "#434343",
  colorHeadings: "#3664FF",
  colorText: "#B5B5B5",
}

const transformKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

function saveValues(key, color) {
  localStorage[key] = color;
  localStorage.setItem('checkbox', checkbox.checked);
}

function setValues() {
  const properties = Object.keys(localStorage);
  properties.forEach(propertie => {
    html.style.setProperty(propertie, localStorage[propertie]);
  })
  const checked = JSON.parse(localStorage.getItem('checkbox'));
  checked ? checkbox.checked = true : checkbox.checked = false;
}
setValues();

const changeColors = (colors) => {
  Object.keys(colors).map((key) => {
    html.style.setProperty(transformKey(key), colors[key]),
    saveValues(transformKey(key), colors[key])
  })
}

checkbox.addEventListener('change', ({target}) => {
  target.checked ? changeColors(darkMode) : changeColors(initialColors);
});