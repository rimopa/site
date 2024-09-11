function distance2points() {
  //Get different kinds of distance between two points on a plane
  p = document.getElementById("d2p.p").value;
  x1 = document.getElementById("d2p.x1").value;
  y1 = document.getElementById("d2p.y1").value;
  x2 = document.getElementById("d2p.x2").value;
  y2 = document.getElementById("d2p.y2").value;
  if ((p && x1 && y1 && x2 && y2) != "") {
    document.getElementById("d2p.warning").hidden = 1;
    document.getElementById("d2p.result").hidden = 0;
    document.getElementById("d2p.result").innerText =
      (Math.abs(x2 - x1) ** p + Math.abs(y2 - y1) ** p) ** (1 / p);
    document.getElementById("d2p.result").title =
      document.getElementById("d2p.result").innerText + " mandarinas";
  } else {
    document.getElementById("d2p.warning").hidden = 0;
    document.getElementById("d2p.result").hidden = 1;
  }
}
distance2points();
