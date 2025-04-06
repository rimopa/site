// theme
function darkMode() {
  localStorage.setItem("mode", "dark");
  document.getElementById("body").classList.add("dark");
}
function lightMode() {
  localStorage.setItem("mode", "light");
  document.getElementById("body").classList.remove("dark");
}
function toggleTheme() {
  if (localStorage.getItem("mode") === "dark") {
    lightMode();
  } else {
    darkMode();
  }
}
if (localStorage.getItem("mode") === "dark") {
  darkMode();
  // automatic light/dark mode
} else if (localStorage.getItem("mode") === "light") {
  lightMode();
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  darkMode();
} else {
  lightMode();
}
function resetLastModifiedTime() {
  //last modified time
  document.getElementById("lastModified").innerText =
    "Last modification date: " + document.lastModified;
}
//initial execution
resetLastModifiedTime();