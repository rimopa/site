// theme
function darkMode() {
  localStorage.setItem("mode", "dark");
  body.classList.add("dark");
}
function lightMode() {
  localStorage.setItem("mode", "light");
  body.classList.remove("dark");
}
function toggleTheme() {
  if (localStorage.getItem("mode") === "dark") {
    lightMode();
  } else {
    darkMode();
  }
}

const body = document.getElementById("body");
// automatic light/dark mode
if (localStorage.getItem("mode") === "dark") {
  darkMode();
} else if (localStorage.getItem("mode") === "light") {
  lightMode();
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  darkMode();
} else {
  lightMode();
}
