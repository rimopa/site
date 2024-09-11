function toolsNav() {
  document.addEventListener("DOMContentLoaded", () => {
    fetch("/tools.html")
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const toolsNav = doc.querySelector("#toolsNav");
        document.getElementById("toolsNav").innerHTML = toolsNav.outerHTML;
      })
      .catch((error) => console.error("Error fetching toolsNav:", error));
  });
  var ases = document.querySelectorAll("#toolsNav a");
  console.log(ases);
  console.log(ases.length);
  ases.forEach((ele) => {
    ele.setAttribute("hidden", 1);

    if (ele.href == window.location.pathname) {
      ele.hidden = 1;
    }
  });
}
toolsNav();
