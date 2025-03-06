/*function goToLatest(editor) {
	const vLink = document.querySelector("a[data-v]");

	location = vLink.dataset.v + "/" + (editor ? "editor.html" : "index.html");
}
function goToVersion(v, editor) {
	const versionLink = document.querySelector(`a[data-v="${v}"]`);
	if (versionLink) {
		location =
			versionLink.dataset.v + "/" + (editor ? "editor.html" : "index.html");
	}
}

// complicated hash logic
function doHash() {
	if (location.hash === "#latest") {
		goToLatest(false);
	} else if (location.hash === "#latest-editor") {
		goToLatest(true);
	} else {
		const parseRegex = /(?:[\d]+\.)+[\d]+/;
		const editorRegex = /^#(?:[\d]+\.)+[\d]+-editor/;
		const playerRegex = /^#(?:[\d]+\.)+[\d]+$/;
		const parsedVer = location.hash.match(parseRegex);

		if (parsedVer) {
			if (location.hash.match(editorRegex)) {
				goToVersion(parsedVer, true);
			} else if (location.hash.match(playerRegex)) {
				goToVersion(parsedVer, false);
			}
		}
	}
}

window.addEventListener("hashchange", doHash);
doHash();*/

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
function bars() {
  document.addEventListener("DOMContentLoaded", () => {
    fetch("index.html")
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const footer = doc.querySelector("#footer");
        const header = doc.querySelector("#header");
        document.getElementById("footer").innerHTML = footer.outerHTML;
        document.getElementById("header").innerHTML = header.outerHTML;
      })
      .catch((error) => console.warn("Error fetching footer/header:", error));
  });
}
//initial execution
resetLastModifiedTime();
bars();
