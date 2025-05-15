const capitalizations = Array.from(document.getElementsByClassName("undefinedCapitalization"));
capitalizations.forEach((ele) => {
  let inLineDelay = parseInt(ele.getAttribute("capitalizationDelay"), 10);
  const delay = !inLineDelay || inLineDelay <= 0 ? 500 : inLineDelay;
  updateCapitalizations(ele, delay);
});

function randomizeCapitalization(str) {
  return str
    .split("")
    .map((c) => (Math.random() < 0.5 ? c.toLowerCase() : c.toUpperCase()))
    .join("");
}

function updateCapitalizations(ele, delay) {
  ele.innerText = randomizeCapitalization(ele.innerText);
  setTimeout(() => {
    requestAnimationFrame(() => updateCapitalizations(ele, delay));
  }, delay);
}
