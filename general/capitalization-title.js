function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}
var capitalizationDelay = document
  .getElementById("pageTitle")
  .getAttribute("capitalizationDelay");
if (capitalizationDelay <= 0) {
  capitalizationDelay = 500;
}
function capitalizationTimeout() {
  setTimeout(() => {
    updateTitleCapitalization();
  }, capitalizationDelay);
}
function updateTitleCapitalization() {
  var title = document.getElementById("pageTitle").innerText;
  for (let index = 0; index < title.length; index++) {
    if (Math.round(Math.random()) == "1") {
      title = setCharAt(title, index, title[index].toUpperCase());
    } else {
      title = setCharAt(title, index, title[index].toLowerCase());
    }
  }
  document.getElementById("pageTitle").innerText = title;
  capitalizationTimeout();
}
updateTitleCapitalization();
