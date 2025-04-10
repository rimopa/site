function toolsNav() {
  document.addEventListener("DOMContentLoaded", () => {
    fetch("/tools.html")
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const toolsNav = doc.querySelector("#toolsNav");
        const newToolsNav = document.getElementById("toolsNav");
        newToolsNav.innerHTML = toolsNav.innerHTML;
        var lis = document.querySelectorAll("#toolsNav ul li");
        lis.forEach((li) => {
          var a = li.querySelector("a");
          if (a.getAttribute("href") == window.location.pathname) {
            li.setAttribute("hidden", 1);
          }
        });
      })
      .catch((error) => console.error("Error fetching toolsNav:", error));
  });
}
toolsNav();
