const capitalizations = Array.from(
  document.getElementsByClassName("undefinedCapitalization")
);
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

/*function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

const pageTitle = document.getElementById("pageTitle");
var capitalizationDelay = pageTitle.getAttribute("capitalizationDelay");
if (capitalizationDelay <= 0) {
  capitalizationDelay = 500;
}
function capitalizationTimeout() {
  setTimeout(() => {
    updateTitleCapitalization();
  }, capitalizationDelay);
}
function updateTitleCapitalization() {
  var title = pageTitle.innerText;
  for (let index = 0; index < title.length; index++) {
    if (Math.round(Math.random()) == "1") {
      title = setCharAt(title, index, title[index].toUpperCase());
    } else {
      title = setCharAt(title, index, title[index].toLowerCase());
    }
  }
  pageTitle.innerText = title;
  capitalizationTimeout();
}
capitalizationTimeout();
*/
//----------------------------------------------------
