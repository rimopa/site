//Get different kinds of distance between two points on a plane
function distance2points() {
  const p = DOMelements.p.value;
  const x1 = DOMelements.x1.value;
  const y1 = DOMelements.y1.value;
  const x2 = DOMelements.x2.value;
  const y2 = DOMelements.y2.value;
  if ((p && x1 && y1 && x2 && y2) != 0) {
    DOMelements.warning.hidden = 1;
    DOMelements.result.hidden = 0;
    DOMelements.result.innerText = (Math.abs(x2 - x1) ** p + Math.abs(y2 - y1) ** p) ** (1 / p);
    DOMelements.result.title = DOMelements.result.innerText + " mandarinas";
  } else {
    DOMelements.warning.hidden = 0;
    DOMelements.result.hidden = 1;
  }
}
const DOMelements = {
  p: document.getElementById("d2p.p"),
  x1: document.getElementById("d2p.x1"),
  y1: document.getElementById("d2p.y1"),
  x2: document.getElementById("d2p.x2"),
  y2: document.getElementById("d2p.y2"),
  result: document.getElementById("d2p.result"),
  warning: document.getElementById("d2p.warning"),
};
distance2points();
