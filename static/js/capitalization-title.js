const capitalizations = Array.from(document.getElementsByClassName("undefinedCapitalization"));
capitalizations.forEach((ele) => {
  let inLineDelay = parseInt(ele.getAttribute("capitalizationDelay"), 10);
  const delay = !inLineDelay || inLineDelay <= 0 ? 500 : inLineDelay;
  updateCapitalizations(ele, delay);
});

function randomizeCapitalization(str) {
  const chars = str.split("");
  for (let i = 0; i < chars.length; i++) {
    chars[i] = /[a-z]/i.test(chars[i])
      ? Math.random() < 0.5
        ? chars[i].toLowerCase()
        : chars[i].toUpperCase()
      : chars[i];
  }
  return chars.join("");
}

function updateCapitalizations(ele, delay) {
  ele.innerText = randomizeCapitalization(ele.innerText);
  setTimeout(() => {
    requestAnimationFrame(() => updateCapitalizations(ele, delay));
  }, delay);
}
